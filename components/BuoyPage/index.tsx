import React, { useContext } from "react";
import { BuoyContext } from "pages/buoy/[id]";
import PeriodBandChart from "./PeriodBandChart";
import NotableBandPeaks from "./NotableBands";
import LastUpdated from "./LastUpdated";
import { PageContainer, BandContainer, ContentContainer } from "./index.styled";
import Alert from "@/components/Shared/Alert";
import { colors } from "@/data/styles-data";

const Title = () => {
  const { buoyName } = useContext(BuoyContext);
  return <h1>Wave height by period band for {buoyName}</h1>;
};

const CustomErrorMessage = () => {
  const { buoyName, errorStatus, errorMessage } = useContext(BuoyContext);
  if (errorStatus === 404) {
    return (
      <PageContainer>
        <ContentContainer>
          <Title />
          <Alert>
            Failed to load buoy data for {buoyName}. Are you sure that buoy
            exists?{" "}
            <a
              style={{ color: colors.almostWhite }}
              target="_blank"
              href="https://www.ndbc.noaa.gov/to_station.shtml"
            >
              See list of existing NOAA buoys
            </a>
            .
          </Alert>
        </ContentContainer>
      </PageContainer>
    );
  } else {
    return (
      <PageContainer>
        <ContentContainer>
          <Title />
          <Alert>Failed to load buoy data for {buoyName}</Alert>
          <p>
            Error Code: {errorStatus} Error Message: {errorMessage}
          </p>
        </ContentContainer>
      </PageContainer>
    );
  }
};

const BuoyPage = () => {
  const { errorStatus } = useContext(BuoyContext);
  if (!!errorStatus) {
    return <CustomErrorMessage />;
  }
  return (
    <PageContainer>
      <ContentContainer>
        <Title />
        <LastUpdated />
        <BandContainer>
          <NotableBandPeaks />
          <PeriodBandChart />
        </BandContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default BuoyPage;
