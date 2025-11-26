import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  NBandContainer,
  NBandHeading,
  NBandList,
  NBandListItem,
  NBandDirectionSpan,
  NBandDirectionArrow,
} from "./index.styled";
import { BuoyContext } from "pages/buoy/[id]";

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
    // This currently intentionally excludes "peaks" if they are at the edges of the array or period bands.
    // I'm doing this for two reasons:
    // Typically super long period or super short period swells are often "noise" and not real indications of ridable waves.
    // The graph below the notableBands section lists all peaks, this section just exists to highlight notable energy bands.
    // Right now, this section often has too much information, and I don't need it showing even more noise by including edges.
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
