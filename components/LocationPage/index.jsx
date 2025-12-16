import React from "react";
import PropTypes from "prop-types";
import { LocationContent, LocationHeader } from "./index.styled.js";
import WindyMap from "./components/WindyMap";
import BuoyBlock from "./components/Buoys/BuoyContainer";
import TideBlock from "./components/Tide/TideContainer";
import SevenDayBuoy from "./components/SevenDayBuoy/index.jsx";
import LocationSideNav from "./components/LocationsSideNav/index.jsx";
import locationData from "data/location-data";

function Location(props) {
  const { buoyData, tideData, location } = props;
  const locationObject = locationData[location];
  const { name, CDIP7DayBuoyStnNum } = locationObject;
  return (
    <>
      <LocationSideNav />
      <LocationContent>
        <LocationHeader>{name}</LocationHeader>
        <div id="buoy_block">
          <BuoyBlock locationData={locationObject} buoyData={buoyData} />
        </div>
        <div id="windy_block">
          <WindyMap locationData={locationObject} />
        </div>
        <div id="tide_block">
          <TideBlock locationData={locationObject} tideData={tideData} />
        </div>
        <div id="buoy_prediction_block">
          <SevenDayBuoy stationNum={CDIP7DayBuoyStnNum} />
        </div>
      </LocationContent>
    </>
  );
}

/* eslint-disable react/forbid-prop-types */
Location.propTypes = {
  buoyData: PropTypes.object.isRequired,
  tideData: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default Location;
