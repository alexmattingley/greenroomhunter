import React from 'react';
import Chart from 'chart.js';
import generateTideChartData from './generateTideData.js';

class TideChart extends React.Component {
  constructor(props) {
    super(props);
    this.tideChartRef = React.createRef();
  }

  componentDidMount() {
    const { tideData } = this.props;
    const ctx = this.tideChartRef.current.getContext('2d');
    const chart = new Chart(ctx, generateTideChartData(tideData));
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
