import { DateTime } from "luxon";
import parseTideData from "./parse-tide-data";

const ZONE = "America/Los_Angeles";
// Fixed "now" so current-tide detection is deterministic: noon on Sep 16, 2026.
const NOW = DateTime.fromISO("2026-09-16T12:00:00", { zone: ZONE });

/**
 * Build a semidiurnal-ish tide series (2 highs + 2 lows per day) as raw NOAA
 * readings: SQL local timestamps + numeric heights.
 */
function buildRaw(startISO: string, days = 5): { t: string; v: number }[] {
  const start = DateTime.fromISO(startISO, { zone: ZONE });
  const readings: { t: string; v: number }[] = [];
  for (let h = 0; h < days * 24; h++) {
    const dt = start.plus({ hours: h });
    const v = 3 + 2 * Math.sin((h / 6) * Math.PI); // 12h period → 2 highs/2 lows a day
    readings.push({
      t: dt.toFormat("yyyy-MM-dd HH:mm:ss"),
      v: Math.round(v * 100) / 100,
    });
  }
  return readings;
}

describe("parseTideData", () => {
  beforeEach(() => {
    jest.spyOn(DateTime, "now").mockReturnValue(NOW as unknown as DateTime);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("throws when there is no data", () => {
    expect(() => parseTideData(null as never, ZONE)).toThrow(/No tide data/);
    expect(() => parseTideData([], ZONE)).toThrow(/No tide data/);
  });

  it("groups readings into one TideDay per calendar day", () => {
    const days = parseTideData(buildRaw("2026-09-16T00:00:00", 5), ZONE);
    expect(days).toHaveLength(5);
    // date is a friendly weekday + month/day label, e.g. "Wed, Sep 16"
    expect(days.map((d) => d.date.split(", ")[1])).toEqual([
      "Sep 16",
      "Sep 17",
      "Sep 18",
      "Sep 19",
      "Sep 20",
    ]);
    days.forEach((day) => {
      expect(day.date).toMatch(/^[A-Z][a-z]{2}, [A-Z][a-z]{2} \d{2}$/);
      const monthDay = day.date.split(", ")[1];
      day.points.forEach((p) => {
        expect(p.t.startsWith(monthDay)).toBe(true);
      });
    });
  });

  it("finds high/low tides for each day", () => {
    const days = parseTideData(buildRaw("2026-09-16T00:00:00", 5), ZONE);
    days.forEach((day) => {
      expect(day.highAndLowTides.length).toBeGreaterThan(0);
      day.highAndLowTides.forEach((p) => {
        expect(["High", "Low"]).toContain(p.point);
      });
    });
  });

  it("attaches currentTide + nextTide only to today", () => {
    const days = parseTideData(buildRaw("2026-09-16T00:00:00", 5), ZONE);
    const [today, ...future] = days;

    expect(today.currentTide).toBeDefined();
    expect(today.currentTide?.t).toBe("Sep 16, 12:00 PM"); // first reading >= noon
    expect(["rising", "dropping"]).toContain(today.currentTide?.tideDirection);
    expect(today.currentTide?.nextTide?.point).toMatch(/High|Low/);

    future.forEach((day) => expect(day.currentTide).toBeUndefined());
  });

  it("formats timestamps as 'MMM dd, h:mm a'", () => {
    const days = parseTideData(buildRaw("2026-09-16T00:00:00", 5), ZONE);
    expect(days[0].points[0].t).toMatch(/^[A-Z][a-z]{2} \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
  });

  it("splits on the local calendar day (timezone-aware)", () => {
    // Two readings 1 hour apart but on either side of local midnight
    const raw = [
      { t: "2026-09-16 23:30:00", v: 2.0 },
      { t: "2026-09-17 00:30:00", v: 2.5 },
    ];
    const days = parseTideData(raw, ZONE);
    expect(days.map((d) => d.date.split(", ")[1])).toEqual(["Sep 16", "Sep 17"]);
  });
});
