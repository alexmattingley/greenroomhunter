# Tech Stack

## Overview
Greenroom Hunter is a surf-data aggregator. It pulls surf-related data (buoys, wind, tides) from external APIs (NOAA, CDIP, Windy) and displays it using Next.js (server-side rendering) with React (client-side components). Responses are cached in Redis (hosted by Upstash) to improve performance and reduce unnecessary external API calls.

## Framework & Runtime
- **Next.js 15** (Pages Router) with **React 19**
- **Node.js** 22+
- **yarn** package manager

## Language
- JavaScript today (TypeScript migration in progress — `typescript`, `@types/*`, and `@typescript-eslint/*` are already installed)

## Styling
- **styled-components** (primary)
- **@emotion/react** & **@emotion/styled** (via MUI)
- **@mui/material** & **@mui/icons-material** (Material UI v7)
- **stylelint** with styled-components config
- Rule: never use `!important`; increase specificity instead (see `.cursorrules`)

## Data Visualization
- **Chart.js** v4 with **chartjs-plugin-annotation**

## Data Sources & Integrations
- **NOAA / NDBC API** — buoy and tide data (fetched via the internal API route and cached in Redis)
- **CDIP** — embedded forecast image only (the "WW3 6-day forecast" plot from `cdip.ucsd.edu`, loaded directly in the browser via `<img>`; not fetched or cached)
- **Windy.com** — weather/wind integration
- Date/time: **luxon**, **moment-timezone**
- HTTP: **node-fetch**

## Caching / Infrastructure
- **Redis** for caching, hosted by **Upstash** (serverless, pay-as-you-go)
- Local dev uses a local Redis instance; production uses the Upstash instance

## Testing
- **Jest** 30 with **jest-environment-jsdom**
- **@testing-library/react**, **@testing-library/jest-dom**, **@testing-library/user-event**

## Tooling
- **ESLint** 9 with `eslint-config-next`
- **prop-types** for runtime prop validation today, but all new components should be typescript

## Deployment
- **Vercel** (live at [greenroomhunter.com](https://greenroomhunter.com))

---

## Architecture

### Request Flow
1. **User Request** — A user visits a page (e.g. `/location/santa-barbara`). Next.js calls `getServerSideProps` to fetch the required data.
2. **API Route** — Rather than calling NOAA/CDIP/Windy directly from `getServerSideProps`, the request is routed through an internal API endpoint (e.g. `/api/data`).
3. **Cache Layer (Redis)** — The API route checks Redis first:
   - **Cache hit:** return the cached data.
   - **Cache miss:** fetch fresh data from NOAA/NDBC, store it in Redis with a TTL (expiration), then return it.
4. **Client Rendering** — The server passes the data as props to the page component, and React renders the UI.

### Caching: Redis + Upstash
- **Redis** — an in-memory data store used for caching. It keeps frequently used data (e.g. buoy readings) in memory so we don't hit NOAA/CDIP/Windy on every request, which speeds up page loads and avoids rate limits.
- **Local development** — run Redis locally on macOS:
  ```bash
  brew install redis
  brew services start redis
  ```
- **Upstash** — a cloud-hosted, serverless Redis provider. Vercel apps can't rely on a local Redis, so Upstash provides a managed instance accessible from both local dev and production.
- **Connection string** — stored as the `REDIS_URL` environment variable (in `.env.local` locally, and in the Vercel dashboard for production).

> **Note:** Account-specific details (Upstash console URL, instance ID, etc.) live in the git-ignored `private.local.md` file, not in this committed doc.

### Environment Variables
- **Local development** — store secrets in `.env.local` (not committed to git):
  ```env
  REDIS_URL=redis://localhost:6379
  NOAA_API_KEY=...
  ```
- **Production (Vercel)** — variables live in the Vercel dashboard under **Settings → Environment Variables**:
  ```env
  REDIS_URL=rediss://default:<password>@<endpoint>.upstash.io:6379
  ```
- **`.env.example`** — keep a committed template listing which vars are required (with no secret values).

### Key Points to Remember
- **Never import API routes directly** (e.g. don't `import getAllData from 'pages/api/data'`). Always call them via `fetch('/api/...')`.
- The Redis cache exists to avoid hammering NOAA/CDIP/Windy — respect it and set sensible TTLs.
- Keep secrets out of git; use `.env.local` locally and the Vercel dashboard in production.
