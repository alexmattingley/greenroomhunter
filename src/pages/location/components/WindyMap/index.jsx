import React from 'react';
import PropTypes from 'prop-types';
import {
  WindyChartContainer, WindyTitle, WindySubTitle, WindBlock,
} from './index.styled.js';
// If this is failing you need to create this file and store a windy Api Key in that object
import key from './api-key.js';

class WindyMap extends React.Component {
  componentDidMount() {
    const { locationData: { lat, lon } } = this.props;
    const options = {
      key,
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

WindyMap.propTypes = {
  locationData: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
};

export default WindyMap;
