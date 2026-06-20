# Automate with Intent — Cohort Learning Portal

A 66-day, 8-district static learning portal for the **Automate with Intent** cohort: manual QA testers becoming job-ready Test Automation Engineers using JavaScript + Playwright + Sauce Demo.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to any static host.

## Deploy

### Netlify / Vercel

Point the host at the repository. Set build command to `npm run build` and publish directory to `dist`. No server-side config required.

### GitHub Pages

A `deploy.yml` workflow is included. Push to `main` to trigger a deploy to GitHub Pages. Enable Pages in repository Settings → Pages → Source: GitHub Actions.

## Architecture

- **Vite + React** — static build, no backend
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **Prism.js** — JavaScript syntax highlighting for code samples
- **localStorage** — all progress state, keyed `awi_progress` → `{ "day_1_done": true, ... }`

## Data

`public/cohort-data.json` — 59 entries covering 66 calendar days. Three entry types:

- **Weekday** (`isSunday: false, isStage: false`) — Days 1–6, 8–13, etc.
- **Sunday recap** (`isSunday: true`) — Days 7, 14, 21, 28, 35, 42, 52
- **District 8 stage** (`isStage: true`) — 7 entries covering Days 53–66 in multi-day ranges

Do not edit content in the JSON file — all educational content has been through review cycles.

## Unlock Logic

- Day 1 always unlocked
- Each day unlocks after the previous day's reflection is submitted
- Sunday entries auto-unlock their Monday successor (no gate on recap days)
- District 8 stage entries unlock/lock as a unit (multi-day ranges are one entry)
- Progress keyed by `dayStart` value, not individual calendar days
