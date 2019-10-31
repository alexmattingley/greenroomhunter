import React from 'react';
import { Link } from 'react-router-dom';
import locationData from '../../data/location-data.json';
import { LocationsUl, LocationsLi } from './index.styled.js';

function generateList() {
  return Object.entries(locationData).map(([key, value]) => (
    <LocationsLi>
      <Link to={`/location/${key}`}>{value.name}</Link>
    </LocationsLi>
  ));
}

const LocationList = () => (
  <LocationsUl>
    {generateList()}
  </LocationsUl>
);

export default LocationList;
