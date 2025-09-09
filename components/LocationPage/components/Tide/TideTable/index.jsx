import React from 'react';
import PropTypes from 'prop-types';
import { TideTableContainer, CurrentTideTitle, TideTableTitle, TideTableRow, CurrentTideCotainer, CurrentTideText, HighAndLowTideContainer, NextTideDescription } from './index.styled.js';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const ArrowIcon = ({tideDirection}) => {
  if (tideDirection === "rising") {
    return (<ArrowUpwardRoundedIcon fontSize='medium' />)
  }
  return (<ArrowDownwardRoundedIcon fontSize='medium' />);
}


function TideTable(props) {
  const { highAndLowTides, currentTide } = props;
  const { nextTide } = currentTide;
  const nextTideTimeOnly = nextTide.t.split(',')[1].trim();
  const tideRowArr = highAndLowTides.map((itm) => {
      return (
        <TideTableRow key={itm.t} nextTide={itm.nextTide}>
          <span>{itm.point === 'Low' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          <span>{itm.v.toFixed(1)} ft</span> 
          <span>{itm.t}</span>
        </TideTableRow>
      );
  });
  return (
    <TideTableContainer>
      <CurrentTideCotainer>
        <CurrentTideTitle>Current Tide</CurrentTideTitle>
        <CurrentTideText><ArrowIcon tideDirection={currentTide.tideDirection}/>{currentTide.v.toFixed(1)} ft</CurrentTideText>
        <NextTideDescription>The next <b>{nextTide.point.toLowerCase()} tide</b> will be <b>{nextTide.v.toFixed(1)}ft</b> at <b>{nextTideTimeOnly}</b></NextTideDescription>
      </CurrentTideCotainer>
      <HighAndLowTideContainer>
        <TideTableTitle>Tide Table</TideTableTitle>
        {tideRowArr}
      </HighAndLowTideContainer>
    </TideTableContainer>
  );
}

TideTable.propTypes = {
  tideData: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array,
  }),
};

TideTable.defaultProps = {
  tideData: null,
};

export default TideTable;
