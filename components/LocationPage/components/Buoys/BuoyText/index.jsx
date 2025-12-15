import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ByContainer,
  ByDefaultP,
  LastUpdated,
  ByDefaultH4,
  SwellSpectraBtn,
} from "./index.styled.js";
import Card from "@/components/Shared/Card";

const BuoyText = (props) => {
  const { buoyData, stationId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef(null);
  const {
    fullDate,
    avgPeriod,
    peakPeriod,
    waterTemp,
    waveHeightFt,
    meanWaveDir,
  } = buoyData[0];

  useEffect(() => {
    if (buttonRef.current && !isLoading) {
      const width = buttonRef.current.offsetWidth;
      buttonRef.current.style.minWidth = `${width}px`;
    }
  }, [isLoading]);

  return (
    <ByContainer>
      <Card>
        <LastUpdated>
          <ByDefaultH4>Last Updated</ByDefaultH4>
          <ByDefaultP>{fullDate}</ByDefaultP>
        </LastUpdated>
        <ByDefaultH4>Current Aggregate Reading</ByDefaultH4>
        <ByDefaultP>
          Wave Height: <b>{waveHeightFt} ft</b>
        </ByDefaultP>
        <ByDefaultP>
          Average Period: <b>{avgPeriod} seconds</b>
        </ByDefaultP>
        <ByDefaultP>
          Peak Period: <b>{peakPeriod} seconds</b>
        </ByDefaultP>
        <ByDefaultP>
          Dominant Direction: <b>{meanWaveDir}</b>&deg;
        </ByDefaultP>
        <ByDefaultP>
          Water Temp: <b>{waterTemp}</b> &deg;F
        </ByDefaultP>
        <SwellSpectraBtn
          ref={buttonRef}
          as={Link}
          href={`/buoy/${stationId}`}
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "inherit" }} />
          ) : (
            "See All Wave Heights by Period"
          )}
        </SwellSpectraBtn>
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
