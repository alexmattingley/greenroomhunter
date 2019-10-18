import React from 'react';
import TideChart from '../TideChart';

function TideContainer(props) {
  const { tideData } = props;
  if (tideData) {
    return (
      <div>
        <TideChart tideData={tideData} />
      </div>
    );
  }
  return (
    <div>Loading Tide Data</div>
  );
}

export default TideContainer;
