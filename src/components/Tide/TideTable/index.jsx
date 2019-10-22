import React from 'react';

function TideTable(props) {
  const { tideData } = props;
  const tideRowArr = tideData.reduce((acc, curr) => {
    if (curr.point) {
      acc.push(
        <div>
          {curr.point}: {curr.t} {curr.v}
        </div>
      );
    }
    return acc;
  }, []);
  return (
    <div>
      {tideRowArr}
    </div>
  );
}

export default TideTable;
