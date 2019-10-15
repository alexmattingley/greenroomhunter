function parseTideData(rawData) {
  const parsedData = rawData.predictions.map((elem, index, array) => {
    // only calculate high or low if its not the first or last value in the array
    if (index !== 0 && index !== array.length - 1) {
      // True if value is high tide
      if (elem.v < array[index - 1].v && elem.v < array[index + 1].v) {
        return Object.assign(elem, { point: 'high' });
      }
      // True is if its low tide
      if (elem.v > array[index - 1].v && elem.v > array[index + 1].v) {
        return Object.assign(elem, { point: 'low' });
      }
    }
    return elem;
  });
  return parsedData;
}

module.exports = parseTideData;
