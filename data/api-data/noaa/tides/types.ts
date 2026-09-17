// Shared types for tide data. See specs/tide-mobile-carousel/03-design.md.

/** A single tide reading, ready for display. */
export interface TidePoint {
  /** Formatted timestamp, e.g. "Sep 16, 2:30 PM". */
  t: string;
  /** Tide height in feet. */
  v: number;
  /** Set when this reading is a local high or low tide. */
  point?: "High" | "Low";
  /** Marks the next high/low tide after the current moment (today only). */
  nextTide?: boolean;
}

/** The current tide "right now", only present for today. */
export interface CurrentTide {
  t: string;
  v: number;
  tideDirection: "rising" | "dropping";
  /** The next high/low tide after now. */
  nextTide?: TidePoint;
}

/** One calendar day's worth of tide data — one slide in the carousel. */
export interface TideDay {
  /** Short day label, e.g. "Sep 16". */
  date: string;
  /** Every reading for the day (drives the chart). */
  points: TidePoint[];
  /** Just the high/low points for the day (drives the table). */
  highAndLowTides: TidePoint[];
  /** Only set on the day that contains "now" (today). */
  currentTide?: CurrentTide;
}
