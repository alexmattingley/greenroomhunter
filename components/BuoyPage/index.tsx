import React, { useContext } from "react";
import { BuoyContext } from "pages/buoy/[id]";
import NineBand from "./nineBand";
import { PageContainer } from "./index.styled";

const BuoyPage = () => {
  const { buoyName } = useContext(BuoyContext);
  return (
    <PageContainer>
      <h1>Wave height by period band for {buoyName}</h1>
      <NineBand />
    </PageContainer>
  );
};

export default BuoyPage;
