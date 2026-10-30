// Robot Works — Cloudflare Worker (Path A: GH Pages frontend + Worker backend)
// Endpoints:
//   GET  /v1/consent-context          -> country + jurisdiction + policyVersion
//   POST /v1/consent                  -> record a consent choice
//   POST /v1/events                   -> ingest an event batch (anonId, sessionId, events[])
//   GET  /v1/dashboard/summary?days=N -> aggregated metrics (Access-protected)
//   GET  /v1/dashboard/top-jobs?days=N
//   GET  /v1/dashboard/events?days=N
//   DELETE /v1/data?anonId=xxx        -> erase all data for an anonymous id
//   GET  /dashboard                   -> serve the read-only dashboard UI

import { dashboardHtml } from './dashboard.js';

const EVENT_NAMES = [
  'page_view',
  'job_detail_open',
  'apply_click',
  'save_job', 'unsave_job',
  'save_company', 'unsave_company',
  'compare_add', 'compare_remove', 'compare_open', 'compare_apply_click',
  'saved_page_view', 'report_listing',
  'sort_change', 'filter_change', 'filter_reset',
  'consent_banner_view', 'consent_choice',
];
const EVENT_SET = new Set(EVENT_NAMES);

const EEA = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
  'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
  'IS','LI','NO','GB','CH',
]);

const NOW = () => new Date().toISOString();
const DAY = (iso) => iso.slice(0, 10);
const rand = () => crypto.randomUUID();

function jurisdiction(country) {
  if (!country) return 'R-INTL';
  if (EEA.has(country)) return 'R-EEA';
  if (country === 'JP') return 'R-JP';
  if (country === 'CN') return 'R-CN';
  if (country === 'US') return 'R-US';
  return 'R-INTL';
}

function cors(env) {
  const origin = (env.ALLOWED_ORIGINS || '').split(',')[0]?.trim();
  return origin || '*';
}

function json(data, status = 200, origin = '*') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  });
}

