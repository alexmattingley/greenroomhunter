import { DateTime } from "luxon";
import { TideDay, TidePoint, CurrentTide } from "./types";

interface RawTideReading {
  t: string;
  v: number;
}

/**
 * Parse raw NOAA tide predictions into per-day groups for the tide carousel.
 *
 * Each returned `TideDay` is one slide: it carries every reading for the day
 * (for the chart), that day's high/low points (for the table), and — only for
 * the day that contains "now" — the current tide + next tide.
 */
function parseTideData(
  rawData: RawTideReading[],
  timeZone = "America/Los_Angeles"
): TideDay[] {
  // Validate that we have data to parse
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    throw new Error("No tide data available to parse");
  }

  // Filter out consecutive duplicates so high/low detection works cleanly
  const deduped = rawData.filter((elem, index, array) => {
    if (array[index + 1] && elem.v === array[index + 1].v) {
      return false;
    }
    return true;
  });

  const now = DateTime.now().setZone(timeZone);
  const currentTimeUnix = now.toSeconds();

  let currentTide: CurrentTide | undefined;
  let currentTideDayKey: string | undefined;
  let findNextPoint = false;

  const dayOrder: string[] = [];
  const dayMap: Record<string, TideDay> = {};

  deduped.forEach((elem, index, array) => {
    // NOAA returns SQL-format local timestamps (e.g. "2023-12-15 14:30:00")
    const tideTime = DateTime.fromSQL(elem.t, { zone: timeZone });
    if (!tideTime.isValid) {
      throw new Error(
        `Unable to parse tide timestamp: "${elem.t}" at index ${index}. Expected format: YYYY-MM-DD HH:mm:ss`
      );
    }

    // Stable ISO key for grouping/matching; friendly "Tue, Sep 16" for display
    const dayKey = tideTime.toISODate() as string;
    const displayDate = tideTime.toFormat("EEE, MMM dd");
    const readingPoint: TidePoint = {
      t: tideTime.toFormat("MMM dd, h:mm a"),
      v: elem.v,
    };

    // High/low detection (skip the first and last readings — no neighbours)
    if (index !== 0 && index !== array.length - 1) {
      const prev = array[index - 1].v;
      const next = array[index + 1].v;
      if (elem.v < prev && elem.v < next) {
        readingPoint.point = "Low";
      } else if (elem.v > prev && elem.v > next) {
        readingPoint.point = "High";
      }

      // Mark the first high/low after "now" as the next tide
      if (readingPoint.point && findNextPoint) {
        findNextPoint = false;
        readingPoint.nextTide = true;
        if (currentTide) {
          currentTide.nextTide = { ...readingPoint };
        }
      }
    }

    // Current tide = first reading at or after "now"
    const tideTimeUnix = tideTime.toSeconds();
    if (tideTimeUnix - currentTimeUnix >= 0 && !currentTide) {
      const nextReading = array[index + 1];
      const tideDirection =
        nextReading && elem.v > nextReading.v ? "dropping" : "rising";
      findNextPoint = true;
      currentTide = {
        t: readingPoint.t,
        v: readingPoint.v,
        tideDirection,
      };
      currentTideDayKey = dayKey;
    }

    // Group into its day
    if (!dayMap[dayKey]) {
      dayMap[dayKey] = { date: displayDate, points: [], highAndLowTides: [] };
      dayOrder.push(dayKey);
    }
    dayMap[dayKey].points.push(readingPoint);
    if (readingPoint.point) {
      dayMap[dayKey].highAndLowTides.push(readingPoint);
    }
  });

  // Attach the current tide to its day
  if (currentTide && currentTideDayKey && dayMap[currentTideDayKey]) {
    dayMap[currentTideDayKey].currentTide = currentTide;
  }

  return dayOrder.map((key) => dayMap[key]);
}

export default parseTideData;
