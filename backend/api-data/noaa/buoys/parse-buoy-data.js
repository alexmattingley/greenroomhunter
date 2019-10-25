const getInvidBuoyData = require('./fetch-buoy-data.js');

function parseBuoyData(str) {
  // Split array based on table data for the past 2 days
  const strArr = str.split('\n').slice(2, 98);
  const recentBuoyData = strArr.map((idx) => {
    const filteredArr = idx.split(' ').filter((item) => item !== '');
    const itmReading = {
      year: filteredArr[0],
      month: filteredArr[1],
      day: filteredArr[2],
      hour: filteredArr[3],
      minute: filteredArr[4],
      waveHeightMts: filteredArr[8],
      waveHeightFt: parseFloat(filteredArr[8]) * 3.28084,
      peakPeriod: filteredArr[9],
      avgPeriod: filteredArr[10],
      meanWaveDir: filteredArr[11],
      waterTemp: filteredArr[14],
    };
    return itmReading;
  });
  return recentBuoyData;
}


async function mapBuoyData(buoys) {
  const buoyData = Object.values(buoys).map(async (stationId) => {
    try {
      const rawData = await getInvidBuoyData(stationId);
      const indivBuoyData = parseBuoyData(rawData);
      return { indivBuoyData, stationId };
    } catch (error) {
      throw new Error(error);
    }
  });
  return Promise.all(buoyData);
}
module.exports = mapBuoyData;
