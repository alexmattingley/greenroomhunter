import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon, LoadingText, LoadingContainer } from 'components/LocationPage/components/Loading/index.styled.js';
import TideChart from '../TideChart';
import TideTable from '../TideTable';
import { TideTitle, TideBlockContainer, TideDataContainer } from './index.styled.js';
import parseTideData from 'data/api-data/noaa/tides/parse-tide-data';


function TideContainer(props) {
  const { tideData, locationData: { tideStation: { location }, timeZone } } = props;
  const { data, success } = tideData;
  
  // Render component if tide NOAA call is successful
  if (data && success) {
    try {
      const {
        dataForChart,
        highAndLowTides,
        currentTide,
      } = parseTideData(data, timeZone);
      return (
        <TideBlockContainer>
          <TideTitle>
            Tides for today and tomorrow for {location}
          </TideTitle>
          <TideDataContainer>
            <TideTable highAndLowTides={highAndLowTides} currentTide={currentTide} />
            <TideChart tideDataForChart={dataForChart} />
          </TideDataContainer>
        </TideBlockContainer>
      );
    } catch (error) {
      console.error('Error parsing tide data:', error);
      return (
        <div>
          Whoops! It looks like we are having trouble getting the tide information
        </div>
      );
    }
  }
  
  // Handle failure if NOAA call fails
  if (tideData && !tideData.success) {
    return (
      <div>
        Whoops! It looks like we are having trouble getting the tide information
      </div>
    );
  }
  return (
    <LoadingContainer>
      <LoadingIcon />
      <LoadingText>Loading Tides for Today and Tomorrow</LoadingText>
      <LoadingIcon />
    </LoadingContainer>
  );
}

TideContainer.propTypes = {
  tideData: PropTypes.shape({
    success: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array,
  }),
  locationData: PropTypes.shape({
    tideStation: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

TideContainer.defaultProps = {
  tideData: null,
};

export default TideContainer;
