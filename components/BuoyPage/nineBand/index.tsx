import React, { useContext } from "react";
import { BuoyContext } from "pages/buoy/[id]";
import NineBandChart from "./NineBandChart";

const NineBand = () => {
  const { nineBand } = useContext(BuoyContext);

  if (!nineBand) {
    return <div>Loading wave data...</div>;
  }

  const nineBandReverseArray = Object.entries(nineBand).reverse();
  const nineBandReverse = new Map(nineBandReverseArray);

  return (
    <div>
      <h3>Wave Height by Period Band</h3>
      <NineBandChart nineBandData={nineBandReverse} />
    </div>
  );
};

export default NineBand;
