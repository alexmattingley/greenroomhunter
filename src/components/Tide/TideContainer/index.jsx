import React from 'react';
import TideChart from '../TideChart';
import TideTable from '../TideTable';

function TideContainer(props) {
  const { tideData, locationData: { tideStation: { location }} } = props;
  if (tideData) {
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
  return (
    <div>Loading Tide Data</div>
  );
}

export default TideContainer;
