import React, { useContext } from "react";
import {
  convertToLocalTimezone,
  checkIfStale,
} from "@/lib/utils/timezone-utils";
import {
  LastUpdatedText,
  LastUpdatedBold,
  LastUpdatedContainer,
} from "./index.styled";
import Alert from "@/components/Shared/Alert";
import { BuoyContext } from "pages/buoy/[id]";

const LastUpdated = () => {
  const { timestamp } = useContext(BuoyContext);
  const isStale = checkIfStale(timestamp);
  return (
    <LastUpdatedContainer>
      <LastUpdatedText>
        Last updated:{" "}
        <LastUpdatedBold isStale={isStale}>
          {convertToLocalTimezone(timestamp)}
        </LastUpdatedBold>
      </LastUpdatedText>
      <Alert show={isStale}>This data is more than 2 hours old</Alert>
    </LastUpdatedContainer>
  );
};

export default LastUpdated;
