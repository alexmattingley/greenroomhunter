// https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20210617&end_date=20210618&product=predictions&station=9410170&datum=MLLW&units=english&time_zone=lst_ldt&application=Web_Services&format=json
import fetch from 'node-fetch';
import { DateTime } from 'luxon';

const fetchTideData = async (stationId, timeZone = 'America/Los_Angeles') => {
  try {
    // Use specified timezone to ensure consistent date calculation regardless of server location
    const localTime = DateTime.now().setZone(timeZone);
    const beginDate = localTime.toISODate().split('-').join('');
    const endDate = localTime.plus({days: 1}).toISODate().split('-').join('');
    const tideURL = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${beginDate}&end_date=${endDate}&product=predictions&station=${stationId}&datum=MLLW&units=english&time_zone=lst_ldt&application=Web_Services&format=json`;
    const response = await fetch(tideURL);
    const json = await response.json();
    // TODO: Set up better error handling here, should never reach the next line if response is an error
    return json.predictions.map(
      (elem) => Object.assign(elem, { v: parseFloat(elem.v) }),
    );
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

export default fetchTideData;
