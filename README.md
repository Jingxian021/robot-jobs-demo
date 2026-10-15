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

## Notes

- This is a frontend demo. Job listings are synthetic sample data.
- Apply buttons open real employer career pages (e.g. figure.ai/careers) to demonstrate the external-application flow.
- Compare and saved-job state persists only in the current browser via `localStorage`.
