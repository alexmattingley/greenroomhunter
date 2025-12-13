import React from "react";
import CustomModal from "@/components/Shared/Modal";
import BuoyHelpModalContent from "@/components/Shared/ModalContent/AggregateBuoyHelp";
import BuoyChart from "../BuoyChart/index.jsx";
import BuoyText from "../BuoyText/index.jsx";
import {
  BuoyContainer,
  ByStationName,
  TextAndChartContainer,
  BuoyContainerTitle,
  HelpIconButton,
} from "./index.styled.js";
import {
  LoadingIcon,
  LoadingText,
  LoadingContainer,
} from "components/LocationPage/components/Loading/index.styled.js";

interface BuoyReading {
  fullDate: string;
  avgPeriod: number;
  peakPeriod: number;
  waterTemp?: number;
  waveHeightFt: number;
  meanWaveDir: number;
}

interface BuoyStation {
  stationId: string;
  indivBuoyData: BuoyReading[];
  stationName: string;
}

interface BuoyData {
  success: boolean;
  data?: BuoyStation[];
}

interface BuoyBlockProps {
  buoyData: BuoyData | null;
  locationData?: unknown;
}

const BuoyBlock: React.FC<BuoyBlockProps> = ({ buoyData }) => {
  // If our data fetch succeeded and returned data
  if (buoyData && buoyData.data && buoyData.success) {
    const BuoyBlocks = buoyData.data.reduce((acc, curr) => {
      const { stationId, indivBuoyData, stationName } = curr;
      // If our array has less than ten readings, don't render it
      // there is most likely an issue with the data
      const minArrLength = 10;
      if (indivBuoyData.length > minArrLength) {
        acc.push(
          <BuoyContainer key={stationId}>
            <ByStationName>{stationName}</ByStationName>
            <TextAndChartContainer>
              <BuoyText buoyData={indivBuoyData} stationId={stationId} />
              <BuoyChart buoyData={indivBuoyData} />
            </TextAndChartContainer>
          </BuoyContainer>
        );
      }
      return acc;
    }, [] as React.ReactElement[]);

    return (
      <div>
        <BuoyContainerTitle>
          <span>Aggregate Buoy Readings </span>
          <CustomModal
            Trigger={<HelpIconButton>?</HelpIconButton>}
            ModalContent={BuoyHelpModalContent}
            ariaLabelby="buoy-help-modal"
            ariaDescribedBy="buoy-help-modal-description"
          />
          <CustomModal
            Trigger={<HelpIconButton>something else</HelpIconButton>}
            ModalContent={() => <>I like turtles</>}
            ariaLabelby="buoy-help-modal"
            ariaDescribedBy="buoy-help-modal-description"
          />
        </BuoyContainerTitle>
        {BuoyBlocks}
      </div>
    );
  }

  // Some Data was returned but the call was actually a failure
  if (buoyData && !buoyData.success) {
    return (
      <div>
        Whoops! It looks like we are having trouble getting the buoy information
      </div>
    );
  }

  return (
    <LoadingContainer>
      <LoadingIcon />
      <LoadingText>Loading Current Buoy Data</LoadingText>
      <LoadingIcon />
    </LoadingContainer>
  );
};

export default BuoyBlock;
