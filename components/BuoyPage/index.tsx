import React, { useContext } from "react";
import { BuoyContext } from "pages/buoy/[id]";
import NineBand from "./nineBand";
import { PageContainer } from "./index.styled";

// TODO Shorterm
// 2. Convert the Time stamp to PDT
// 3. Create a custom tooltip with the information, wave height, period and direction
// 4. Come up with a design for mobile and desktop
//    a. In mobile, make the wave height label take up less space so you can use the full width
//    b. Should we create a text version for mobile instead of the chart? Is that more usable?
//    c. We need to fix the colors so we can see the cross bars in the graph
// Wishlist?
// 1. Change the python script to return every period so the graph is a little more continuous looking instead of buckets?
// 2. Should we also try to create a spectral graph?

const BuoyPage = () => {
  const { buoyName, timestamp, error } = useContext(BuoyContext);
  if (!!error) {
    console.log(error);
    return (
      <PageContainer>
        <h1>Wave height by period band for {buoyName}</h1>
        <p>Failed to load buoy breakdown:</p>
        <p>{error}</p>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <h1>Wave height by period band for {buoyName}</h1>
      <>Timestamp (UTC): {timestamp}</>
      <NineBand />
    </PageContainer>
  );
};

export default BuoyPage;
