import React from 'react';
import PropTypes from 'prop-types';
import { ByContainer, ByTextTitle, ByDefaultP } from './index.styled.js';

const BuoyText = (props) => {
  const { buoyData, stationName } = props;
  const {
    fullDate,
    avgPeriod,
    peakPeriod,
    waterTemp,
    waveHeightFt,
    meanWaveDir,
  } = buoyData[0];

  return (
    <ByContainer>
      <ByTextTitle>{stationName}</ByTextTitle>
      <ByDefaultP>{fullDate}</ByDefaultP>
      <ByDefaultP>Wave Height(ft): {waveHeightFt}</ByDefaultP>
      <ByDefaultP>Average Period: {avgPeriod} seconds</ByDefaultP>
      <ByDefaultP>Peak Period: {peakPeriod} seconds</ByDefaultP>
      <ByDefaultP>Dominant Direction: {meanWaveDir}&deg;</ByDefaultP>
      <ByDefaultP>Water Temp: {waterTemp} &deg;F</ByDefaultP>
    </ByContainer>
  );
};

BuoyText.propTypes = {
  buoyData: PropTypes.arrayOf(PropTypes.shape({
    fullDate: PropTypes.string.isRequired,
    avgPeriod: PropTypes.number.isRequired,
    peakPeriod: PropTypes.number.isRequired,
    waterTemp: PropTypes.number,
    waveHeightFt: PropTypes.number.isRequired,
    meanWaveDir: PropTypes.number.isRequired,
  })).isRequired,
  stationName: PropTypes.string.isRequired,
};

export default BuoyText;
