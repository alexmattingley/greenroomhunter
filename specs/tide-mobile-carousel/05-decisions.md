# 05 · Decisions & Open Questions

## Decision log
Record each locked decision as: **date — decision — rationale.**

- **2026-09-16 — Feature specs live in `specs/<feature>/`; `agent/` stays reserved
  for the constitution.** — Keeps living plans separate from durable project docs.
- **2026-09-16 — Cover 5 days (today + next 4).** — Widens the NOAA fetch window
  from today+tomorrow; enough lookahead to plan a session without hammering the API.
- **2026-09-16 — Keep time on the x-axis, tide height on the y-axis.** — This
  **overrides the road-map wording** ("time on the y-axis"). Standard orientation
  reads best; the real fix for mobile is one-chart-per-day + carousel, not rotating
  the axes. _Road map should be updated to match._
- **2026-09-16 — "Drag" = Chart.js index-mode interaction, mirroring the Buoy
  Breakdown chart.** — `interaction: { mode: 'index', intersect: false }` makes the
  tooltip follow the finger/cursor as it scrubs across the chart. No custom drag code.
- **2026-09-16 — Tooltip is simple: tide height + time.** — Keep it legible on
  mobile; avoid clutter.
- **2026-09-16 — Carousel controls: swipe + arrows + dot indicators.** — Works for
  touch and pointer; dots communicate position/day count.
- **2026-09-16 — Use an existing open-source carousel (Embla, `embla-carousel-react`)
  rather than building a custom one.** — Maintained, lightweight, dependency-free,
  supports React 19, great touch/swipe; lets us render our own slides + arrows/dots.
- **2026-09-16 — Keep the current-tide summary + high/low table, made per-day /
  synced to the visible day.** — Table content reflects the day currently shown in
  the carousel.
- **2026-09-16 — Stay on Chart.js v4; author new/changed components in TypeScript.**
  — Matches the stack and the TS-migration convention.
- **2026-09-16 — No mock; follow existing `styles-data` tokens and current look.**
- **2026-09-16 — Permanent labels at high/low points + smaller markers.** — A custom
  Chart.js plugin draws an always-visible mini-label (height + time) above highs /
  below lows so the key numbers are readable at a glance; markers shrunk 5px → 2.5px
  so they don't overpower the line. The hover/scrub tooltip stays for reading
  arbitrary times.
- **2026-09-16 — Hover crosshair + offset labels.** — Added a second plugin that draws
  a vertical crosshair and a highlighted dot at the hovered point. Permanent labels are
  offset from the curve with a thin connector, and the y-axis range is padded (~35% of
  the range) so labels sit clearly off the line and it's obvious the line is hoverable.
- **2026-09-16 — Hide x-axis tick labels; keep the "Time" title.** — The permanent
  high/low labels already show the time, so per-tick labels were redundant clutter.
- **2026-09-16 — Day label shows weekday + date ("Wed, Sep 16").** — Grouping/matching
  uses a stable ISO key internally; `TideDay.date` is the friendly display string.
- **2026-09-16 — Merge chart + table into one card with a Chart/Table toggle.** —
  Replaced the two side-by-side cards. Default view is the chart; toggling shows the
  table for each carousel item (current-tide summary still appears on today).

## Open questions

- **OQ-1 [resolved]** No data thinning needed. Per-day charts keep the full NOAA
  resolution; legibility is handled in the chart config instead — regular points are
  hidden (`pointRadius: 0`), only high/low points get markers, and the x/y tick labels
  are hidden entirely (`ticks: { display: false }`, axis titles only) since the
  permanent high/low labels already show the key times and heights.
- **OQ-2 [partially resolved]** The carousel defaults to today (the day whose
  `currentTide` is set). De-emphasizing the past hours of today is **deferred** —
  not implemented in v1; revisit if it proves useful in QA.
- **OQ-3 [open]** Redis TTL is 600s (`pages/api/data.js`) shared across buoy + tide
  data. Fine for now; revisit whether the 5-day tide span warrants a longer,
  separate TTL.
