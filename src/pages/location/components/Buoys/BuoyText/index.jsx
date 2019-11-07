import React from 'react';
import PropTypes from 'prop-types';
import { ByContainer, ByTextTitle } from './index.styled.js';

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
      <p>{fullDate}</p>
      <p>Wave Height(ft): {waveHeightFt}</p>
      <p>Average Period: {avgPeriod} seconds</p>
      <p>Peak Period: {peakPeriod} seconds</p>
      <p>Dominant Direction: {meanWaveDir}&deg;</p>
      <p>Water Temp: {waterTemp} &deg;F</p>
    </ByContainer>
  );
};

BuoyText.propTypes = {
  buoyData: PropTypes.arrayOf(PropTypes.shape({
    fullDate: PropTypes.string.isRequired,
    avgPeriod: PropTypes.number.isRequired,
    peakPeriod: PropTypes.number.isRequired,
    waterTemp: PropTypes.number.isRequired,
    waveHeightFt: PropTypes.number.isRequired,
    meanWaveDir: PropTypes.number.isRequired,
  })).isRequired,
  stationName: PropTypes.string.isRequired,
};

export default BuoyText;