// ── Cloudflare Access JWT verification ─────────────────────
async function verifyAccess(request, env) {
  const jwt = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!jwt) return { ok: false, reason: 'no-jwt' };
  if (!env.ACCESS_AUD || !env.ACCESS_TEAM_DOMAIN) return { ok: false, reason: 'access-not-configured' };
  try {
    const keys = await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`).then(r => r.json());
    const payload = await verifyJwt(jwt, keys);
    if (payload.aud && !payload.aud.includes(env.ACCESS_AUD)) return { ok: false, reason: 'aud-mismatch' };
    return { ok: true, email: payload.email };
  } catch {
    return { ok: false, reason: 'jwt-invalid' };
  }
}

function b64urlToUint8Array(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

async function verifyJwt(token, keys) {
  const [headB64, payloadB64, sigB64] = token.split('.');
  const header = JSON.parse(new TextDecoder().decode(b64urlToUint8Array(headB64)));
  const payload = JSON.parse(new TextDecoder().decode(b64urlToUint8Array(payloadB64)));
  const key = (keys.keys || []).find(k => k.kid === header.kid);
  if (!key) throw new Error('unknown kid');
  const pub = await crypto.subtle.importKey('jwk', key, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', pub, b64urlToUint8Array(sigB64), new TextEncoder().encode(`${headB64}.${payloadB64}`));
  if (!valid) throw new Error('sig-invalid');
  return payload;
}

// ── Dashboard aggregation ──────────────────────────────────
async function dashboardSummary(db, days) {
  const since = DAY(new Date(Date.now() - days * 86400000).toISOString());
  const rows = await db.prepare(
    `SELECT name, COUNT(*) AS c FROM events WHERE day >= ? GROUP BY name`
  ).bind(since).all();
  const map = {};
  for (const r of rows.results) map[r.name] = Number(r.c);

  const daily = await db.prepare(
    `SELECT day, name, COUNT(*) AS c FROM events WHERE day >= ? GROUP BY day, name ORDER BY day`
  ).bind(since).all();
  const series = {};
  for (const r of daily.results) {
    if (!series[r.day]) series[r.day] = {};
    series[r.day][r.name] = Number(r.c);
  }

  const consent = await db.prepare(
    `SELECT choice, COUNT(*) AS c FROM consent_records WHERE created_at >= ? GROUP BY choice`
  ).bind(since).all();
  const consentMap = {};
  for (const r of consent.results) consentMap[r.choice] = Number(r.c);

  const funnel = {
    page_views: map.page_view || 0,
    job_detail_opens: map.job_detail_open || 0,
    apply_clicks: map.apply_click || 0,
    saves: map.save_job || 0,
    compare_adds: map.compare_add || 0,
  };
  funnel.detail_rate = funnel.page_views ? (funnel.job_detail_opens / funnel.page_views) : 0;
  funnel.apply_rate = funnel.page_views ? (funnel.apply_clicks / funnel.page_views) : 0;

  return {
    days, since,
    eventCounts: map,
    dailySeries: series,
    consentBreakdown: consentMap,
    funnel,
  };
}

async function topJobs(db, days, limit = 10) {
  const since = DAY(new Date(Date.now() - days * 86400000).toISOString());
  const r = await db.prepare(
    `SELECT job_id, company, COUNT(*) AS opens
     FROM events
     WHERE name = 'job_detail_open' AND day >= ?
     GROUP BY job_id, company
     ORDER BY opens DESC
     LIMIT ?`
  ).bind(since, limit).all();
  return r.results;
}

async function recentEvents(db, days, limit = 200) {
  const since = DAY(new Date(Date.now() - days * 86400000).toISOString());
  const r = await db.prepare(
    `SELECT name, occurred_at, page, lang, jurisdiction, country, job_id, company, props
     FROM events WHERE day >= ? ORDER BY occurred_at DESC LIMIT ?`
  ).bind(since, limit).all();
  return r.results;
}

// ── Handlers ───────────────────────────────────────────────
async function handleConsentContext(request, env) {
  const cf = request.cf || {};
  const country = cf.country || null;
  const region = jurisdiction(country);
  return json({
    country,
    region,
    jurisdiction: region,
    policyVersion: env.POLICY_VERSION || '2026-10-28',
  }, 200, cors(env));
}

async function handleConsent(request, env) {
  const body = await readBody(request);
  if (!body || !body.anonId) return json({ error: 'anonId required' }, 400, cors(env));
  const cf = request.cf || {};
  const country = cf.country || body.country || null;
  const region = jurisdiction(country);
  const choice = ['granted', 'denied', 'partial'].includes(body.choice) ? body.choice : 'denied';
  const now = NOW();
  await env.DB.prepare(
    `INSERT INTO consent_records (id, anon_id, created_at, choice, categories, policy_version, jurisdiction, country, lang, page, withdrawn_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`
  ).bind(
    rand(), String(body.anonId), now, choice,
    JSON.stringify(body.categories || { analytics: choice === 'granted' }),
    env.POLICY_VERSION || '2026-10-28',
    region, country, body.lang || null, body.page || null
  ).run();
  return json({ ok: true, choice, region }, 200, cors(env));
}

async function handleEvents(request, env) {
  const body = await readBody(request);
  if (!body || !body.anonId || !body.sessionId) return json({ error: 'anonId and sessionId required' }, 400, cors(env));
  const cf = request.cf || {};
  const country = cf.country || body.country || null;
  const region = jurisdiction(country);
  const lang = body.lang || null;
  const page = body.page || null;
  const now = NOW();

  const events = Array.isArray(body.events) ? body.events.slice(0, 100) : [];
  const stmts = [];
  for (const e of events) {
    const name = e && e.name;
    if (!EVENT_SET.has(name)) continue;
    const occurredAt = e.occurredAt && !isNaN(Date.parse(e.occurredAt)) ? e.occurredAt : now;
    stmts.push(env.DB.prepare(
      `INSERT INTO events (id, anon_id, session_id, name, occurred_at, day, page, lang, jurisdiction, country, job_id, company, props)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      rand(), String(body.anonId), String(body.sessionId), name, occurredAt, DAY(occurredAt),
      page, lang, region, country,
      e.jobId || null, e.company || null,
      e.props ? JSON.stringify(e.props).slice(0, 2000) : null
    ));
  }
  if (stmts.length) await env.DB.batch(stmts);
  return json({ ok: true, accepted: stmts.length }, 200, cors(env));
}

