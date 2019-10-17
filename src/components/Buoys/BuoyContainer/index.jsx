import React from 'react';
import BuoyChart from '../BuoyChart';

class BuoyBlock extends React.Component {
  render() {
    const { buoyData } = this.props;
    if (buoyData) {
      return buoyData.map((itm) => {
        return (
          <div>
            <div>
              Text for the BuoyBlock
            </div>
            <BuoyChart buoyData={itm}/>
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
