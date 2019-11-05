import React from 'react';
import { Link } from 'react-router-dom';
import locationData from 'data/location-data.js';
import {
  LocationsUl,
  LocationsLi,
  LocationImage,
  LocationName,
  ContentContainer,
  LocationsHeader,
  LocationsBlock,
  LocationsLink,
} from './index.styled.js';

function generateList() {
  return Object.entries(locationData).map(([key, value]) => {
    return (
      <LocationsLi>
        <LocationsLink to={`/location/${key}`}>
          <LocationImage src={value.locationThumbImg} />
          <LocationName>{value.name}</LocationName>
        </LocationsLink>
      </LocationsLi>
    );
  });
}

const LocationList = () => (
  <LocationsBlock>
    <ContentContainer>
      <LocationsHeader>Locations</LocationsHeader>
      <LocationsUl>
        {generateList()}
      </LocationsUl>
    </ContentContainer>
  </LocationsBlock>
);

export default LocationList;
