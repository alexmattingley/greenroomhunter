import moment from 'moment-timezone';
import getInvidBuoyData from './fetch-buoy-data.js';


function parseBuoyData(str) {
  // Split array based on table data for the past 2 days
  const strArr = str.split('\n').slice(2, 98);
  const recentBuoyData = strArr.reduce((acc, curr) => {
    const filteredArr = curr.split(' ').filter((item) => item !== '');

    // time information originally in utc
    let year = filteredArr[0];
    let month = filteredArr[1];
    let day = filteredArr[2];
    let hour = filteredArr[3];
    let minute = filteredArr[4];
    const waveHeightMts = parseFloat(filteredArr[8]);
    const waveHeightFt = parseFloat(waveHeightMts * 3.28084).toFixed(2);
    const peakPeriod = parseFloat(filteredArr[9]);
    const avgPeriod = parseFloat(filteredArr[10]);
    const meanWaveDir = parseFloat(filteredArr[11]);
    const waterTemp = parseFloat(filteredArr[14] * 1.8 + 32).toFixed(2);

    if (!!waveHeightMts && !!waveHeightFt && !!peakPeriod && !!avgPeriod) {
      // 2013-02-08 09:30:26.123
      const dateListedUTC = `${year}-${month}-${day} ${hour}:${minute}`;
      // time zone should be time zone of buoy
      const localTime = moment.tz(dateListedUTC, 'UTC').clone().tz('America/Los_Angeles');
      const fullDate = localTime.format('lll');

      // correct hour for timeZone
      year = localTime.format('YYYY');
      month = localTime.format('MMMM');
      day = localTime.format('DD');
      hour = localTime.format('kk');
      minute = localTime.format('mm');
      acc.push(
        {
          fullDate,
          year,
          month,
          day,
          hour,
          minute,
          waveHeightMts,
          waveHeightFt,
          peakPeriod,
          avgPeriod,
          meanWaveDir,
          waterTemp,
        },
      );
    }
    return acc;
  }, []);
  return recentBuoyData;
}


async function mapBuoyData(buoys) {
  const buoyData = Object.entries(buoys).map(async ([stationName, stationId]) => {
    try {
      const rawData = await getInvidBuoyData(stationId);
      const indivBuoyData = parseBuoyData(rawData);
      return { indivBuoyData, stationId, stationName };
    } catch (error) {
      throw new Error(error);
    }
  });
  return Promise.all(buoyData);
}

export default mapBuoyData;
