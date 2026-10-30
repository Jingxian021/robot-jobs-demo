# Robot Works — Robotics Industry Job Board Demo

A minimal, black/white/gray job discovery demo for the robotics industry. Inspired by the stark, typography-led aesthetic of Figure AI.

**Live features**

- Home page with five live filters (Date, Location, Position, Salary, Experience)
- Row-based job list designed for scanning, with sort order toggle (newest / oldest)
- Save jobs and Select/Compare states stored in `localStorage`
- "Saved jobs" view that filters the list to saved items only
- Detail page with role description, requirements, and external apply link
- Compare page for side-by-side evaluation (2–4 jobs)
- Persistent Compare bar across Home and Detail
- Four-language UI switcher (EN / 日本語 / 中文 / Deutsch) persisted in `localStorage`
- Back buttons on Detail that preserve Home filters and scroll position
- Synthetic demo data for 24 robotics roles

**Pages**

- `index.html` — Home / job list
- `detail.html?id=job-N` — Job detail
- `compare.html` — Side-by-side comparison
- `saved.html` — Saved jobs and followed companies (stored locally)

**Analytics & consent (v2.1, optional backend)**

- First-party, anonymous event collection — no ads, no third-party tracking, no data sale.
- Consent banner in EN / 日本語 / 中文 / DE with Accept all / Deny all and "Delete my data".
- Jurisdiction is detected from the visitor's country and recorded (R-EEA / R-JP / R-CN / R-US / R-INTL).
- Tracking is fully disabled until consent is granted; a denied choice stores no events.
- Events: page_view, job_detail_open, apply_click, save_job, unsave_job, save_company, unsave_company, compare_add, compare_remove, compare_open, compare_apply_click, saved_page_view, sort_change, report_listing, consent_banner_view, consent_choice.

The backend is a Cloudflare Worker + D1 database in `backend/`. The frontend only talks to it if `<meta name="rb-api" content="...">` is set; with an empty value the site behaves exactly like the v1 demo (no banner, no tracking).

## Deploy to GitHub Pages

If this folder is already a git repository (it is in this workspace), only the remote steps are needed:

```bash
cd robot-jobs-demo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you copied the folder to a new machine without git history, initialize it first:

```bash
git init -b main
git add .
git commit -m "Add Robot Works demo"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then on GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and the `/(root)` folder, then click **Save**.
4. After a minute, the site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

## Local preview

Open `index.html` directly in a browser, or run a local server:

```bash
cd robot-jobs-demo
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy the analytics backend (Cloudflare Worker + D1)

The frontend stays on GitHub Pages. The backend is a tiny Worker that receives events and serves a read-only dashboard.

```bash
cd backend
npm install -g wrangler   # or: npx wrangler

# 1. Create the D1 database (returns a database_id)
npx wrangler d1 create robot_works

# 2. Paste the database_id into backend/wrangler.toml

# 3. Apply the schema
npx wrangler d1 execute robot_works --remote --file=./schema.sql

# 4. (Optional but recommended) set an admin token fallback for the dashboard
npx wrangler secret put ADMIN_TOKEN

# 5. Deploy
npx wrangler deploy
```

After deploy, the Worker is live at `https://robot-works-analytics.<your-subdomain>.workers.dev`. Then:

- Set the Worker URL in all four HTML files: `<meta name="rb-api" content="https://robot-works-analytics.<your-subdomain>.workers.dev">`
- (Recommended) Protect the dashboard with Cloudflare Zero Trust Access: create an Access application for the Worker domain and restrict `/dashboard*` to your email. Set `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` in `wrangler.toml`, then redeploy.
- Open `https://robot-works-analytics.<your-subdomain>.workers.dev/dashboard` to view the read-only product analytics.

## Notes

- This is a frontend demo. Job listings are synthetic sample data.
- Apply buttons open real employer career pages (e.g. figure.ai/careers) to demonstrate the external-application flow.
- Compare and saved-job state persists only in the current browser via `localStorage`.
- Analytics data retention defaults to 365 days (configurable via `RETENTION_DAYS`); a daily cron prunes older events.
- No personally identifiable information is collected or stored. Users can delete their anonymous data via the consent banner's "Delete my data" action.
