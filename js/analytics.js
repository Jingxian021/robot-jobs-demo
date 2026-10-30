/* Robot Works — consent + first-party anonymous analytics (no third parties)
   Contract (must match backend/src/index.js):
     POST /v1/consent  { anonId, choice, page, lang }
     POST /v1/events   { anonId, sessionId, lang, page, events:[{name,occurredAt,props,jobId,company}] }
     GET  /v1/consent-context -> { country, region, jurisdiction, policyVersion }
     DELETE /v1/data?anonId=xxx
*/
(function () {
  'use strict';
  var STORAGE = {
    anonId: 'rb_anon_id',
    sessionId: 'rb_session_id',
    consent: 'rb_consent',
    lang: 'rb_lang',
  };
  var POLICY = '2026-10-28';
  var BATCH_MS = 3000;
  var FLUSH_MS = 8000;
  var MAX_BATCH = 50;

  // ── 4-language consent copy ────────────────────────────
  var COPY = {
    en: {
      title: 'Privacy choices',
      body: 'We use first-party cookies to understand how this job board is used, so we can improve the experience. No ads, no third-party tracking, no data sale.',
      accept: 'Accept all',
      deny: 'Deny all',
      settings: 'Cookie settings',
      deleteLabel: 'Delete my data',
      deleteDone: 'Your anonymous data has been deleted.',
      granted: 'Analytics: on',
      denied: 'Analytics: off',
    },
    ja: {
      title: 'プライバシー設定',
      body: 'この求人サイトの使いやすさを改善するため、ファーストパーティ Cookie を使用します。広告や第三者トラッキング、データ販売は行いません。',
      accept: 'すべて許可',
      deny: 'すべて拒否',
      settings: 'Cookie 設定',
      deleteLabel: 'データを削除',
      deleteDone: '匿名データを削除しました。',
      granted: '分析：オン',
      denied: '分析：オフ',
    },
    zh: {
      title: '隐私选择',
      body: '我们使用第一方 Cookie 统计本网站的使用情况，用于改进体验。不投放广告、不做第三方追踪、不售卖数据。',
      accept: '全部接受',
      deny: '全部拒绝',
      settings: 'Cookie 设置',
      deleteLabel: '删除我的数据',
      deleteDone: '你的匿名数据已删除。',
      granted: '分析：开启',
      denied: '分析：关闭',
    },
    de: {
      title: 'Datenschutz',
      body: 'Wir verwenden First-Party-Cookies, um die Nutzung dieser Jobbörse zu verstehen und das Erlebnis zu verbessern. Keine Werbung, kein Tracking durch Dritte, kein Datenverkauf.',
      accept: 'Alle akzeptieren',
      deny: 'Alle ablehnen',
      settings: 'Cookie-Einstellungen',
      deleteLabel: 'Meine Daten löschen',
      deleteDone: 'Ihre anonymen Daten wurden gelöscht.',
      granted: 'Analyse: an',
      denied: 'Analyse: aus',
    },
  };

  var lang = function () { return (localStorage.getItem(STORAGE.lang) || 'en'); };

  function getAnonId() {
    var id = localStorage.getItem(STORAGE.anonId);
    if (!id) { id = uuid(); localStorage.setItem(STORAGE.anonId, id); }
    return id;
  }
  function getSessionId() {
    var id = sessionStorage.getItem(STORAGE.sessionId);
    if (!id) { id = uuid(); sessionStorage.setItem(STORAGE.sessionId, id); }
    return id;
  }
  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  function getConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE.consent) || '{}'); }
    catch { return {}; }
  }
  function setConsent(c) { localStorage.setItem(STORAGE.consent, JSON.stringify(c)); }
  function analyticsAllowed() { return getConsent().choice === 'granted'; }
  function page() { return (document.body && document.body.dataset.page) || location.pathname.split('/').pop() || 'index'; }

  // ── API base from <meta name="rb-api"> ────────────────
  var API_BASE = (function () {
    var m = document.querySelector('meta[name="rb-api"]');
    return (m && m.getAttribute('content')) || '';
  })();
  if (API_BASE) API_BASE = API_BASE.replace(/\/+$/, '');

  var queue = [];
  var batchTimer = null;
  var flushTimer = null;

  function flush() {
    if (!API_BASE || !analyticsAllowed() || queue.length === 0) return;
    var batch = queue.splice(0, MAX_BATCH);
    var payload = {
      anonId: getAnonId(),
      sessionId: getSessionId(),
      lang: lang(),
      page: page(),
      events: batch,
    };
    var body = JSON.stringify(payload);
    var sent = false;
    if (navigator.sendBeacon) {
      try { sent = navigator.sendBeacon(API_BASE + '/v1/events', new Blob([body], { type: 'application/json' })); } catch (_) {}
    }
    if (!sent) {
      fetch(API_BASE + '/v1/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
    }
  }
  function scheduleFlush(delay) {
    if (batchTimer) clearTimeout(batchTimer);
    batchTimer = setTimeout(flush, delay || BATCH_MS);
  }
  window.addEventListener('pagehide', flush);
  window.addEventListener('beforeunload', flush);
  setInterval(flush, FLUSH_MS);

  // ── Public track API ──────────────────────────────────
  window.RB = window.RB || {};
  window.RB.track = function (name, props, jobId, company) {
    if (!analyticsAllowed()) return;
    queue.push({ name: name, occurredAt: new Date().toISOString(), props: props || null, jobId: jobId || null, company: company || null });
    if (queue.length >= MAX_BATCH) flush(); else scheduleFlush();
  };
  window.RB.openConsent = function () { showBanner(true); };
  window.RB.consent = getConsent;

  function submitConsent(choice) {
    var record = { choice: choice, at: new Date().toISOString(), policy: POLICY };
    setConsent(record);
    hideBanner();
    if (API_BASE) {
      fetch(API_BASE + '/v1/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anonId: getAnonId(), choice: choice, page: page(), lang: lang() }),
      }).catch(function () {});
    }
    if (choice === 'granted') {
      // retroactively record the banner view now that we may track
      window.RB.track('consent_banner_view');
      window.RB.track('consent_choice', { choice: 'granted' });
    }
  }

  function deleteMyData() {
    if (!API_BASE) { alert(COPY[lang()].deleteDone); return; }
    var id = getAnonId();
    fetch(API_BASE + '/v1/data?anonId=' + encodeURIComponent(id), { method: 'DELETE' })
      .then(function () {
        localStorage.removeItem(STORAGE.anonId);
        localStorage.removeItem(STORAGE.consent);
        alert(COPY[lang()].deleteDone);
        location.reload();
      }).catch(function () { alert('Delete request failed. Please try again.'); });
  }

  // ── Banner UI ─────────────────────────────────────────
  function ensureStyles() {
    if (document.getElementById('rb-consent-style')) return;
    var s = document.createElement('style');
    s.id = 'rb-consent-style';
    s.textContent = [
      '.rb-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:520px;margin:0 auto;background:#111;color:#fff;padding:18px 20px;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,.25);font:13px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif;border-radius:2px}',
      '.rb-banner h4{margin:0 0 6px;font-size:14px;font-weight:600;letter-spacing:-.01em}',
      '.rb-banner p{margin:0 0 12px;color:#ccc}',
      '.rb-banner .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}',
      '.rb-banner button{background:#fff;color:#111;border:none;padding:8px 14px;font:inherit;font-weight:500;cursor:pointer;border-radius:2px}',
      '.rb-banner button.secondary{background:transparent;color:#fff;border:1px solid #666}',
      '.rb-banner a{color:#9cf;text-decoration:underline;cursor:pointer;font-size:12px}',
      '.rb-banner .status{color:#9c9;font-size:12px;margin-left:auto}',
      '@media(min-width:640px){.rb-banner{left:auto;right:24px;bottom:24px}}',
    ].join('');
    document.head.appendChild(s);
  }

  function showBanner(manageMode) {
    if (!API_BASE) return;
    ensureStyles();
    var c = COPY[lang()];
    if (document.getElementById('rb-consent-banner')) return;
    var b = document.createElement('div');
    b.id = 'rb-consent-banner';
    b.className = 'rb-banner';
    b.innerHTML = '<h4>' + c.title + '</h4><p>' + c.body + '</p>' +
      '<div class="row">' +
      '<button id="rb-accept">' + c.accept + '</button>' +
      '<button class="secondary" id="rb-deny">' + c.deny + '</button>' +
      '<a id="rb-delete">' + c.deleteLabel + '</a>' +
      (manageMode ? '<span class="status" id="rb-status">' + (analyticsAllowed() ? c.granted : c.denied) + '</span>' : '') +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('rb-accept').onclick = function () { submitConsent('granted'); };
    document.getElementById('rb-deny').onclick = function () { submitConsent('denied'); };
    document.getElementById('rb-delete').onclick = function () { if (confirm(c.deleteLabel + '?')) deleteMyData(); };
  }
  function hideBanner() { var b = document.getElementById('rb-consent-banner'); if (b) b.remove(); }

  // ── Footer "Cookie settings" entry point ──────────────
  function wireCookieSettings() {
    document.querySelectorAll('[data-rb-cookie]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); showBanner(true); });
    });
  }

  function init() {
    wireCookieSettings();
    // Without a configured backend the site behaves exactly like v1:
    // no banner, no network calls, nothing stored.
    if (!API_BASE) return;
    var c = getConsent();
    if (!c.choice || c.policy !== POLICY) {
      // first visit or policy changed
      fetch(API_BASE + '/v1/consent-context').then(function (r) { return r.json(); }).then(function (ctx) {
        if (ctx && !c.choice) showBanner(false);
      }).catch(function () { showBanner(false); });
    } else if (analyticsAllowed()) {
      window.RB.track('page_view');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
