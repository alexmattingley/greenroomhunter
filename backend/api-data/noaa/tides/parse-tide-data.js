const moment = require('moment');

function parseTideData(rawData) {
  // Filter out any duplicates so we can calculate high and low tides
  const parsedData = rawData.filter((elem, index, array) => {
    if (array[index + 1] && elem.v === array[index + 1].v) {
      return false;
    }
    return true;
  // Find high and lows of chart
  }).map((elem, index, array) => {
    const tideValue = elem;
    tideValue.t = moment(tideValue.t).format('MMM DD, LT');
    // Don't do anything if its the first or the last reading
    if (index !== 0 && index !== array.length - 1) {
      // True if value is high tide
      if (tideValue.v < array[index - 1].v && tideValue.v < array[index + 1].v) {
        return Object.assign(tideValue, { point: 'Low' });
      }
      // True is if its low tide
      if (tideValue.v > array[index - 1].v && tideValue.v > array[index + 1].v) {
        return Object.assign(tideValue, { point: 'High' });
      }
    }
    return tideValue;
  });
  return parsedData;
}

module.exports = parseTideData;
