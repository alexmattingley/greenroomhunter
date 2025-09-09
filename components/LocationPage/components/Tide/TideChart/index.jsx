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
} from 'chart.js';
import PropTypes from 'prop-types';
import generateTideChartData from './generateTideData.js';
import ChartjsPluginAnnotation from 'chartjs-plugin-annotation';
import TideChartContainer from './index.styled.js';

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
  ChartjsPluginAnnotation,
);

class TideChart extends React.Component {
  constructor(props) {
    super(props);
    this.tideChartRef = React.createRef();
  }

  componentDidMount() {
    const { tideDataForChart  } = this.props;
    const ctx = this.tideChartRef.current.getContext('2d');
    // eslint-disable-next-line no-unused-vars
    const chart = new ChartJS(ctx, generateTideChartData(tideDataForChart));
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
