# Road Map

Everything below is **planned** — nothing is in active development yet, except where noted as *Next Up*.

**Ratings**
- **Priority** — 🔴 High · 🟡 Medium · 🟢 Low
- **Complexity** — S (small) · M (medium) · L (large) · XL (extra large)

Source: [FUTUREWORK Google Doc](https://docs.google.com/document/d/1XowJG0mYpEkq87XH-u-Xo2-77jNo3FXBjDZDDa2-vQQ/edit?tab=t.0)

---

## 🚀 Next Up
**Improve the Tide block.** The tide chart is basically unusable on mobile — this is the most painful issue and the next thing we're working on. Spec: [`specs/tide-mobile-carousel/`](../specs/tide-mobile-carousel/README.md).
- Break each day into its own chart with carousel functionality (5 days)
- Simple tooltips and finger-scrub (drag) interaction; time on the x-axis, height on the y-axis

| Item | Priority | Complexity |
| --- | --- | --- |
| Improve tide chart (mobile-first) | 🔴 High | M |

---

## Locations Page
| Item | Priority | Complexity |
| --- | --- | --- |
| Improve tide chart — break each day into its own chart with carousel | 🔴 High | M |
| Improve tide chart — simple tooltips, finger-scrub interaction, mobile-first layout | 🔴 High | M |
| Add tooltips explaining the different blocks | 🟡 Medium | S |
| CDIP image: max-width 100%, click to full-size + scroll | 🟡 Medium | S |
| Make the side nav narrower (possible full redesign later) | 🟢 Low | M |

## Homepage
| Item | Priority | Complexity |
| --- | --- | --- |
| Loading state when clicking locations (until perf improvements land) | 🟡 Medium | S |
| Rebuild home page | 🟢 Low | L |

## Code Improvements
| Item | Priority | Complexity |
| --- | --- | --- |
| Improve performance when clicking links | 🔴 High | M |
| Convert to TypeScript (ongoing) | 🟡 Medium | L |
| Improve logging — create a logger utility instead of raw `console.log` | 🟡 Medium | S |

## New Features
| Item | Priority | Complexity |
| --- | --- | --- |
| Individual accounts (personal surf log) | 🟡 Medium | XL |
| Add live weather readings (NOAA — [NCDC CDO Web Services](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)) | 🟡 Medium | M |
| Create forecast using ECMWF model ([Open-Meteo Marine API](https://open-meteo.com/en/docs/marine-weather-api)) | 🟡 Medium | L |
| Expand surf spot coverage beyond California | 🟢 Low | L |

---

## ✅ Done
- **Buoy Breakdown**
