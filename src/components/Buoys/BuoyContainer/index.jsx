import React from 'react';
import BuoyChart from '../BuoyChart';

class BuoyBlock extends React.Component {
  render() {
    const { buoyData } = this.props;
    if (buoyData) {
      return buoyData.map((itm) => {
        const { stationId, indivBuoyData } = itm;
        return (
          <div key={stationId}>
            <div>
              Text for the BuoyBlock
            </div>
            <BuoyChart buoyData={indivBuoyData} />
          </div>
        );
      })
    }
    return (
      <div>Loading Buoy Data</div>
    );
  }
}

export default BuoyBlock;
