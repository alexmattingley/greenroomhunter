# 03 · Technical Design

> Decisions (and their rationale) are in [05-decisions.md](./05-decisions.md); this
> file covers the *how*, not the *why*. Requirement IDs (FR-#/NFR-#) come from
> [02-requirements.md](./02-requirements.md).

## Data / fetch
- **`fetch-tide-data.js`** — widen the window to today + 4 days (FR-2); keep station,
  datum, units, `lst_ldt`, JSON. Revisit the Redis TTL for a 5-day span.
- **`parse-tide-data.js`** — group parsed points **by calendar day** (timezone-aware
  via luxon) and return `TideDay[]` (length 5). Keep the existing high/low +
  current/next-tide logic, scoped per day; current/next only on today.
  ```ts
  type TideDay = {
    date: string;               // e.g. "Sep 16"
    points: TidePoint[];        // that day's series (time + height)
    highAndLowTides: TidePoint[];
    currentTide?: CurrentTide;  // today only
  };
  ```

## Components (new/changed → TypeScript)
- **`TideContainer`** — owns the active-day index; renders the carousel + the table
  synced to the active day (FR-7).
- **`TideCarousel`** (new) — wraps **Embla** (`embla-carousel-react`); renders one
  `TideChart` per slide with custom arrows + dots; starts on today (FR-3).
- **`TideChart`** — renders **one day** (FR-1). Prefer a functional component with
  `useRef`/`useEffect` + `chart.destroy()` cleanup (see `BuoyPage/PBandChart`) so it
  re-inits when the active day changes.
- **`TideTable`** — accepts one `TideDay`.

## Chart config
- `interaction: { mode: 'index', intersect: false }` → the finger-scrub tooltip
  (FR-5), matching `BuoyChart`. Tooltip: title = time, label = `"<height> ft"` (FR-6).
- Scales: x = time (`h:mm a`), y = height (ft), `beginAtZero` per data (FR-4).
- Drop the cross-day "day divider" annotation — each day is its own chart now.
- Colors from `data/styles-data.js` tokens (no mock).

## Risks
- **5-day resolution** may need light per-day thinning for legibility (see OQ-1).
- **Chart lifecycle** — destroy/recreate on day change to avoid canvas-reuse errors.
- **Today emphasis** — whether to de-emphasize past hours of today (see OQ-2).

## Testing
See [06-validation.md](./06-validation.md) for the full plan; in short: unit-test the
day-grouping in `parse-tide-data`, component-test carousel paging + table sync + no
refetch, and manual mobile QA.
