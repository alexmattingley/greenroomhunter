import { BuoyContext } from "pages/buoy/[id]";
import React, { useEffect, useRef, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { colors } from "data/styles-data";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const NineBandChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const { nineBandData } = useContext(BuoyContext);

  useEffect(() => {
    if (!chartRef.current || !nineBandData) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    let periods = [];
    let heights = [];
    let directions = [];

    nineBandData.forEach((element) => {
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
          backgroundColor: colors.lightGreenFill,
          borderColor: colors.lightGreen,
          borderWidth: 3,
        },
      ],
    };

    const config = {
      type: "bar" as const,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        categoryPercentage: 1.0,
        barPercentage: 0.99,
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
    console.log(chartInstance.current);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [nineBandData]);

  if (!nineBandData) {
    return <div>Buoy Breakdown Chart Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default NineBandChart;
