import fetch from "node-fetch";

const getInvidBuoyData = async (buoyNum) => {
  try {
    const response = await fetch(
      `https://www.ndbc.noaa.gov/data/realtime2/${buoyNum}.txt`
    );
    const json = await response.text();
    // If the format is html, a side carrot will be the first character
    // There might be a better way to do this.
    if (json[0] === "<") {
      throw new Error(json);
    }
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export default getInvidBuoyData;
