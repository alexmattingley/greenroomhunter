# 01 · Context & Problem

## Current state
The Tide block renders inside the Location page and has three parts:

- **`TideContainer`** — orchestrates: parses NOAA data and lays out the table + chart.
- **`TideTable`** — shows the current tide, the next high/low, and a list of high/low
  points.
- **`TideChart`** — a single Chart.js **line** chart (class component) covering
  **today + tomorrow** on one continuous x-axis.

### Data flow
1. `fetch-tide-data.js` calls the NOAA tides-and-currents API for a station,
   spanning **today → tomorrow**, and is cached in Redis.
2. `parse-tide-data.js` (luxon) dedupes points, computes high/low tides, the
   current tide, and the next tide, and formats timestamps as `MMM dd, h:mm a`.
3. `generateTideData.js` builds the Chart.js config: a single dataset, a pink
   "day divider" annotation line, x-axis tick labels hidden (`callback: () => ''`),
   height on the y-axis.

## Problem
- On mobile the single two-day chart is **cramped and unreadable** — points overlap,
  x-axis labels are hidden, and there's no way to inspect a specific time.
- No usable tooltips or interaction for reading the tide at a given time.
- Time is on the x-axis and gets squeezed; the roadmap asks for **time on the y-axis**.

## Why now
Listed as **🚀 Next Up** on the road map — it's the single most painful UX issue in
the app today.

## Constraints
Follow the constitution — [`agent/tech-stack.md`](../../agent/tech-stack.md) (stack,
caching, timezone-per-location) and [`agent/conventions.md`](../../agent/conventions.md)
(no `!important`, TypeScript for new components). Feature-specific decisions live in
[05-decisions.md](./05-decisions.md).
