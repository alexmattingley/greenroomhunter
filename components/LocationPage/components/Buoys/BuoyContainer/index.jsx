import React from "react";
import PropTypes from "prop-types";
import BuoyChart from "../BuoyChart/index.jsx";
import BuoyText from "../BuoyText/index.jsx";
import {
  BuoyContainer,
  ByStationName,
  TextAndChartContainer,
} from "./index.styled.js";
import {
  LoadingIcon,
  LoadingText,
  LoadingContainer,
} from "components/LocationPage/components/Loading/index.styled.js";

class BuoyBlock extends React.Component {
  render() {
    const { buoyData } = this.props;
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
      }, []);
      return (
        <div>
          <h4>Aggregate Buoy Readings</h4>
          {BuoyBlocks}
        </div>
      );
    }
    // Some Data was returned but the call was actually a failure
    if (buoyData && !buoyData.success) {
      return (
        <div>
          Whoops! It looks like we are having trouble getting the buoy
          information
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
  }
}

BuoyBlock.propTypes = {
  buoyData: PropTypes.shape({
    success: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array,
  }),
};

BuoyBlock.defaultProps = {
  buoyData: null,
};

export default BuoyBlock;
