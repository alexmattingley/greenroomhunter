import React from 'react';
import Link from 'next/link';
import {
  LocationsUl,
  LocationsLi,
  LocationImage,
  LocationName,
  ContentContainer,
  LocationsHeader,
  LocationsBlock,
} from './index.styled.js';
import locationData from 'data/location-data.js';

function generateList() {
  return Object.entries(locationData).map(([key, value]) => (
      <LocationsLi key={key}>
        <Link href={`/location/${key}`} passHref prefetch>
          <LocationImage locationThumbImg={value.locationThumbImg} />
          <LocationName>
            {value.name}
          </LocationName>
        </Link>
      </LocationsLi>
  ));
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
