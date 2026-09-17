import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TideTableRow, TideTableWrapper } from "./index.styled.js";
import { TideDay } from "data/api-data/noaa/tides/types";

interface TideTableProps {
  /** The day currently shown in the carousel. */
  day: TideDay;
}

const TideTable: React.FC<TideTableProps> = ({ day }) => {
  const { highAndLowTides } = day;

  return (
    <TideTableWrapper>
      {highAndLowTides.map((itm) => (
        <TideTableRow key={itm.t} nextTide={itm.nextTide}>
          <span>
            {itm.point === "Low" ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </span>
          <span>{itm.v.toFixed(1)} ft</span>
          <span>{itm.t}</span>
        </TideTableRow>
      ))}
    </TideTableWrapper>
  );
};

export default TideTable;
