import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon, LoadingText, LoadingContainer } from 'components/LocationPage/components/Loading/index.styled.js';
import { BuoyContainer } from './index.styled.js';
import BuoyChart from '../BuoyChart/index.jsx';
import BuoyText from '../BuoyText/index.jsx';

class BuoyBlock extends React.Component {
  render() {
    const { buoyData } = this.props;
    // If our data fetch succeeded and returned data
    if (buoyData && buoyData.data && buoyData.success) {
      return buoyData.data.reduce((acc, curr) => {
        const { stationId, indivBuoyData, stationName } = curr;
        const minArrLength = 10;
        // If our array has less than ten readings, don't render it
        // there is most likely an issue with the data
        if (indivBuoyData.length > minArrLength) {
          acc.push((
            <BuoyContainer key={stationId}>
              <BuoyText buoyData={indivBuoyData} stationName={stationName} />
              <BuoyChart buoyData={indivBuoyData} />
            </BuoyContainer>
          ));
        }
        return acc;
      }, []);
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
  }
}

BuoyBlock.propTypes = {
  buoyData: PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.array,
  }),
};

BuoyBlock.defaultProps = {
  buoyData: null,
};

export default BuoyBlock;
