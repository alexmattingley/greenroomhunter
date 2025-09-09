import React from 'react';
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
} from 'chart.js';
import PropTypes from 'prop-types';
import { colors } from 'data/styles-data.js';
import BuoyChartContainer from './index.styled.js';

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
  Filler,
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
    const ctx = this.buoyChartRef.current.getContext('2d');
    // eslint-disable-next-line no-unused-vars
    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Average Period',
            data: dataForChart.avgPeriod,
            backgroundColor: avgPeriodFill,
            borderColor: avgPeriodBorder,
            tension: 0.2,
            fill: 'origin',
          },
          {
            label: 'Peak Period',
            data: dataForChart.peakPeriod,
            backgroundColor: peakPeriodFill,
            borderColor: peakPeriodBorder,
            tension: 0.2,
            fill: 'origin',
          },
          {
            label: 'Wave Height',
            data: dataForChart.waveHeightFt,
            backgroundColor: waveHeightFill,
            borderColor: waveHeightBorder,
            tension: 0.2,
            fill: 'origin',
          },
        ],
        labels: dataForChart.timeTaken,
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: colors.almostWhite,
            },
            grid: {
              color: colors.almostTransparentGray,
            },
          },
          x: {
            ticks: {
              callback: () => '',
              color: colors.almostWhite,
            },
            grid: {
              color: colors.almostTransparentGray,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: colors.almostWhite,
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <BuoyChartContainer>
        <canvas ref={this.buoyChartRef} />
      </BuoyChartContainer>
    );
  }
}

BuoyChart.propTypes = {
  buoyData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BuoyChart;
