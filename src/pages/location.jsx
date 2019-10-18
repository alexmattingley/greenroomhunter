import React from 'react';
import PropTypes from 'prop-types';
import locationData from '../location-data/location-data.json';
import WindyMap from '../components/WindyMap';
import BuoyBlock from '../components/Buoys/BuoyContainer';
import TideBlock from '../components/Tide/TideContainer';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiData: '' };
  }

  componentDidMount() {
    this.callBackend();
  }

  callBackend() {
    const { match: { params: { location } } } = this.props;
    const locationObj = locationData[location];
    fetch('http://localhost:9000/location-api', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(locationObj), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ apiData: res }));
  }

  render() {
    const { apiData: { buoyData, tideData } } = this.state;
    const { match: { params: { location } } } = this.props;
    const locationObject = locationData[location];
    const { name } = locationObject;
    return (
      <div>
        Location:
        {name}
        <BuoyBlock locationData={locationObject} buoyData={buoyData} />
        <WindyMap locationData={locationObject} />
        <TideBlock tideData={tideData}/>
      </div>
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
