import React from 'react';
import PropTypes from 'prop-types';
import Locationpage from 'components/LocationPage/index.jsx';
import LocationInfo from 'data/location-data.js';
import mapBuoyData from 'data/api-data/noaa/buoys/parse-buoy-data.js';
import fetchTideData from 'data/api-data/noaa/tides/fetch-tide-data.js';
import parseTideData from 'data/api-data/noaa/tides/parse-tide-data.js';
// import getDataFromCache from 'pages/api/data';

// Entry point for fetch and parsing the buoy and the tide data from NOAA.
// This triggers the fetching of the buoy and tide data
async function fetchBuoyAndTideData(context) {
  const location = context.params.id;
  const locationObj = LocationInfo[location];
  const { buoys, tideStation: { id } } = locationObj;

  try {
    // Get the base URL for the current environment
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = context?.req?.headers?.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const res = await fetch(`${baseUrl}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buoys,
        tideStationId: id,
        location,
      }),
    });
    
    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    
    const { buoyData, tideData } = await res.json();
    return {
      props: {
        buoyData,
        tideData,
        location,
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// This function is needed to make any api calls which we need for our locations pages.
export async function getServerSideProps(context) {
  const buoyAndTideData = await fetchBuoyAndTideData(context);
  return buoyAndTideData;
}

function Location(props) {
  const { buoyData, tideData, location } = props;
  return <Locationpage buoyData={buoyData} tideData={tideData} location={location} />;
}

/* eslint-disable react/forbid-prop-types */
Location.propTypes = {
  buoyData: PropTypes.object.isRequired,
  tideData: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default Location;
