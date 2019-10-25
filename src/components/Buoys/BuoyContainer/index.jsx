import React from 'react';
import PropTypes from 'prop-types';
import BuoyChart from '../BuoyChart';

class BuoyBlock extends React.Component {
  render() {
    const { buoyData } = this.props;
    if (buoyData && buoyData.data && buoyData.success) {
      return buoyData.data.map((itm) => {
        const { stationId, indivBuoyData } = itm;
        return (
          <div key={stationId}>
            <div>
              Text for the BuoyBlock
            </div>
            <BuoyChart buoyData={indivBuoyData} />
          </div>
        );
      });
    }
    if (buoyData && !buoyData.success) {
      return (
        <div>
          Whoops! It looks like we are having trouble getting the buoy information
        </div>
      );
    }
    return (
      <div>Loading Buoy Data</div>
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
