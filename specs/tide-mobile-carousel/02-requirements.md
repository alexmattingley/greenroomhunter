# 02 · Requirements

> **[MUST]** required · **[SHOULD]** preferred · **[COULD]** nice-to-have.
> Rationale for each choice lives in [05-decisions.md](./05-decisions.md) (referenced
> as D-#). Verification steps are in [06-validation.md](./06-validation.md).

## User stories
- **US-1** — As a surfer on my phone, I want to read the tide at a glance.
- **US-2** — As a surfer, I want to swipe between days to plan ahead.
- **US-3** — As a surfer, I want to scrub across a day to read the tide at a time.

## Functional
- **FR-1 [MUST]** One chart **per day**, not one multi-day chart.
- **FR-2 [MUST]** Cover **5 days** (today + next 4); widen the NOAA fetch window.
- **FR-3 [MUST]** **Carousel** across the per-day charts — swipe + arrows + dots;
  defaults to today.
- **FR-4 [MUST]** Axes: **time on x, height (ft) on y**.
- **FR-5 [MUST]** **Scrub/drag**: tooltip follows the nearest point as the
  finger/cursor moves (same pattern as the Buoy charts).
- **FR-6 [MUST]** **Tooltip** shows tide height + time.
- **FR-7 [MUST]** Current-tide summary + high/low **table syncs to the visible day**.
- **FR-8 [SHOULD]** Keep high/low point markers on each per-day chart.

## Non-functional
- **NFR-1 [MUST]** Mobile-first; legible on a phone with no pinch/zoom.
- **NFR-2 [MUST]** No new per-interaction network calls — one widened, Redis-cached
  fetch; paging is client-side only.
- **NFR-3 [SHOULD]** Accessible: keyboard nav for the carousel, ARIA on controls.
- Repo conventions (no `!important`, TypeScript for new components, timezone-per-
  location) are assumed — see [`agent/`](../../agent/conventions.md), not repeated here.

## Acceptance criteria
- **AC-1** On a phone, the current day's tide is readable at a glance (no zoom). ⟵ US-1, NFR-1
- **AC-2** Swipe/arrows/dots move between exactly 5 days; active day is indicated. ⟵ FR-2, FR-3
- **AC-3** Dragging across a chart moves a tooltip reading height + time. ⟵ FR-5, FR-6
- **AC-4** Summary + high/low table reflect the day in view. ⟵ FR-7
- **AC-5** Each chart plots time on x, height on y, with high/low markers. ⟵ FR-4, FR-8
- **AC-6** Paging between days makes no new network request. ⟵ NFR-2
