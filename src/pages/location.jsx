import React from 'react';
import locationData from '../location-data/location-data.json';


class Location extends React.Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
  }

  callAPI() {
      const { match: { params: { location } } } = this.props;
      const data = locationData[location];
      fetch("http://localhost:9000/testAPI", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }}
      )
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    const { match: { params: { location } } } = this.props;
    return (
      <div>
        Location:
        {location}
        state:
        {this.state.apiResponse}
      </div>
    );
  }
}

export default Location;
