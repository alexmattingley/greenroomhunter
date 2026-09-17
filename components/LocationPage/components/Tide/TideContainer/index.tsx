import React, { useState } from "react";
import TideCarousel, { TideViewMode } from "../TideCarousel";
import TideCurrent from "../TideCurrent";
import {
  TideTitle,
  TideBlockContainer,
  TideLayout,
  TideCurrentCol,
  TideCarouselCol,
} from "./index.styled.js";
import parseTideData from "data/api-data/noaa/tides/parse-tide-data";
import { TideDay } from "data/api-data/noaa/tides/types";
import {
  LoadingIcon,
  LoadingText,
  LoadingContainer,
} from "components/LocationPage/components/Loading/index.styled.js";

interface TideData {
  success?: boolean;
  data?: Array<{ t: string; v: number }>;
}

interface TideContainerProps {
  tideData?: TideData | null;
  locationData: {
    tideStation: { location: string };
    timeZone: string;
  };
}

const errorMessage =
  "Whoops! It looks like we are having trouble getting the tide information";

/**
 * Presentational view once tide data is parsed: a single card carousel where
 * each day can be viewed as a chart (default) or a table, defaulting to today.
 */
const TideView: React.FC<{ days: TideDay[]; location: string }> = ({
  days,
  location,
}) => {
  const todayIndex = Math.max(
    days.findIndex((day) => day.currentTide),
    0
  );
  const [selectedIndex, setSelectedIndex] = useState(todayIndex);
  const [viewMode, setViewMode] = useState<TideViewMode>("chart");
  const currentTide = days[todayIndex]?.currentTide;

  return (
    <TideBlockContainer>
      <TideTitle>Tides for the next {days.length} days for {location}</TideTitle>
      <TideLayout>
        {currentTide && (
          <TideCurrentCol>
            <TideCurrent currentTide={currentTide} />
          </TideCurrentCol>
        )}
        <TideCarouselCol>
          <TideCarousel
            days={days}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </TideCarouselCol>
      </TideLayout>
    </TideBlockContainer>
  );
};

function TideContainer({ tideData, locationData }: TideContainerProps) {
  const {
    tideStation: { location },
    timeZone,
  } = locationData;
  const { data, success } = tideData || {};

  // Handle failure if the NOAA call failed
  if (tideData && !success) {
    return <div>{errorMessage}</div>;
  }

  // Render once we have a successful response
  if (data && success) {
    try {
      const days = parseTideData(data, timeZone);
      return <TideView days={days} location={location} />;
    } catch (error) {
      console.error("Error parsing tide data:", error);
      return <div>{errorMessage}</div>;
    }
  }

  return (
    <LoadingContainer>
      <LoadingIcon />
      <LoadingText>Loading Tides for the Next 5 Days</LoadingText>
      <LoadingIcon />
    </LoadingContainer>
  );
}

export default TideContainer;
