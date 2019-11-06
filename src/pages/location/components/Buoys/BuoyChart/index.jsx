import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import { BuoyChartContainer } from './index.styled.js';

class BuoyChart extends React.Component {
  constructor(props) {
    super(props);
    this.buoyChartRef = React.createRef();
  }

  componentDidMount() {
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
      dataForChart.timeTaken.push(`${itm.hour}:${itm.minute}`);
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
          },
          {
            label: 'Peak Period',
            data: dataForChart.peakPeriod,
          },
          {
            label: 'Wave Height',
            data: dataForChart.waveHeightFt,
          },
        ],
        labels: dataForChart.timeTaken,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <BuoyChartContainer ref={this.buoyChartRef} />
    );
  }
}

BuoyChart.propTypes = {
  buoyData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BuoyChart;
