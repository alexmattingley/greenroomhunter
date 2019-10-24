import React from 'react';
import PropTypes from 'prop-types';


function TideTable(props) {
  const { tideData: { data } } = props;
  const tideRowArr = data.reduce((acc, curr) => {
    if (curr.point) {
      acc.push(
        <div key={curr.t}>
          {curr.point}: {curr.t} {curr.v}
        </div>,
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


TideTable.propTypes = {
  tideData: PropTypes.shape({
    data: PropTypes.array,
  }),
};

TideTable.defaultProps = {
  tideData: null,
};

export default TideTable;
