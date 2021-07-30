import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import { colors } from 'data/styles-data.js';
import { BuoyChartContainer } from './index.styled.js';

class BuoyChart extends React.Component {
  constructor(props) {
    super(props);
    this.buoyChartRef = React.createRef();
  }

  componentDidMount() {
    const waveHeightFill = colors.lightGreenFill;
    const waveHeightBorder = colors.lightGreen;
    const peakPeriodFill = colors.almostTransparentGray;
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
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Average Period',
            data: dataForChart.avgPeriod,
            backgroundColor: avgPeriodFill,
            // pointBackgroundColor: colors.almostWhite,
            borderColor: avgPeriodBorder,
          },
          {
            label: 'Peak Period',
            data: dataForChart.peakPeriod,
            backgroundColor: peakPeriodFill,
            // pointBackgroundColor: colors.almostWhite,
            borderColor: peakPeriodBorder,
          },
          {
            label: 'Wave Height',
            data: dataForChart.waveHeightFt,
            backgroundColor: waveHeightFill,
            borderColor: waveHeightBorder,
          },
        ],
        labels: dataForChart.timeTaken,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              fontColor: colors.almostWhite,
              suggestedMin: 0,
            },
          }],
          xAxes: [{
            ticks: {
              callback: () => '',
            },
          }],
        },
        legend: {
          display: true,
          labels: {
            fontColor: colors.almostWhite,
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
