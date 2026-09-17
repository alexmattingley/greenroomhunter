import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TideChart from "../TideChart";
import TideTable from "../TideTable";
import {
  CarouselRoot,
  Header,
  ViewToggle,
  ToggleButton,
  Viewport,
  Track,
  Slide,
  SlideHeading,
  Controls,
  ArrowButton,
  Dots,
  Dot,
} from "./index.styled";
import { TideDay } from "data/api-data/noaa/tides/types";

export type TideViewMode = "chart" | "table";

interface TideCarouselProps {
  days: TideDay[];
  /** Index of the day currently shown. */
  selectedIndex: number;
  /** Called when the visible day changes (swipe, arrows, or dots). */
  onSelect: (index: number) => void;
  /** Whether each slide shows the chart or the table. */
  viewMode: TideViewMode;
  /** Called when the user toggles between chart and table. */
  onViewModeChange: (mode: TideViewMode) => void;
}

/**
 * Swipeable, one-day-per-slide carousel built on Embla, with a chart/table
 * toggle plus arrow + dot controls. Each slide shows either that day's chart or
 * its tide table. Starts on `selectedIndex` (today).
 */
const TideCarousel: React.FC<TideCarouselProps> = ({
  days,
  selectedIndex,
  onSelect,
  viewMode,
  onViewModeChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: selectedIndex,
    align: "center",
    // Dragging the chart to scrub kept changing days by accident; days are
    // changed via the arrows/dots instead.
    watchDrag: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleSelect = useCallback(
    (api: EmblaCarouselType) => {
      onSelect(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    },
    [onSelect]
  );

  useEffect(() => {
    if (!emblaApi) return undefined;
    handleSelect(emblaApi);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <CarouselRoot>
      <Header>
        <ViewToggle role="group" aria-label="Tide view">
          <ToggleButton
            type="button"
            className={viewMode === "chart" ? "is-active" : ""}
            aria-pressed={viewMode === "chart"}
            onClick={() => onViewModeChange("chart")}
          >
            Chart
          </ToggleButton>
          <ToggleButton
            type="button"
            className={viewMode === "table" ? "is-active" : ""}
            aria-pressed={viewMode === "table"}
            onClick={() => onViewModeChange("table")}
          >
            Table
          </ToggleButton>
        </ViewToggle>
      </Header>
      <Viewport ref={emblaRef}>
        <Track>
          {days.map((day) => (
            <Slide key={day.date}>
              <SlideHeading>{day.date}</SlideHeading>
              {viewMode === "chart" ? (
                <TideChart points={day.points} />
              ) : (
                <TideTable day={day} />
              )}
            </Slide>
          ))}
        </Track>
      </Viewport>
      <Controls>
        <ArrowButton
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous day"
        >
          <ChevronLeftIcon />
        </ArrowButton>
        <Dots>
          {days.map((day, index) => (
            <Dot
              key={day.date}
              type="button"
              className={index === selectedIndex ? "is-selected" : ""}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show tides for ${day.date}`}
              aria-current={index === selectedIndex}
            />
          ))}
        </Dots>
        <ArrowButton
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next day"
        >
          <ChevronRightIcon />
        </ArrowButton>
      </Controls>
    </CarouselRoot>
  );
};

export default TideCarousel;
