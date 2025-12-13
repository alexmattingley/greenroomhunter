import styled from "@emotion/styled";
import React from "react";

const BuoyHelpModalContent: React.FC = () => {
  return (
    <>
      <p style={{ marginBottom: "20px" }}>
        Aggregate buoy readings are a simplified snapshot of ocean conditions
        measured by a given buoy. They show the overall wave height, average
        period, peak period, and dominant wave direction by combining all wave
        energy into a single summary. The chart displays how these aggregate
        values have changed over the past 12 hours.
      </p>
      <p>
        <b>Hunter pro tip:</b> Use these readings to get a general idea if the
        swell has increased on decreased. Use the wave height by period band
        tool to get a better idea of the mix of swells.
      </p>
    </>
  );
};

export default BuoyHelpModalContent;
