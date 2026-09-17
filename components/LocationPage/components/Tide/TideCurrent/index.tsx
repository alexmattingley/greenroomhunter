import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import {
  CardTextContainer,
  CurrentTideTitle,
  CurrentTideText,
  NextTideDescription,
} from "./index.styled";
import { CurrentTide } from "data/api-data/noaa/tides/types";

const ArrowIcon: React.FC<{ tideDirection: "rising" | "dropping" }> = ({
  tideDirection,
}) =>
  tideDirection === "rising" ? (
    <ArrowUpwardRoundedIcon fontSize="medium" />
  ) : (
    <ArrowDownwardRoundedIcon fontSize="medium" />
  );

interface TideCurrentProps {
  currentTide: CurrentTide;
}

/**
 * "Current tide right now" summary. Always visible above the carousel and
 * independent of the chart/table toggle and the selected day.
 */
const TideCurrent: React.FC<TideCurrentProps> = ({ currentTide }) => {
  const { nextTide } = currentTide;
  const nextTideTimeOnly = nextTide ? nextTide.t.split(",")[1].trim() : null;

  return (
    <CardTextContainer>
      <CurrentTideTitle>Current Tide</CurrentTideTitle>
      <CurrentTideText>
        <ArrowIcon tideDirection={currentTide.tideDirection} />
        {currentTide.v.toFixed(1)} ft
      </CurrentTideText>
      {nextTide && (
        <NextTideDescription>
          The next <b>{nextTide.point?.toLowerCase()} tide</b> will be{" "}
          <b>{nextTide.v.toFixed(1)}ft</b> at <b>{nextTideTimeOnly}</b>
        </NextTideDescription>
      )}
    </CardTextContainer>
  );
};

export default TideCurrent;
