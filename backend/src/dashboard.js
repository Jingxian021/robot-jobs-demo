// Read-only product optimization dashboard (served by Worker at /dashboard).
// Pure static HTML/CSS/JS — no build step. Fetches /v1/dashboard/*.

export function dashboardHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Robot Works — Product analytics</title>
<style>
  :root{--bg:#fff;--ink:#111;--ink2:#444;--ink3:#888;--line:#e4e4e4;--surface:#f7f7f7;--mono:ui-monospace,Menlo,Consolas,monospace;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;font-size:14px;line-height:1.55;-webkit-font-smoothing:antialiased}
  header{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(255,255,255,.94);backdrop-filter:blur(6px);z-index:10}
  .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
  .bar{display:flex;align-items:center;justify-content:space-between;height:56px;gap:16px}
  .brand{font-weight:600;letter-spacing:-.02em}
  .muted{color:var(--ink3);font-size:11px;font-family:var(--mono);letter-spacing:.08em;text-transform:uppercase}
  .range{display:flex;gap:4px}
  .range button{border:1px solid var(--line);background:#fff;padding:6px 12px;font:inherit;cursor:pointer;border-radius:2px}
  .range button.active{background:var(--ink);color:#fff;border-color:var(--ink)}
  main{max-width:1200px;margin:0 auto;padding:28px 24px 120px}
  h2{font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin:32px 0 12px;border-bottom:1px solid var(--line);padding-bottom:6px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
  .kpi{border:1px solid var(--line);padding:16px;border-radius:2px}
  .kpi .v{font-size:28px;font-weight:600;letter-spacing:-.03em}
  .kpi .k{color:var(--ink3);font-size:11px;font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;color:var(--ink3);font-size:11px;font-family:var(--mono);letter-spacing:.06em;text-transform:uppercase;font-weight:500;padding:8px 10px;border-bottom:1px solid var(--line)}
  td{padding:8px 10px;border-bottom:1px solid var(--line);color:var(--ink2)}
  .bar-row{display:flex;align-items:center;gap:10px}
  .bar-track{flex:1;height:8px;background:var(--surface);border-radius:2px;overflow:hidden}
  .bar-fill{height:100%;background:var(--ink)}
  .note{color:var(--ink3);font-size:12px;margin-top:20px}
  .spinner{color:var(--ink3);font-family:var(--mono)}
</style>
</head>
<body>
<header><div class="bar wrap">
  <span class="brand">Robot Works</span>
  <span class="muted">Product analytics — read-only</span>
  <div class="range" id="range">
    <button data-days="7">7d</button>
    <button data-days="30" class="active">30d</button>
    <button data-days="90">90d</button>
  </div>
</div></header>
<main>
  <h2>Funnel</h2>
  <div class="grid" id="kpis"><div class="spinner">Loading…</div></div>

  <h2>Event counts</h2>
  <table id="eventCounts"><tbody></tbody></table>

  <h2>Top jobs by detail opens</h2>
  <table id="topJobs"><thead><tr><th>Job ID</th><th>Company</th><th>Opens</th><th></th></tr></thead><tbody></tbody></table>

  <h2>Recent events</h2>
  <table id="recent"><thead><tr><th>Time</th><th>Event</th><th>Page</th><th>Lang</th><th>Region</th><th>Country</th><th>Job</th><th>Company</th></tr></thead><tbody></tbody></table>

  <p class="note">Data is first-party and aggregated. No personally identifiable information is stored. Retention: 365 days.</p>
</main>
<script>
const daysBtn = document.querySelectorAll('#range button');
daysBtn.forEach(b => b.addEventListener('click', () => {
  daysBtn.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  load(parseInt(b.dataset.days,10));
}));

const TOKEN = new URLSearchParams(location.search).get('token');
const qs = '?days=';

async function load(days) {
  const t = TOKEN ? '&token=' + encodeURIComponent(TOKEN) : '';
  const [summary, jobs, events] = await Promise.all([
    fetch('/v1/dashboard/summary' + qs + days + t).then(r=>r.json()),
    fetch('/v1/dashboard/top-jobs' + qs + days + t).then(r=>r.json()),
    fetch('/v1/dashboard/events' + qs + days + t).then(r=>r.json()),
  ]);
  document.getElementById('kpis').innerHTML = kpiRows(summary);
  document.querySelector('#eventCounts tbody').innerHTML = eventRows(summary.eventCounts);
  document.querySelector('#topJobs tbody').innerHTML = jobRows(jobs);
  document.querySelector('#recent tbody').innerHTML = eventListRows(events);
}

function kpiRows(s){
  const f = s.funnel || {};
  const fmt = n => (n||0).toLocaleString();
  const pct = r => (r*100).toFixed(1)+'%';
  const items = [
    ['Page views', fmt(f.page_views)],
    ['Detail opens', fmt(f.job_detail_opens)],
    ['Detail rate', pct(f.detail_rate||0)],
    ['Apply clicks', fmt(f.apply_clicks)],
    ['Apply rate', pct(f.apply_rate||0)],
    ['Saves', fmt(f.saves)],
    ['Compare adds', fmt(f.compare_adds)],
  ];
  return items.map(([k,v]) => '<div class="kpi"><div class="v">'+v+'</div><div class="k">'+k+'</div></div>').join('');
}

function eventRows(m){
  const order = ['page_view','job_detail_open','apply_click','save_job','unsave_job','save_company','unsave_company','compare_add','compare_remove','compare_open','compare_apply_click','saved_page_view','sort_change','filter_change','filter_reset','report_listing','consent_banner_view','consent_choice'];
  const max = Math.max(1, ...Object.values(m||{}));
  return order.filter(n => (m||{})[n]).map(n => {
    const v = m[n];
    return '<tr><td>'+n+'</td><td style="text-align:right">'+v+'</td><td><div class="bar-track"><div class="bar-fill" style="width:'+(v/max*100)+'%"></div></div></td></tr>';
  }).join('') || '<tr><td class="muted">No events</td></tr>';
}

function jobRows(rows){
  const max = Math.max(1, ...(rows||[]).map(r=>r.opens));
  return (rows||[]).map(r => '<tr><td>'+r.job_id+'</td><td>'+r.company+'</td><td style="text-align:right">'+r.opens+'</td><td><div class="bar-track"><div class="bar-fill" style="width:'+(r.opens/max*100)+'%"></div></div></td></tr>').join('') || '<tr><td class="muted">No data</td></tr>';
}

function eventListRows(rows){
  return (rows||[]).map(r => '<tr><td class="muted">'+(r.occurred_at||'').replace('T',' ').slice(0,16)+'</td><td>'+(r.name||'')+'</td><td>'+(r.page||'')+'</td><td>'+(r.lang||'')+'</td><td>'+(r.jurisdiction||'')+'</td><td>'+(r.country||'')+'</td><td>'+(r.job_id||'')+'</td><td>'+(r.company||'')+'</td></tr>').join('') || '<tr><td class="muted">No events</td></tr>';
}

load(30);
</script>
</body>
</html>`;
}
