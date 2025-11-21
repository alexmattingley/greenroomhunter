import React, { useContext } from "react";
import { BuoyContext } from "pages/buoy/[id]";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  NBandContainer,
  NBandHeading,
  NBandList,
  NBandListItem,
  NBandDirectionSpan,
  NBandDirectionArrow,
} from "./index.styled";

interface DirectionArrowIconProps {
  degree: number;
}

const DirectionArrowIcon: React.FC<DirectionArrowIconProps> = ({ degree }) => {
  // Default state is 270 degrees (pointing right)
  // Rotation = degree - 270
  const rotation = degree - 270;

  return (
    <NBandDirectionArrow rotation={rotation}>
      <ArrowForwardIcon fontSize="small" />
    </NBandDirectionArrow>
  );
};

const NotableBandPeaks = () => {
  const { allBandData } = useContext(BuoyContext);
  const allPeaks = [];
  allBandData.forEach((band, idx) => {
    const bandBeforeHeight = allBandData?.[idx - 1]?.height;
    const currentBandHeight = band.height;
    const currentPeriod = band.period;
    const currentDirection = band.direction;
    const bandAfterHeight = allBandData?.[idx + 1]?.height;
    const notableEnergy = currentBandHeight > 1 || currentPeriod > 6;
    if (
      bandBeforeHeight < currentBandHeight &&
      bandAfterHeight < currentBandHeight &&
      notableEnergy
    ) {
      allPeaks.push(
        <NBandListItem key={idx}>
          <b>{currentBandHeight}ft</b> @ <b>{currentPeriod}s</b> from{" "}
          <NBandDirectionSpan>
            <b>{currentDirection}&deg;</b>
            <DirectionArrowIcon degree={parseFloat(currentDirection)} />
          </NBandDirectionSpan>
        </NBandListItem>
      );
    }
  });
  return (
    <NBandContainer>
      <NBandHeading>Notable Peak Energy Bands</NBandHeading>
      <NBandList>{allPeaks}</NBandList>
    </NBandContainer>
  );
};

export default NotableBandPeaks;