async function handleDelete(request, env) {
  const url = new URL(request.url);
  const anonId = url.searchParams.get('anonId');
  if (!anonId) return json({ error: 'anonId required' }, 400, cors(env));
  await env.DB.prepare(`DELETE FROM events WHERE anon_id = ?`).bind(anonId).run();
  await env.DB.prepare(`UPDATE consent_records SET withdrawn_at = ? WHERE anon_id = ?`).bind(NOW(), anonId).run();
  return json({ ok: true }, 200, cors(env));
}

async function handleDashboard(route, request, env, ctx) {
  const auth = await authorizeDashboard(request, env);
  if (!auth.ok) {
    return new Response('Unauthorized', { status: 401, headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': cors(env) } });
  }
  const db = env.DB;
  const days = Math.min(parseInt(new URL(request.url).searchParams.get('days') || '7', 10) || 7, 365);
  if (route === '/v1/dashboard/summary') return json(await dashboardSummary(db, days), 200, cors(env));
  if (route === '/v1/dashboard/top-jobs') return json(await topJobs(db, days), 200, cors(env));
  if (route === '/v1/dashboard/events') return json(await recentEvents(db, days), 200, cors(env));
  return json({ error: 'not found' }, 404, cors(env));
}

// Access when configured; otherwise a bearer token (?token= or Authorization header).
async function authorizeDashboard(request, env) {
  if (env.ACCESS_TEAM_DOMAIN && env.ACCESS_AUD) return verifyAccess(request, env);
  if (!env.ADMIN_TOKEN) return { ok: false, reason: 'no-auth-configured' };
  const url = new URL(request.url);
  const header = request.headers.get('Authorization') || '';
  const token = url.searchParams.get('token') || (/^Bearer\s+/i.test(header) ? header.replace(/^Bearer\s+/i, '') : '');
  if (!token || token.length !== env.ADMIN_TOKEN.length) return { ok: false, reason: 'bad-token' };
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ env.ADMIN_TOKEN.charCodeAt(i);
  return diff === 0 ? { ok: true } : { ok: false, reason: 'bad-token' };
}

async function readBody(request) {
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const route = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': cors(env),
          'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      if (route === '/v1/consent-context') return handleConsentContext(request, env);
      if (route === '/v1/consent') return handleConsent(request, env);
      if (route === '/v1/events') return handleEvents(request, env);
      if (route === '/v1/data') {
        if (request.method === 'DELETE') return handleDelete(request, env);
        return json({ error: 'method not allowed' }, 405, cors(env));
      }
      if (route.startsWith('/v1/dashboard/')) return handleDashboard(route, request, env, ctx);
      if (route === '/dashboard' || route === '/dashboard/') {
        const auth = await authorizeDashboard(request, env);
        if (!auth.ok) return new Response('Unauthorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
        return new Response(dashboardHtml(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      if (route === '/' || route === '') {
        return json({ service: 'robot-works-analytics', status: 'ok' }, 200, cors(env));
      }
      return json({ error: 'not found' }, 404, cors(env));
    } catch (e) {
      return json({ error: String(e.message || e) }, 500, cors(env));
    }
  },

  async scheduled(event, env, ctx) {
    // Retention: delete events older than RETENTION_DAYS
    const days = parseInt(env.RETENTION_DAYS || '365', 10);
    const cutoff = DAY(new Date(Date.now() - days * 86400000).toISOString());
    ctx.waitUntil(env.DB.prepare(`DELETE FROM events WHERE day < ?`).bind(cutoff).run());
  },
};
