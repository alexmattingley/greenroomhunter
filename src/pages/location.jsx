import React from 'react';
import locationData from '../location-data/location-data.json';
import WindyMap from '../components/WindyMap';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
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
      .then((res) => this.setState({ apiResponse: res }));
  }

  render() {
    console.log(this.state.apiResponse);
    const { match: { params: { location } } } = this.props;
    const locationObject = locationData[location];
    const { name } = locationObject;
    return (
      <div>
        Location:
        {name}
        <WindyMap locationData={locationObject} />
      </div>
    );
  }
}

export default Location;
