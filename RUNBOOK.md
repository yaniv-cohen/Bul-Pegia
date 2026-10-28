# Bul Pgia Runbook

How to set up, run, test, deploy and troubleshoot Bul Pgia.
For the API reference, see [README.md](README.md).

## Architecture

| Part | Tech | Code | Default URL |
| --- | --- | --- | --- |
| Front end | React 18, Vite 4, Chakra UI, SCSS | `src/` | http://localhost:5173 |
| API | Python, Flask 3, served by gunicorn in production | `server/` | http://127.0.0.1:5000 |

- The front end only talks to the API in **vs computer** mode. In **vs human** mode everything runs in the browser.
- The API keeps games **in memory** (`app.extensions["games"]`), so a restart or redeploy loses every game.
- The cheat panel ("רמי הרמאי") solver runs entirely in the browser (`src/logic/`).

## Prerequisites

- Node.js 18 or newer, with npm
- Python 3.11 or newer

## First-time setup

```bash
npm ci

python -m venv .venv
# Git Bash / macOS / Linux:
source .venv/bin/activate        # Git Bash on Windows: source .venv/Scripts/activate
# PowerShell:
# .venv\Scripts\Activate.ps1

pip install -r requirements-dev.txt   # includes requirements.txt

cp .env.example .env
```

`.env` holds a single setting:

| Variable | Used by | Meaning |
| --- | --- | --- |
| `VITE_SERVER_URL` | front end, at **build** time | Base URL of the API. Defaults to `http://127.0.0.1:5000` if unset. |

`.env` is git-ignored. Vite bakes the value into the bundle, so you must rebuild after changing it.

## Run locally

Use two terminals, both from the repo root:

```bash
# 1. API (activate the venv first)
npm run server            # = flask --app server.app run  →  http://127.0.0.1:5000

# 2. Front end
npm run dev               # →  http://localhost:5173
```

To run the front end against the hosted API without a local server, set this in `.env` and restart `npm run dev`:

```
VITE_SERVER_URL=https://bul-pgia-back.onrender.com
```

Quick API smoke test:

```bash
curl http://127.0.0.1:5000/createNewGame/4/6/1/10          # → e.g. 3f9a
curl http://127.0.0.1:5000/game/3f9a/guess/ABCD
```

## Tests and checks

| Command | What it runs |
| --- | --- |
| `npm test` | Vitest, once: logic/util unit tests, `useGame` hook tests, and component flow tests (jsdom, API mocked) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:server` | pytest on `server/tests` (needs the venv active): scoring, secret generation, every endpoint through Flask's test client |
| `npm run build` | Type-check and production build to `dist/` |

Run all of these before pushing:

```bash
npm run typecheck && npm test && npm run test:server && npm run build
```

Where the tests live:
- Front end: `*.test.ts(x)` next to the code. Shared setup is in `src/test/setup.ts`.
- Server: `server/tests/`.

## Build and deploy

### API (Render)

| Setting | Value |
| --- | --- |
| Build command | `pip install -r requirements.txt` |
| Start command | `gunicorn server.wsgi:app` |
| Root directory | repo root |

> The server code moved from `server/logic/` to a `server/` package. If the Render service still uses an old start command (for example `cd server/logic && gunicorn app:app`), update it to the command above before deploying this branch.

### Front end

```bash
VITE_SERVER_URL=https://bul-pgia-back.onrender.com npm run build
```

This writes a static site to `dist/`. Serve it from any static host (Render static site, Netlify, GitHub Pages and so on). `npm run preview` serves `dist/` locally for a final check. `dist/` is git-ignored, so don't commit it.

## Operations and troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| "Start" spins for about 30 seconds, then the game opens | Render free tier puts the API to sleep when idle | Expected. The first request wakes it. |
| Toast: "השרת לא זמין" when starting | API down, wrong `VITE_SERVER_URL`, or CORS | Open `<VITE_SERVER_URL>/gameCount` in the browser. If it loads, check the URL in `.env` and rebuild. |
| Toast during a game, or the API returns `404 game not found` | API restarted or redeployed and lost in-memory games | Start a new game. Games don't survive restarts. |
| API returns `409` | Guess sent after the game ended | The client shows the end screen. Only API users see this. |
| API returns `400` | Guess length or letters don't match the game, or invalid settings | See the `error` field in the response. |
| CORS error in the browser console | API not running Flask-Cors, or a proxy stripping headers | `CORS(app)` is enabled in `create_app()`. Check the proxy/host config. |
| `Address already in use` on :5000 or :5173 | Another process holds the port | `flask --app server.app run --port 5001` (and update `.env`), or `npm run dev -- --port 5174`. On macOS, AirPlay uses port 5000. |
| `AttributeError: module 'ast' has no attribute 'Str'` | Old Flask/Werkzeug or pytest on Python 3.12+ | `pip install -r requirements-dev.txt` to get the pinned versions. |
| Front end still calls the old API URL | `VITE_SERVER_URL` is read at build/dev-server start | Restart `npm run dev` or rebuild. |

### Resetting state

- **API:** restart the process. All games are cleared, and `/gameCount` returns to `0`.
- **Front end:** reload the page. Nothing is persisted in the browser.
