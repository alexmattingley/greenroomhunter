import React from 'react';
import PropTypes from 'prop-types';
import TideChart from '../TideChart';
import TideTable from '../TideTable';

function TideContainer(props) {
  const { tideData, locationData: { tideStation: { location } } } = props;
  // Render component if tide NOAA call is successful
  if (tideData && tideData.success) {
    return (
      <div>
        <div>
          Tides for today and tomorrow for {location}
        </div>
        <TideChart tideData={tideData} />
        <TideTable tideData={tideData} />
      </div>
    );
  }
  // Handle failure if NOAA call fails
  if (tideData && !tideData.success) {
    return (
      <div>
        Whoops! It looks like we are having trouble getting the buoy information
      </div>
    );
  }
  return (
    <div>Loading Tide Data</div>
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
