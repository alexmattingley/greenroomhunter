const fetch = require('node-fetch');

const getInvidBuoyData = async (buoyNum) => {
  try {
    const response = await fetch(`https://www.ndbc.noaa.gov/data/realtime2/${buoyNum}.txt`);
    const json = await response.text();
    return json;
  } catch (error) {
    return error;
  }
};

module.exports = getInvidBuoyData;
