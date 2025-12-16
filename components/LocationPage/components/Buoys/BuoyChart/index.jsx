import React from "react";
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
import PropTypes from "prop-types";
import {
  BuoyChartContainer,
  ChartTitle,
  ChartWrapper,
} from "./index.styled.js";
import { colors } from "data/styles-data.js";
import Card from "@/components/Shared/Card";

// Register Chart.js components
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

class BuoyChart extends React.Component {
  constructor(props) {
    super(props);
    this.buoyChartRef = React.createRef();
  }

  componentDidMount() {
    const waveHeightFill = colors.lightGreenFill;
    const waveHeightBorder = colors.lightGreen;
    const peakPeriodFill = colors.almostTransparentPink;
    const peakPeriodBorder = colors.wickedPink;
    const avgPeriodFill = colors.transparent;
    const avgPeriodBorder = colors.gray;

    const { buoyData } = this.props;
    const buoyDataRecent = buoyData.slice(0, 24).reverse();
    const dataForChart = {
      avgPeriod: [],
      peakPeriod: [],
      waveHeightFt: [],
      timeTaken: [],
    };
    buoyDataRecent.forEach((itm) => {
      // If any of these values are not a number, we don't want to include this reading
      dataForChart.avgPeriod.push(itm.avgPeriod);
      dataForChart.peakPeriod.push(itm.peakPeriod);
      dataForChart.waveHeightFt.push(itm.waveHeightFt);
      dataForChart.timeTaken.push(itm.fullDate);
    });
    const ctx = this.buoyChartRef.current.getContext("2d");
    // eslint-disable-next-line no-unused-vars
    const chart = new ChartJS(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Average Period",
            data: dataForChart.avgPeriod,
            backgroundColor: avgPeriodFill,
            borderColor: avgPeriodBorder,
            tension: 0.2,
            fill: "origin",
          },
          {
            label: "Peak Period",
            data: dataForChart.peakPeriod,
            backgroundColor: peakPeriodFill,
            borderColor: peakPeriodBorder,
            tension: 0.2,
            fill: "origin",
          },
          {
            label: "Wave Height",
            data: dataForChart.waveHeightFt,
            backgroundColor: waveHeightFill,
            borderColor: waveHeightBorder,
            tension: 0.2,
            fill: "origin",
          },
        ],
        labels: dataForChart.timeTaken,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: colors.almostWhite,
            },
            title: {
              display: true,
              color: colors.almostWhite,
              text: "Wave Height or Period",
            },
            grid: {
              color: colors.almostTransparentGray,
            },
          },
          x: {
            title: {
              display: true,
              color: colors.almostWhite,
              text: "Time & Date of Reading",
            },
            ticks: {
              color: colors.almostWhite,
              callback: (value) => {
                // For category scales, Chart.js passes the label value directly
                const label = value;
                if (!label) return "";

                // Parse the date string (e.g., "Dec 11, 2025, 1:56am")
                const date = new Date(label);

                // Check if date is valid
                if (isNaN(date.getTime())) return label;

                const hours = date.getHours();
                const minutes = date.getMinutes();
                const ampm = hours >= 12 ? "pm" : "am";
                const displayHours = hours % 12 || 12; // Convert to 12-hour format
                const displayMinutes = minutes.toString().padStart(2, "0");
                const timeString = `${displayHours}:${displayMinutes}${ampm}`;

                return timeString;
              },
            },
            grid: {
              color: colors.almostTransparentGray,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: true,
            yAlign: "bottom",
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 14,
            },
            callbacks: {
              labelColor: (context) => {
                const borderColors = [
                  avgPeriodBorder, // Average Period
                  peakPeriodBorder, // Peak Period
                  waveHeightBorder, // Wave Height
                ];
                const borderColor = borderColors[context.datasetIndex];
                return {
                  borderColor: "transparent",
                  backgroundColor: borderColor,
                };
              },
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <BuoyChartContainer>
        <Card>
          <div style={{ textAlign: "center" }}>
            <ChartTitle>12hr Wave Height & Period Trends</ChartTitle>
          </div>
          <ChartWrapper>
            <canvas ref={this.buoyChartRef} />
          </ChartWrapper>
        </Card>
      </BuoyChartContainer>
    );
  }
}

BuoyChart.propTypes = {
  buoyData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BuoyChart;
