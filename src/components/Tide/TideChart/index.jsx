import React from 'react';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

class TideChart extends React.Component {
  constructor(props) {
    super(props);
    this.tideChartRef = React.createRef();
  }

  componentDidMount() {
    const { tideData } = this.props;
    const dataForChart = {
      time: [],
      height: []
    };
    tideData.forEach((itm) => {
      dataForChart.time.push('');
      dataForChart.height.push(itm.v);
    });
    const ctx = this.tideChartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Tide Height ft',
            data: dataForChart.height,
          },
        ],
        labels: dataForChart.time,
      },
      // plugins: [ChartDataLabels],
      options: {
        scales: {
          yAxes: [{
            ticks: {},
          }],
        },
      },
    });
    // TODO: Does this ever cause a race condition? This is done to prevent labeling all charts and all points
    // Chart.plugins.unregister(ChartDataLabels);
  }

  render() {
    const { tideData } = this.props;
    return (
      <canvas ref={this.tideChartRef}>
        tide block
      </canvas>
    );
  }
}

export default TideChart;
