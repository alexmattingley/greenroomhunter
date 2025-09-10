import { DateTime } from 'luxon';

function parseTideData(rawData, timeZone = 'America/Los_Angeles') {
  let currentTide;
  let highAndLowTides = [];
  let findNextPoint;
  
  // Validate that we have data to parse
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    throw new Error('No tide data available to parse');
  }
  
  // Filter out any duplicates so we can calculate high and low tides
  const dataForChart = rawData.filter((elem, index, array) => {
    if (array[index + 1] && elem.v === array[index + 1].v) {
      return false;
    }
    return true;
  // Find high and lows of chart. Find the current tide
  }).map((elem, index, array) => {
    const tideValue = {...elem};
    // NOAA API returns timestamps in format like "2023-12-15 14:30:00" (SQL format)
    // and they're in local time (lst_ldt) which should match the specified timezone
    const tideTime = DateTime.fromSQL(tideValue.t, { zone: timeZone });
    
    // If the time format is not recognized, throw an error
    if (!tideTime.isValid) {
      throw new Error(`Unable to parse tide timestamp: "${tideValue.t}" at index ${index}. Expected format: YYYY-MM-DD HH:mm:ss`);
    }
    
    const currentTime = DateTime.now().setZone(timeZone);
    const tideTimeUnix = tideTime.toSeconds();
    const currentTimeUnix = currentTime.toSeconds();
    tideValue.t = tideTime.toFormat('MMM dd, h:mm a');
    // Don't do anything if its the first or the last reading
    if (index !== 0 && index !== array.length - 1) {
      // True if value is low tide
      if (tideValue.v < array[index - 1].v && tideValue.v < array[index + 1].v) {
        let lowTide = Object.assign({}, tideValue, { point: 'Low' });
        if (findNextPoint) {
          findNextPoint = false;
          lowTide = {...lowTide, nextTide: true };
          currentTide.nextTide = {...lowTide}
        }
        highAndLowTides.push(lowTide);
      }
      // True is if its high tide
      if (tideValue.v > array[index - 1].v && tideValue.v > array[index + 1].v) {
        let highTide = Object.assign({}, tideValue, { point: 'High' })
        
        if (findNextPoint) {
          findNextPoint = false;
          highTide = { ...highTide, nextTide: true };
          currentTide.nextTide = {...highTide}
        }
        highAndLowTides.push(highTide);
      }
    }
  
    if (tideTimeUnix - currentTimeUnix >= 0 && !currentTide) {
      const tideDirection = tideValue.v > array[index + 1].v ? "dropping" : "rising";
      findNextPoint = true;
      currentTide = Object.assign({}, tideValue, { tideDirection });
    }
    return tideValue;
  });
  return {
    dataForChart,
    highAndLowTides,
    currentTide,
  };
}

export default parseTideData;
