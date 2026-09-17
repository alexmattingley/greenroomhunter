import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { TideChartWrapper } from "./index.styled";
import generateTideChartConfig from "./generateTideData";
import { TidePoint } from "data/api-data/noaa/tides/types";

// Register Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TideChartProps {
  /** One day's tide readings. */
  points: TidePoint[];
}

/**
 * Renders a single day's tide chart. Recreates the Chart.js instance whenever
 * the day's data changes (e.g. when the carousel moves) and cleans up on unmount
 * to avoid canvas-reuse errors.
 */
const TideChart: React.FC<TideChartProps> = ({ points }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    chartRef.current = new ChartJS(
      canvasRef.current,
      generateTideChartConfig(points)
    );

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [points]);

  return (
    <TideChartWrapper>
      <canvas ref={canvasRef} />
    </TideChartWrapper>
  );
};

export default TideChart;
