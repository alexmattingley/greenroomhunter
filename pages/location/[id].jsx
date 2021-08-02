import React from 'react';
import PropTypes from 'prop-types';
import Locationpage from 'components/LocationPage/index.jsx';
import LocationInfo from 'data/location-data.js';
import mapBuoyData from 'data/api-data/noaa/buoys/parse-buoy-data.js';
import fetchTideData from 'data/api-data/noaa/tides/fetch-tide-data.js';
import parseTideData from 'data/api-data/noaa/tides/parse-tide-data.js';

// Entry point for fetch and parsing the buoy and the tide data from NOAA.
// This triggers the fetching of the buoy and tide data
async function fetchBuoyAndTideData(context) {
  const location = context.params.id;
  const locationObj = LocationInfo[location];
  const { buoys, tideStation: { id } } = locationObj;

  let buoyData;
  let tideData;
  try {
    buoyData = {
      success: true,
      data: await mapBuoyData(buoys),
    };
  } catch (error) {
    buoyData = {
      success: false,
      error: error.message,
      data: null,
    };
  }
  try {
    const rawTideData = await fetchTideData(id);
    tideData = {
      success: true,
      data: parseTideData(rawTideData),
    };
  } catch (error) {
    tideData = {
      success: false,
      error: error.message,
      data: null,
    };
  }

  return {
    props: {
      buoyData,
      tideData,
      location,
    },
  };
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
