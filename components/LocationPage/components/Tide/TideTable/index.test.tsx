import React from "react";
import { render, screen } from "@testing-library/react";
import TideTable from "./index";
import { TideDay } from "data/api-data/noaa/tides/types";

const day: TideDay = {
  date: "Wed, Sep 16",
  points: [],
  highAndLowTides: [
    { t: "Sep 16, 3:00 AM", v: 5.2, point: "High" },
    { t: "Sep 16, 9:00 AM", v: 0.4, point: "Low", nextTide: true },
  ],
};

describe("TideTable", () => {
  it("lists the day's high/low tides", () => {
    render(<TideTable day={day} />);
    expect(screen.getByText("5.2 ft")).toBeInTheDocument();
    expect(screen.getByText("0.4 ft")).toBeInTheDocument();
  });

  it("does not render the current-tide summary (it lives in TideCurrent)", () => {
    render(<TideTable day={day} />);
    expect(screen.queryByText("Current Tide")).not.toBeInTheDocument();
  });
});
