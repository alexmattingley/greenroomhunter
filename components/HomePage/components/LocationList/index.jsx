import React from 'react';
import Link from 'next/link';
import locationData from 'data/location-data.js';
import {
  LocationsUl,
  LocationsLi,
  LocationImage,
  LocationName,
  ContentContainer,
  LocationsHeader,
  LocationsBlock,
} from './index.styled.js';

function generateList() {
  return Object.entries(locationData).map(([key, value]) => (
      <LocationsLi key={key}>
        <Link href={`/location/${key}`} passHref>
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
