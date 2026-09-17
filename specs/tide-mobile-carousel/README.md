# Spec: Tide block — mobile-first per-day carousel

> **Status:** 🟢 Implemented — browser QA passed (pending physical-phone touch check) · **Priority:** 🔴 High · **Complexity:** M
> **Owner:** Alex · **Last updated:** 2026-09-16
> **Road map:** [`agent/road-map.md`](../../agent/road-map.md) → *Next Up*

The tide chart is unusable on mobile — the most painful UX issue in the app. This
spec makes it mobile-first: one chart per day in a 5-day carousel.

## Goals
- Mobile-first tide visualization that's genuinely usable on a phone.
- One chart per day with carousel navigation (5 days).
- Simple tooltips + finger-scrub interaction (like the Buoy Breakdown chart).

## Non-goals
- Rotating the axes (time stays on x, height on y).
- Custom drag/gesture code (reuse Chart.js index-mode interaction).
- Redesigning the surrounding Location page or side nav.

## Files
`01-context` (why) · `02-requirements` (what) · `03-design` (how) ·
`04-tasks` (order) · `05-decisions` (decisions + open questions) ·
`06-validation` (how we verify it's done). See [`../README.md`](../README.md) for
the general spec structure.

## Affected code
- `components/LocationPage/components/Tide/` — `TideContainer`, `TideChart`
  (+ `generateTideData.js`), `TideTable`
- `data/api-data/noaa/tides/` — `fetch-tide-data.js`, `parse-tide-data.js`
