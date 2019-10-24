import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import generateTideChartData from './generateTideData.js';

class TideChart extends React.Component {
  constructor(props) {
    super(props);
    this.tideChartRef = React.createRef();
  }

  componentDidMount() {
    const { tideData: { data } } = this.props;
    const ctx = this.tideChartRef.current.getContext('2d');
    const chart = new Chart(ctx, generateTideChartData(data));
  }

  render() {
    return (
      <canvas ref={this.tideChartRef} />
    );
  }
}

TideChart.propTypes = {
  tideData: PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.array,
  }).isRequired,
};

export default TideChart;
