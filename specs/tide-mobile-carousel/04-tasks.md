# 04 · Implementation Plan

> Phased, checkboxed plan. Each task should be small enough to review in one sitting.
> Refs: [02-requirements.md](./02-requirements.md) · [03-design.md](./03-design.md).

## Phase 0 — Spec & alignment ✅
- [x] Scaffold spec files
- [x] Answer open questions
- [x] Finalize requirements & acceptance criteria
- [x] Finalize design
- [x] Update `agent/road-map.md` to reflect "time on x-axis" (was "time on y-axis")

## Phase 1 — Data (fetch + parse) ✅
- [x] Widen `fetch-tide-data.js` window to today + 4 days (FR-2)
- [x] Group parsed series by day in `parse-tide-data.ts` → `TideDay[]` (FR-1)
- [x] Scope high/low + current/next-tide logic per day; keep current/next on today
- [x] Unit tests for day-grouping (5 groups, per-day high/low, tz correctness)
- [ ] Review Redis TTL for the 5-day span (NFR-3) — currently 600s in `pages/api/data.js`

## Phase 2 — Per-day chart (TS) ✅
- [x] Rewrite `TideChart` as a TS functional component (one day)
- [x] x = time, y = height (ft), keep high/low markers (FR-4, FR-8)
- [x] Index-mode tooltip showing height + time (FR-5, FR-6)
- [x] Ensure chart destroy/recreate on day change (no canvas-reuse errors)
- [x] Remove the cross-day "day divider" annotation

## Phase 3 — Carousel (TS) ✅
- [x] New `TideCarousel` (Embla): swipe + arrows + dot indicators (FR-3)
- [x] Default to today; track active-day index
- [x] Wire per-day chart into the carousel

## Phase 4 — Table sync + polish ✅
- [x] Make `TideTable` (TS) render the active day (FR-7)
- [x] Sync table + carousel active day
- [x] Accessibility: ARIA labels + `aria-current` on controls; buttons are focusable (NFR-3)
- [x] No `!important`; match `styles-data` tokens

## Phase 5 — Verify (in progress)
- [x] Typecheck (`tsc --noEmit`), `yarn lint`, production `yarn build` all pass
- [x] Automated tests: parser unit tests + `TideTable` component test (T-1,T-2,T-3,T-5)
- [x] Browser QA via dev server (M-1…M-6) — see [06-validation.md](./06-validation.md) results
- [x] Polish: tooltip height rounded to 1 decimal (found during QA)
- [ ] Carousel interaction tests (T-4,T-6,T-7) — Embla is hard to drive in jsdom; covered by manual QA for now
- [ ] Final QA on a physical phone (touch swipe feel) — desktop + emulated mobile verified
