import React from "react";
import PropTypes from "prop-types";
import { ByContainer, ByDefaultP } from "./index.styled.js";
import Card from "@/components/Shared/Card";

const BuoyText = (props) => {
  const { buoyData } = props;
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
      <Card>
        <div>
          <ByDefaultP>Last Updated: </ByDefaultP>
          <ByDefaultP>
            <b>{fullDate}</b>
          </ByDefaultP>
        </div>
        <ByDefaultP>
          Wave Height: <b>{waveHeightFt} ft</b>
        </ByDefaultP>
        <ByDefaultP>
          Average Period: <b>{avgPeriod}</b> seconds
        </ByDefaultP>
        <ByDefaultP>
          Peak Period: <b>{peakPeriod}</b> seconds
        </ByDefaultP>
        <ByDefaultP>
          Dominant Direction: <b>{meanWaveDir}</b>&deg;
        </ByDefaultP>
        <ByDefaultP>
          Water Temp: <b>{waterTemp}</b> &deg;F
        </ByDefaultP>
      </Card>
    </ByContainer>
  );
};

BuoyText.propTypes = {
  buoyData: PropTypes.arrayOf(
    PropTypes.shape({
      fullDate: PropTypes.string.isRequired,
      avgPeriod: PropTypes.number.isRequired,
      peakPeriod: PropTypes.number.isRequired,
      waterTemp: PropTypes.number,
      waveHeightFt: PropTypes.number.isRequired,
      meanWaveDir: PropTypes.number.isRequired,
    })
  ).isRequired,
  stationName: PropTypes.string.isRequired,
};

export default BuoyText;
