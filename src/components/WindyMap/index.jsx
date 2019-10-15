import React from 'react';
import { WindyChartContainer } from './index.styled.js';

class WindyMap extends React.Component {
  componentDidMount() {
    const { locationData: { lat, lon } } = this.props;
    const options = {
      // Required: API key
      key: 'rRee3fNI1vLlm34f88k5SJSRAnFm92pZ', // REPLACE WITH YOUR KEY !!!

      // Put additional console output
      verbose: false,

      // Optional: Initial state of the map
      lat,
      lon,
      zoom: 9,
    };

// Initialize Windy API
    /* global windyInit */
    windyInit(options, (windyAPI) => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const { map } = windyAPI;
        // .map is instance of Leaflet map
        /* global L */
        L.popup()
            .setLatLng([lat, lon])
            .setContent('Hello World')
            .openOn(map);
    });
  }

  render() {
    return (
      <div>
        <WindyChartContainer id="windy" />
      </div>
    );
  }
}

export default WindyMap;
