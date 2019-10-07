import React from 'react';
import getBuoyData from '../data-requests/get-buoy-data.js';

const Location = (props) => {
  getBuoyData();
  const { match: { params: { location } } } = props;
  return (
    <div>
      Location:
      {location}
    </div>
  );
};

export default Location;
