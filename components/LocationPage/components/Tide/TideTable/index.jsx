import React from 'react';
import PropTypes from 'prop-types';
import { TideTableContainer, TideTableTitle, TideTableRow } from './index.styled.js';


function TideTable(props) {
  const { tideData: { data } } = props;
  const tideRowArr = data.reduce((acc, curr) => {
    if (curr.point) {
      acc.push(
        <TideTableRow key={curr.t} point={curr.point}>
          {curr.point} Tide: {curr.v} ft {curr.t}
        </TideTableRow>,
      );
    }
    return acc;
  }, []);
  return (
    <TideTableContainer>
      <TideTableTitle>High & Low tide points</TideTableTitle>
      {tideRowArr}
    </TideTableContainer>
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
