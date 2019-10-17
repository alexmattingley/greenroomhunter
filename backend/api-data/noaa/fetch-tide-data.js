// http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20191015&end_date=20191017&product=predictions&station=9410170&datum=MLLW&units=english&time_zone=lst&application=Web_Services&format=json
const fetch = require('node-fetch');
const moment = require('moment');

const fetchTideData = async (stationId) => {
  const beginDate = moment().format('L');
  const endDate = moment().add(1, 'days').format('L');
  try {
    const response = await fetch(`http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${beginDate}&end_date=${endDate}&product=predictions&station=${stationId}&datum=MLLW&units=english&time_zone=lst&application=Web_Services&format=json`);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

module.exports = fetchTideData;
