import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import generateTideChartData from './generateTideData.js';
import TideChartContainer from './index.styled.js';

class TideChart extends React.Component {
  constructor(props) {
    super(props);
    this.tideChartRef = React.createRef();
  }

  componentDidMount() {
    const { tideData: { data } } = this.props;
    const ctx = this.tideChartRef.current.getContext('2d');
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, generateTideChartData(data));
  }

  render() {
    return (
      <TideChartContainer>
        <canvas ref={this.tideChartRef} />
      </TideChartContainer>
    );
  }
}

TideChart.propTypes = {
  tideData: PropTypes.shape({
    success: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array,
  }).isRequired,
};

export default TideChart;
