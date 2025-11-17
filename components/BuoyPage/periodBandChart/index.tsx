import { BuoyContext } from "pages/buoy/[id]";
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
import { colors } from "data/styles-data";

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

const AllBandChart: React.FC = () => {
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
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    const config = {
      type: "line" as const,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            callbacks: {
              title: () => "",
              // Manually doing this just to get the information in there. There is a better way to do this
              label: (context) => [
                `Wave Height: ${heights[context.dataIndex]} (ft)`,
                `Swell direction: ${directions[context.dataIndex]}°`,
              ],
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Period Band (seconds)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Wave Height (ft)",
            },
            beginAtZero: true,
          },
        },
      },
    };

    // Create new chart
    chartInstance.current = new ChartJS(chartRef.current, config);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [allBandData]);

  if (!allBandData) {
    return <div>Buoy Breakdown Chart Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default AllBandChart;
