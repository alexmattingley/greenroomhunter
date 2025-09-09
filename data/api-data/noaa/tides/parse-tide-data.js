import moment from 'moment';

function parseTideData(rawData) {
  let currentTide;
  let highAndLowTides = [];
  let findNextPoint;
  // Filter out any duplicates so we can calculate high and low tides
  const dataForChart = rawData.filter((elem, index, array) => {
    if (array[index + 1] && elem.v === array[index + 1].v) {
      return false;
    }
    return true;
  // Find high and lows of chart. Find the current tide
  }).map((elem, index, array) => {
    const tideValue = {...elem};
    const tideTimeUnix = moment(tideValue.t).unix();
    const currentTimeUnix = moment().unix();
    // Cursor agent, this is the line
    tideValue.t = moment(tideValue.t).format('MMM DD, LT');
    // Don't do anything if its the first or the last reading
    if (index !== 0 && index !== array.length - 1) {
      // True if value is low tide
      if (tideValue.v < array[index - 1].v && tideValue.v < array[index + 1].v) {
        const lowTide = Object.assign({}, tideValue, { point: 'Low' });
        highAndLowTides.push(lowTide);
        if (findNextPoint) {
          findNextPoint = false;
          currentTide.nextTide = {...lowTide}
        }
      }
      // True is if its high tide
      if (tideValue.v > array[index - 1].v && tideValue.v > array[index + 1].v) {
        const highTide = Object.assign({}, tideValue, { point: 'High' })
        highAndLowTides.push(highTide);
        if (findNextPoint) {
          findNextPoint = false;
          currentTide.nextTide = {...highTide}
        }
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
