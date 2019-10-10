import React from 'react';
import locationData from '../location-data/location-data.json';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    const { match: { params: { location } } } = this.props;
    const data = locationData[location];
    fetch('http://localhost:9000/location-api', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }));
  }

  render() {
    const { match: { params: { location } } } = this.props;
    const locationName = locationData[location].name;
    return (
      <div>
        Location:
        {locationName}
        state:
        something
      </div>
    );
  }
}

export default Location;
