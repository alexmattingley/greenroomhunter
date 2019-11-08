import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon, LoadingText, LoadingContainer } from 'pages/location/components/Loading/index.styled.js';
import TideChart from '../TideChart';
import TideTable from '../TideTable';
import { TideTitle, TideBlockContainer, TideDataContainer } from './index.styled.js';

function TideContainer(props) {
  const { tideData, locationData: { tideStation: { location } } } = props;
  // Render component if tide NOAA call is successful
  if (tideData && tideData.success) {
    return (
      <TideBlockContainer>
        <TideTitle>
          Tides for today and tomorrow for {location}
        </TideTitle>
        <TideDataContainer>
          <TideChart tideData={tideData} />
          <TideTable tideData={tideData} />
        </TideDataContainer>
      </TideBlockContainer>
    );
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
