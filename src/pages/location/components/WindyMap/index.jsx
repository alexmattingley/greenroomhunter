import React from 'react';
import { WindyChartContainer, WindyTitle, WindySubTitle, WindBlock } from './index.styled.js';

class WindyMap extends React.Component {
  componentDidMount() {
    const { locationData: { lat, lon } } = this.props;
    const options = {
      key: 'rRee3fNI1vLlm34f88k5SJSRAnFm92pZ',
      verbose: false,
      lat,
      lon,
      zoom: 9,
    };

    // Initialize Windy API
    /* global windyInit */
    windyInit(options);
  }

  render() {
    return (
      <WindBlock>
        <WindyTitle>Current Forecasted Wind</WindyTitle>
        <WindySubTitle>(Map is interactive)</WindySubTitle>
        <WindyChartContainer id="windy" />
      </WindBlock>
    );
  }
}

export default WindyMap;
