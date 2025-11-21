import React, { useEffect, useRef, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ChartContainer,
  ChartWrapper,
  ChartHeading,
  ChartCanvas,
  LoadingContainer,
} from "./index.styled";
import { colors } from "data/styles-data";
import { BuoyContext } from "pages/buoy/[id]";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PeriodBandChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const { allBandData } = useContext(BuoyContext);

  useEffect(() => {
    if (!chartRef.current || !allBandData) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    let periods = [];
    let heights = [];
    let directions = [];

    allBandData.forEach((element) => {
      periods.push(element.period);
      heights.push(element.height);
      directions.push(element.direction);
    });

    const chartData = {
      labels: periods,
      datasets: [
        {
          label: "Wave Height (ft)",
          data: heights,
          backgroundColor: colors.almostTransparentGray,
          borderColor: colors.lightGreen,
          borderWidth: 2,
          fill: "origin",
          tension: 0.3,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    };

    const config = {
      type: "line" as const,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // @ts-ignore
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
            yAlign: "bottom",
            bodyFont: {
              size: 14,
            },
            callbacks: {
              title: () => "",
              // Manually doing this just to get the information in there. There is a better way to do this
              label: (context) =>
                ` ${heights[context.dataIndex]}ft @ ${
                  periods[context.dataIndex]
                }s from ${directions[context.dataIndex]}°`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              color: colors.almostWhite,
              text: "Period Band (seconds)",
            },
            ticks: {
              color: colors.almostWhite,
            },
          },
          y: {
            title: {
              display: true,
              color: colors.almostWhite,
              text: "Wave Height (ft)",
            },
            ticks: {
              color: colors.almostWhite,
            },
            beginAtZero: true,
          },
        },
      },
    };

    // Create new chart
    // @ts-ignore
    chartInstance.current = new ChartJS(chartRef.current, config);

    // Cleanup function
    return (): void => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [allBandData]);

  if (!allBandData) {
    return <LoadingContainer>Buoy Breakdown Chart Loading...</LoadingContainer>;
  }

  return (
    <ChartContainer>
      <ChartHeading>All Energy Bands (above 4 secs)</ChartHeading>
      <ChartWrapper>
        <ChartCanvas ref={chartRef} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PeriodBandChart;
