import { ChartConfiguration, Plugin } from "chart.js";
import { colors } from "data/styles-data.js";
import { TidePoint } from "data/api-data/noaa/tides/types";

interface HighLowLabel {
  index: number;
  value: number;
  time: string;
  type: "High" | "Low";
}

/**
 * Custom plugin: draws a small permanent label ("mini tooltip") at each high/low
 * point — offset above highs / below lows with a thin connector — so the key
 * numbers are always visible while keeping the line itself clear to hover/tap.
 */
function highLowLabelPlugin(labels: HighLowLabel[]): Plugin<"line"> {
  return {
    id: "highLowLabels",
    afterDatasetsDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      const { ctx, chartArea } = chart;
      if (!meta || !chartArea) return;

      const gap = 16; // distance between the point and the label box

      ctx.save();
      labels.forEach(({ index, value, time, type }) => {
        const element = meta.data[index] as unknown as { x: number; y: number };
        if (!element) return;

        const line1 = `${value.toFixed(1)} ft`;
        const line2 = time;
        const padX = 9;
        const boxH = 40;

        ctx.font = "600 14px sans-serif";
        const w1 = ctx.measureText(line1).width;
        ctx.font = "12px sans-serif";
        const w2 = ctx.measureText(line2).width;
        const boxW = Math.max(w1, w2) + padX * 2;

        const isHigh = type === "High";
        let x = element.x - boxW / 2;
        let y = isHigh ? element.y - boxH - gap : element.y + gap;

        // Keep the label inside the plot area
        x = Math.max(chartArea.left, Math.min(x, chartArea.right - boxW));
        y = Math.max(chartArea.top, Math.min(y, chartArea.bottom - boxH));

        // Thin connector from the point to the label box
        const boxEdgeY = isHigh ? y + boxH : y;
        ctx.beginPath();
        ctx.moveTo(element.x, element.y);
        ctx.lineTo(element.x, boxEdgeY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.almostTransparentWhite;
        ctx.stroke();

        // Rounded background
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + boxW, y, x + boxW, y + boxH, r);
        ctx.arcTo(x + boxW, y + boxH, x, y + boxH, r);
        ctx.arcTo(x, y + boxH, x, y, r);
        ctx.arcTo(x, y, x + boxW, y, r);
        ctx.closePath();
        ctx.fillStyle = colors.almostBlackTransparent;
        ctx.fill();

        // Text
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = colors.almostWhite;
        ctx.font = "600 14px sans-serif";
        ctx.fillText(line1, x + boxW / 2, y + 13);
        ctx.fillStyle = colors.greenTintedWhite;
        ctx.font = "12px sans-serif";
        ctx.fillText(line2, x + boxW / 2, y + 28);
      });
      ctx.restore();
    },
  };
}

/**
 * Custom plugin: on hover/scrub, draws a vertical crosshair line and a
 * highlighted dot at the active point so it's clear where you are on the curve.
 */
function hoverCrosshairPlugin(): Plugin<"line"> {
  return {
    id: "hoverCrosshair",
    afterDatasetsDraw(chart) {
      const active = chart.getActiveElements();
      if (!active || !active.length) return;
      const { ctx, chartArea } = chart;
      const element = active[0].element as unknown as { x: number; y: number };

      ctx.save();
      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(element.x, chartArea.top);
      ctx.lineTo(element.x, chartArea.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.almostTransparentWhite;
      ctx.stroke();

      // Highlighted position dot
      ctx.beginPath();
      ctx.arc(element.x, element.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors.almostWhite;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.lightGreen;
      ctx.stroke();
      ctx.restore();
    },
  };
}

/**
 * Build the Chart.js config for a single day's tide series.
 *
 * - x-axis: time of day (tick labels hidden; only the "Time" title shows)
 * - y-axis: tide height (ft) (tick labels hidden; only the title shows)
 * - high/low points get small markers plus a permanent label
 * - index-mode interaction so the tooltip follows a finger/cursor scrub
 *   (same pattern as the Buoy charts)
 */
function generateTideChartConfig(
  points: TidePoint[]
): ChartConfiguration<"line"> {
  const heights = points.map((p) => p.v);
  // Full label is "MMM dd, h:mm a"; show just the time on the axis/tooltip
  const timeLabels = points.map((p) => {
    const parts = p.t.split(", ");
    return parts.length > 1 ? parts[1] : p.t;
  });
  const pointBackgroundColor = points.map((p) =>
    p.point ? colors.lightGreen : colors.transparent
  );
  const pointRadius = points.map((p) => (p.point ? 2.5 : 0));

  const highLowLabels: HighLowLabel[] = points.reduce<HighLowLabel[]>(
    (acc, p, index) => {
      if (p.point) {
        acc.push({ index, value: p.v, time: timeLabels[index], type: p.point });
      }
      return acc;
    },
    []
  );

  // Pad the y-range so the curve doesn't hug the top/bottom, leaving room for the
  // permanent labels to sit clearly off the line.
  const minHeight = Math.min(...heights);
  const maxHeight = Math.max(...heights);
  const yPad = Math.max(1, (maxHeight - minHeight) * 0.35);

  return {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Tide (ft)",
          data: heights,
          backgroundColor: colors.almostTransparentGray,
          borderColor: colors.lightGreen,
          pointBackgroundColor,
          pointBorderColor: pointBackgroundColor,
          pointRadius,
          pointHoverRadius: 4,
          borderWidth: 2,
          tension: 0.4,
          fill: "origin",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, bottom: 8 } },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: {
            title: (items) => (items.length ? String(items[0].label) : ""),
            label: (context) => `${context.parsed.y.toFixed(1)} ft`,
          },
        },
      },
      scales: {
        x: {
          title: { display: true, color: colors.almostWhite, text: "Time" },
          // Tick labels are redundant now that high/low points show their own time
          ticks: { display: false },
          grid: { color: colors.almostTransparentGray },
        },
        y: {
          title: { display: true, color: colors.almostWhite, text: "Height (ft)" },
          suggestedMin: minHeight - yPad,
          suggestedMax: maxHeight + yPad,
          // Tick labels are redundant now that high/low points show their height
          ticks: { display: false },
          grid: { color: colors.almostTransparentGray },
        },
      },
    },
    plugins: [highLowLabelPlugin(highLowLabels), hoverCrosshairPlugin()],
  };
}

export default generateTideChartConfig;
