const getInvidBuoyData = require('./fetch-buoy-data.js');

function parseBuoyData(str) {
  // Split array based on table data for the past 2 days
  const strArr = str.split('\n').slice(2, 94);
  const recentBuoyData = strArr.map((idx) => {
    const filteredArr = idx.split(' ').filter((item) => item !== '' && item !== 'MM');
    return {
      date: {
        year: filteredArr[0],
        month: filteredArr[1],
        day: filteredArr[2],
        hour: filteredArr[3],
        minute: filteredArr[4],
      },
      waveHeightmts: filteredArr[5],
      peakPeriod: filteredArr[6],
      avgPeriod: filteredArr[7],
      meanWaveDir: filteredArr[8],
      waterTemp: filteredArr[9],
    };
  });
  return recentBuoyData;
}


async function mapBuoyData(buoys) {
  const buoyData = buoys.map(async (itm) => {
    const rawData = await getInvidBuoyData(itm);
    const indivBuoyData = parseBuoyData(rawData);
    return indivBuoyData;
  });
  return Promise.all(buoyData);
}
module.exports = mapBuoyData;
