import React from 'react';
import PropTypes from 'prop-types';
import locationData from 'data/location-data.js';
import { LocationContent, LocationHeader } from './index.styled.js';
import WindyMap from './components/WindyMap';
import BuoyBlock from './components/Buoys/BuoyContainer';
import TideBlock from './components/Tide/TideContainer';
import SevenDayBuoy from './components/SevenDayBuoy/index.jsx';
import LocationSideNav from './components/LocationsSideNav/index.jsx';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tideData: null, buoyData: null };
  }

  componentDidMount() {
    this.callBackend();
  }

  callBackend() {
    const { match: { params: { location } } } = this.props;
    const locationObj = locationData[location];
    // TODO DEPENDING ON ENV, PUT MAKE REQUEST TO DIFFERENT LOCATION
    fetch('https://thawing-gorge-57797.herokuapp.com/location-api', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(locationObj), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState(
        {
          tideData: res.tideData,
          buoyData: res.buoyData,
        },
      ));
  }

  render() {
    const { buoyData, tideData } = this.state;
    const { match: { params: { location } } } = this.props;
    const locationObject = locationData[location];
    const { name, CDIP7DayBuoyStnNum } = locationObject;
    return (
      <>
        <LocationSideNav />
        <LocationContent>
          <LocationHeader>{name}</LocationHeader>
          <div id="buoy_block">
            <BuoyBlock locationData={locationObject} buoyData={buoyData} />
          </div>
          <div id="windy_block">
            <WindyMap locationData={locationObject} />
          </div>
          <div id="tide_block">
            <TideBlock locationData={locationObject} tideData={tideData} />
          </div>
          <div id="buoy_prediction_block">
            <SevenDayBuoy stationNum={CDIP7DayBuoyStnNum} />
          </div>
        </LocationContent>
      </>
    );
  }
}

Location.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Location;
