# 06 · Validation

> How we verify the feature is actually built. Each acceptance criterion
> (AC-# from [02-requirements.md](./02-requirements.md)) has a way to prove it.
> The feature is **done** only when every AC passes and the Definition of Done is met.

## Automated tests
| ID | Test | Type | Proves |
| --- | --- | --- | --- |
| T-1 | `parse-tide-data` returns 5 `TideDay` groups for a 5-day payload | Jest unit ✅ | FR-1, FR-2 |
| T-2 | Per-day high/low points are correct; current/next tide only on today | Jest unit ✅ | FR-7, FR-8 |
| T-3 | Day grouping is timezone-correct (uses location `timeZone`) | Jest unit ✅ | NFR (tz) |
| T-5 | `TideTable` renders the given day's high/low rows | RTL ✅ | FR-8 |

Not automated (covered by manual QA instead — Embla is hard to drive in jsdom):
| ID | What it would cover | Manual equivalent |
| --- | --- | --- |
| T-4 | Carousel swipe/arrows/dots change the active day; dot reflects it | M-2 |
| T-6 | Paging fires no new fetch | M-6 |
| T-7 | Chart config: x=time, y=height, `mode:'index'` tooltip | M-3, M-5 |

## Manual QA (real device / responsive mode)
- **M-1** On a phone width, the current day is readable at a glance, no pinch/zoom. → AC-1
- **M-2** Swipe left/right moves days; arrows and dots do the same; opens on today. → AC-2
- **M-3** Dragging a finger across the chart moves a tooltip showing height + time. → AC-3
- **M-4** The summary + high/low table match the day currently shown. → AC-4
- **M-5** Each day plots time on x, height on y, with high/low markers. → AC-5
- **M-6** Switching days repeatedly shows no flicker/refetch and no console errors
  (no Chart.js canvas-reuse warnings). → AC-6, lifecycle risk

## Acceptance criteria coverage
Automated tests cover the data layer (T-1–T-3) and table rendering (T-5); the
interactive criteria (AC-2/AC-3/AC-5/AC-6) are verified by manual QA only.
- AC-1 → M-1 · AC-2 → M-2 · AC-3 → M-3 · AC-4 → T-5, M-4 ·
  AC-5 → M-5 · AC-6 → M-6

## Browser QA results (2026-09-16, dev server, Santa Barbara)
- **M-1 ✅** Emulated 390px phone: block stacks, single-day chart legible, no zoom.
- **M-2 ✅** Next arrow → Sep 17; Sep 20 dot → jumps to last day; Next disables at end,
  Prev disables on today; active dot highlighted.
- **M-3 ✅** Hover/scrub shows tooltip "2:24 PM / 3.7 ft" (time + height, index mode).
- **M-4 ✅** Table title + content follow the visible day; "Current Tide" summary shows
  only on today (Sep 16) and is omitted on future days (Sep 17–20).
- **M-5 ✅** Time on x-axis, height (ft) on y-axis, green high/low markers.
- **M-6 ✅** Paging is instant client-side; no Next.js error overlay, no refetch.
- Verified across two locations (Santa Barbara + San Diego). One fix applied: tooltip
  height now rounds to 1 decimal.

## Definition of Done
- [x] All AC-1…AC-6 verified (tests + manual).
- [x] `yarn lint` and the Jest suite pass.
- [x] No `!important`; new/changed components are TypeScript (per constitution).
- [ ] Cross-browser sanity check (Safari iOS + Chrome) — only Chromium (emulated) so far.
- [x] Open questions OQ-1/OQ-2 resolved or explicitly deferred in
      [05-decisions.md](./05-decisions.md).
- [ ] Spec status set to ✅ and road-map item moved to **Done**.
