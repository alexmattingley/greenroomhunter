import React from 'react';
import { Link } from 'react-router-dom';
import locationData from 'data/location-data.js';
import { LocationsUl, LocationsLi, LocationImage } from './index.styled.js';

function generateList() {
  return Object.entries(locationData).map(([key, value]) => {
    return (
      <LocationsLi>
        <Link to={`/location/${key}`}>
          <LocationImage src={value.locationThumbImg} />
          <div>{value.name}</div>
        </Link>
      </LocationsLi>
  )});
}

const LocationList = () => (
  <LocationsUl>
    {generateList()}
  </LocationsUl>
);

export default LocationList;
