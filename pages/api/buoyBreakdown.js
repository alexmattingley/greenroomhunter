/**
 * TODO: Finish function clean up and unit testing.
 * The original migration was done by Cursor directly from the python script
 * You still need to refactor:
 * - meanDegree
 * - band
 * - NdbcSpectra class (I don't like this archictecture style and want to refactor)
 * - processBuoyData
 * You also need to verify that we didn't lose any functionality from the original migration
 */
/**
 * Fetches most recent buoy spectra observation from NDBC
 * @param {string} buoy - The buoy ID
 * @param {string} dataType - Can be 'data_spec', 'swdir', or 'swdir2' for energy, mean wave direction, or primary wave direction respectively
 * @returns {Promise<string>} The data line from the buoy
 */

async function httpDataSpec(buoy, dataType = "data_spec") {
  const dataUrl = `http://www.ndbc.noaa.gov/data/realtime2/${buoy}.${dataType}`;

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const lines = data.split("\n");
    return lines[1]; // Return the second line (index 1)
  } catch (error) {
    console.error("Error fetching buoy data:", error);
    throw error;
  }
}

/**
 * Parses raw data dump into list of tuples for each frequency band
 * @param {string} rawData - Raw data from httpDataSpec
 * @returns {Array} Array of objects with energy, frequency, and bandwidth
 */
export function dataSpec(rawData) {
  const spectrumData = [];
  // Split in array by spaces
  const everyEntry = rawData.trim().split(" ");
  // Find the first frequency value index
  const firstParenentheses = everyEntry.findIndex((itm) => itm.includes("("));
  // Go back one index to find the first energy value index
  const startingIndex = firstParenentheses - 1;
  // Remove all data before the first energy value
  const cleanArray = everyEntry.slice(startingIndex);

  for (let i = 0; i < cleanArray.length; i = i + 2) {
    const energy = parseFloat(cleanArray[i]);
    const frequency = parseFloat(cleanArray[i + 1].replace(/[()]/g, ""));
    let bandwidth;
    // For the first element we want bandwidth to .005
    if (i === 0) {
      bandwidth = 0.005;
    } else {
      // In order to calculate the bandwidth, we need to find the difference between the current frequency the previous frequency
      bandwidth = frequency - spectrumData[spectrumData.length - 1].frequency;
      // Adjust the bandwidth where bandwidth transitions from .005 to .01 and .02
      if (
        0.0058 < Math.round(bandwidth * 1000) / 1000 &&
        Math.round(bandwidth * 1000) / 1000 < 0.008
      ) {
        bandwidth = 0.0075;
      } else if (
        0.012 < Math.round(bandwidth * 1000) / 1000 &&
        Math.round(bandwidth * 1000) / 1000 < 0.018
      ) {
        bandwidth = 0.015;
      }
    }
    spectrumData.push({
      energy,
      frequency,
      bandwidth,
    });
  }
  return spectrumData;
}

/**
 * Calculates mean degree from angles and energy values
 * @param {Array} directionAngles - Array of degrees for each frequency in the band
 * @param {Array} energyValues - Array of energy values corresponding to the angles
 * @returns {number|null} The mean of the frequency degrees, or null if no valid data
 */
function meanDegree(directionAngles, energyValues) {
  // Filter out invalid angles and low energy values, then convert to radians
  const validAnglesInRadians = [];
  for (let angleIndex = 0; angleIndex < directionAngles.length; angleIndex++) {
    if (
      directionAngles[angleIndex] !== 999 &&
      energyValues[angleIndex] > 0.005
    ) {
      validAnglesInRadians.push((directionAngles[angleIndex] * Math.PI) / 180); // Convert to radians
    }
  }

  if (validAnglesInRadians.length < 1) {
    return null;
  }

  let sineSum = 0;
  let cosineSum = 0;
  for (
    let angleIndex = 0;
    angleIndex < validAnglesInRadians.length;
    angleIndex++
  ) {
    sineSum += Math.sin(validAnglesInRadians[angleIndex]);
    cosineSum += Math.cos(validAnglesInRadians[angleIndex]);
  }

  const averageSine = sineSum / validAnglesInRadians.length;
  const averageCosine = cosineSum / validAnglesInRadians.length;
  let meanAngleInDegrees =
    (Math.atan(averageSine / averageCosine) * 180) / Math.PI; // Convert back to degrees

  if (averageCosine < 0) {
    meanAngleInDegrees += 180;
  } else if (averageSine < 0) {
    meanAngleInDegrees += 360;
  }

  return Math.round(meanAngleInDegrees * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculates energy and direction for a specific frequency band
 * @param {Array} spectrumData - Array of spectrum objects
 * @param {Array} frequencyFences - Tuple containing high and low frequency for band
 * @returns {Array} [energy, meanDirection]
 */
function band(spectrumData, frequencyFences) {
  const errorLog = [];
  const [lowFreqFence, highFreqFence] = frequencyFences;

  errorLog.push(
    `high / low freq fences: ${Math.round((1.0 / highFreqFence) * 10) / 10}(${
      Math.round(highFreqFence * 1000000) / 1000000
    }) ${Math.round((1.0 / lowFreqFence) * 10) / 10}(${
      Math.round(lowFreqFence * 1000000) / 1000000
    })`
  );

  const energyValues = spectrumData.map((spectrum) => spectrum.energy);
  const frequencyValues = spectrumData.map((spectrum) => spectrum.frequency);
  const bandwidthValues = spectrumData.map((spectrum) => spectrum.bandwidth);
  const directionValues = spectrumData.map(
    (spectrum) => spectrum.meanDirection
  );

  // Calculate high frequency end of band
  let highFreqIndex = 0;
  let highFreqPartialPercent;
  let highFreqEnd;

  if (highFreqFence === frequencyValues[frequencyValues.length - 1]) {
    // This is the shortest frequency so gonna use all of it
    highFreqPartialPercent = 1;
    highFreqIndex = frequencyValues.length - 1;
  } else {
    while (highFreqIndex < frequencyValues.length) {
      highFreqEnd =
        frequencyValues[highFreqIndex] + 0.5 * bandwidthValues[highFreqIndex]; // Get high frequency / low period end of frequency band
      if (Math.round(highFreqEnd * 1000) / 1000 > highFreqFence) {
        break;
      } else if (Math.round(highFreqEnd * 1000) / 1000 === highFreqFence) {
        highFreqIndex++;
        break; // highFreqIndex is index of last full band now
      }
      highFreqIndex++;
    }
    const highFreqPartial = Math.abs(highFreqEnd - highFreqFence); // partial is band of spectra between low end of freq band and the high freq side of the fence
    highFreqPartialPercent =
      1 - highFreqPartial / bandwidthValues[highFreqIndex]; // find how much of the partial band we are taking, then multiply the energy by it
  }

  const highFreqPartialEnergy =
    energyValues[highFreqIndex] * highFreqPartialPercent;
  const highFreqPartialEnergyBandwidth =
    highFreqPartialEnergy * bandwidthValues[highFreqIndex];
  errorLog.push(
    `high freq fenced frequency band ${
      Math.round((1.0 / frequencyValues[highFreqIndex]) * 10) / 10
    }(${Math.round(frequencyValues[highFreqIndex] * 10000) / 10000}) is ${
      Math.round(highFreqPartialPercent * 100 * 10) / 10
    }%`
  );

  // Calculate low frequency end of band
  let lowFreqIndex = 0;
  let lowFreqPartialPercent;
  let lowFreqBegin;

  if (lowFreqFence === 1.0 / 40) {
    lowFreqPartialPercent = 1;
  } else {
    while (lowFreqIndex < frequencyValues.length) {
      lowFreqBegin =
        frequencyValues[lowFreqIndex] + 0.5 * bandwidthValues[lowFreqIndex]; // Get low frequency / high period end of frequency band
      if (Math.round(lowFreqBegin * 1000) / 1000 > lowFreqFence) {
        break;
      } else if (Math.round(lowFreqBegin * 1000) / 1000 === lowFreqFence) {
        lowFreqIndex++;
        break; // lowFreqIndex is index of last full band now
      }
      lowFreqIndex++;
    }
    const lowFreqPartial = lowFreqBegin - lowFreqFence;
    lowFreqPartialPercent = Math.abs(
      lowFreqPartial / bandwidthValues[lowFreqIndex]
    );
  }

  const lowFreqPartialEnergy =
    energyValues[lowFreqIndex] * lowFreqPartialPercent;
  const lowFreqPartialEnergyBandwidth =
    lowFreqPartialEnergy * bandwidthValues[lowFreqIndex];
  errorLog.push(
    `low freq fenced frequency band ${
      Math.round((1.0 / frequencyValues[lowFreqIndex]) * 10) / 10
    } (${Math.round(frequencyValues[lowFreqIndex] * 10000) / 10000}) is ${
      Math.round(lowFreqPartialPercent * 100 * 10) / 10
    }%`
  );

  // Calculate middle bands energy
  const middleBandsEnergy = energyValues
    .slice(lowFreqIndex + 1, highFreqIndex)
    .reduce(
      (sum, energy, bandIndex) =>
        sum + energy * bandwidthValues[lowFreqIndex + 1 + bandIndex],
      0
    );
  const fullFrequencyBands = frequencyValues.slice(
    lowFreqIndex + 1,
    highFreqIndex
  );
  const fullBandsDescription = fullFrequencyBands
    .filter((frequency) => frequency > 0)
    .map(
      (frequency) =>
        `${Math.round((1.0 / frequency) * 10000) / 10000} (${
          Math.round(frequency * 10000) / 10000
        })`
    )
    .join("\n");
  errorLog.push(`middle, full frequency bands: \n${fullBandsDescription}`);

  const totalBandEnergy =
    (lowFreqPartialEnergyBandwidth +
      middleBandsEnergy +
      highFreqPartialEnergyBandwidth) *
    10000;

  // Calculate mean direction for this band
  const meanDirection = meanDegree(
    directionValues.slice(lowFreqIndex, highFreqIndex),
    energyValues.slice(lowFreqIndex, highFreqIndex)
  );
  errorLog.push(
    `mean direction: ${meanDirection}, # of values: ${
      directionValues.slice(lowFreqIndex, highFreqIndex).length
    }`
  );

  return [totalBandEnergy, meanDirection];
}

/**
 * Main class for processing NDBC buoy spectra data
 */
class NdbcSpectra {
  constructor(buoyId = "46232", options = {}) {
    this.buoyId = buoyId;
    this.nineBandHeights = [];
    this.nineBandEnergy = [];
    this.nineBandDirections = [];

    const units = options.units || "ft"; // default is to convert m to ft
    if (["m", "metric", "meters"].includes(units)) {
      this.unitConversionFactor = 1;
    } else {
      this.unitConversionFactor = 3.28;
    }
  }

  async initialize() {
    try {
      // Fetch data from NOAA
      this.rawEnergyData = await httpDataSpec(this.buoyId);
      this.rawPeakDirectionData = await httpDataSpec(this.buoyId, "swdir2");
      this.rawMeanDirectionData = await httpDataSpec(this.buoyId, "swdir");

      // Parse timestamp
      const timestampTokens = this.rawEnergyData.substring(0, 23).split(/\s+/);
      this.timestamp = new Date(
        Date.UTC(
          parseInt(timestampTokens[0]), // year
          parseInt(timestampTokens[1]) - 1, // month (0-indexed)
          parseInt(timestampTokens[2]), // day
          parseInt(timestampTokens[3]), // hour
          parseInt(timestampTokens[4]) // minute
        )
      );

      // Parse spectra data
      const energySpectrumData = dataSpec(this.rawEnergyData);
      const peakDirectionData = dataSpec(this.rawPeakDirectionData);
      const meanDirectionData = dataSpec(this.rawMeanDirectionData);

      this.spectra = [];
      for (
        let spectrumIndex = 0;
        spectrumIndex < energySpectrumData.length;
        spectrumIndex++
      ) {
        this.spectra.push({
          energy: energySpectrumData[spectrumIndex].energy,
          frequency: energySpectrumData[spectrumIndex].frequency,
          bandwidth: energySpectrumData[spectrumIndex].bandwidth,
          peakDirection:
            spectrumIndex < peakDirectionData.length
              ? Math.round(peakDirectionData[spectrumIndex].energy)
              : 999,
          meanDirection:
            spectrumIndex < meanDirectionData.length
              ? Math.round(meanDirectionData[spectrumIndex].energy)
              : 999,
        });
      }

      // Calculate significant wave height
      const totalEnergy = this.spectra.reduce(
        (sum, spectrum) => sum + spectrum.energy * spectrum.bandwidth,
        0
      );
      this.significantWaveHeight =
        this.unitConversionFactor * 4.01 * Math.sqrt(totalEnergy);
    } catch (error) {
      console.error("Error initializing NdbcSpectra:", error);
      throw error;
    }
  }

  /**
   * Returns all individual period bands with their heights and directions
   */
  allBands() {
    const allBandHeights = [];
    const allBandDirections = [];
    const allBandPeriods = [];

    for (const spectrum of this.spectra) {
      // Calculate height using the same formula as nineBand
      // Need to multiply by 10000 to match the scaling used in the band() function
      const energyTimesBandwidth = spectrum.energy * spectrum.bandwidth * 10000;
      const waveHeight =
        Math.round(
          2 *
            4 *
            this.unitConversionFactor *
            0.01 *
            Math.sqrt(energyTimesBandwidth) *
            100
        ) / 100;
      const wavePeriod = Math.round((1.0 / spectrum.frequency) * 10) / 10; // Round to 1 decimal place
      const waveDirection = spectrum.meanDirection; // Use mean direction

      allBandHeights.push(waveHeight);
      allBandDirections.push(waveDirection);
      allBandPeriods.push(wavePeriod);
    }

    return [allBandHeights, allBandDirections, allBandPeriods];
  }

  /**
   * Returns height, period, peak direction, and mean direction for each spectral band
   */
  heightPeriodDirections() {
    const result = [];

    for (const spectrum of this.spectra) {
      const height =
        this.unitConversionFactor *
        4 *
        2 *
        Math.sqrt(spectrum.energy * spectrum.bandwidth);
      const period = 1.0 / spectrum.frequency;
      result.push([
        height,
        period,
        spectrum.peakDirection,
        spectrum.meanDirection,
      ]);
    }

    return result;
  }

  /**
   * Returns wave heights in 9 bands of wave periods
   */
  nineBand() {
    const { spectra } = this;
    const oneSecond = 1.0;
    let endFrequencyBand = oneSecond / 2;
    if (spectra[spectra.length - 1].frequency < endFrequencyBand) {
      endFrequencyBand = spectra[spectra.length - 1].frequency;
    }
    const nineBandFrequencies = [
      oneSecond / 40,
      oneSecond / 22,
      oneSecond / 18,
      oneSecond / 16,
      oneSecond / 14,
      oneSecond / 12,
      oneSecond / 10,
      oneSecond / 8,
      oneSecond / 6,
      endFrequencyBand,
    ];

    this.nineBandEnergy = [];
    for (let bandIndex = 0; bandIndex < 9; bandIndex++) {
      this.nineBandEnergy.push(
        band(spectra, [
          nineBandFrequencies[bandIndex],
          nineBandFrequencies[bandIndex + 1],
        ])
      );
    }

    this.nineBandHeights = this.nineBandEnergy.map(
      (bandResult) =>
        Math.round(
          2 *
            4 *
            this.unitConversionFactor *
            0.01 *
            Math.sqrt(Math.floor(bandResult[0])) *
            100
        ) / 100
    );
    this.nineBandDirections = this.nineBandEnergy.map(
      (bandResult) => bandResult[1]
    );

    return [this.nineBandHeights, this.nineBandDirections];
  }

  /**
   * Returns JSON representation of the data
   */
  jsonify(dataType = "spectra") {
    const jsonResponse = {
      timestamp: this.timestamp
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
      buoyNumber: this.buoyId,
      disclaimer:
        "Data in this object has not been validated and should be considered a placeholder",
    };

    let jsonDataList = [];
    const decimalPlaces = 3;

    if (dataType === "spectra") {
      for (const spectrum of this.spectra) {
        const wavePeriod = 1.0 / spectrum.frequency;
        const spectrumData = {
          "energy density":
            Math.round(spectrum.energy * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
          frequency:
            Math.round(spectrum.frequency * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
          bandwidth:
            Math.round(spectrum.bandwidth * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
          period:
            Math.round(wavePeriod * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
          "peak direction":
            Math.round(spectrum.peakDirection * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
          "mean direction":
            Math.round(spectrum.meanDirection * Math.pow(10, decimalPlaces)) /
            Math.pow(10, decimalPlaces),
        };
        jsonDataList.push(spectrumData);
      }
    } else if (dataType === "nineBand") {
      const nineBandResults = this.nineBand();
      const [heights, directions] = nineBandResults;
      const periodKeys = ["22+", "20", "17", "15", "13", "11", "9", "7", "4"];

      // Create an array of objects with period, height, and direction
      const bandData = periodKeys.map((period, index) => ({
        period: period,
        height: heights[index],
        direction: directions[index],
      }));

      // Return as array instead of object for consistency
      jsonDataList = bandData;
    } else if (dataType === "allBands") {
      const allBandsResults = this.allBands();
      const [heights, directions, periods] = allBandsResults;

      // Create an array of objects with period, height, and direction
      const bandData = periods.map((period, index) => ({
        period: period,
        height: heights[index],
        direction: directions[index],
      }));

      // Sort by period in descending order (highest periods first)
      bandData.sort((a, b) => b.period - a.period);

      // Return as array instead of object to maintain proper ordering
      jsonDataList = bandData;
    } else if (dataType === "hp") {
      const hpResults = this.heightPeriodDirections();

      // Create an object with period as keys and height/directions as values
      jsonDataList = {};
      for (const [height, period, peakDirection, meanDirection] of hpResults) {
        const roundedPeriod = Math.round(period * 1000) / 1000; // Round to 3 decimal places
        jsonDataList[roundedPeriod] = {
          height: Math.round(height * 1000) / 1000, // Round to 3 decimal places
          "peak direction": Math.round(peakDirection),
          "mean direction": Math.round(meanDirection),
        };
      }
    }

    jsonResponse[dataType] = jsonDataList;
    return JSON.stringify(jsonResponse);
  }
}

/**
 * Main function to process buoy data
 */
async function processBuoyData(
  buoyId,
  outputDataType = "allBands",
  measurementUnits = "ft"
) {
  try {
    const buoySpectra = new NdbcSpectra(buoyId, {
      units: measurementUnits,
    });
    await buoySpectra.initialize();

    if (outputDataType === "spectra") {
      return buoySpectra.jsonify("spectra");
    } else if (outputDataType === "nineBand") {
      return buoySpectra.jsonify("nineBand");
    } else if (outputDataType === "allBands") {
      return buoySpectra.jsonify("allBands");
    } else if (outputDataType === "hp") {
      return buoySpectra.jsonify("hp");
    }

    return buoySpectra.jsonify("allBands"); // default
  } catch (error) {
    console.error("Error processing buoy data:", error);
    throw error;
  }
}

// Export for use in API handler and tests
export { processBuoyData, NdbcSpectra, httpDataSpec };

// API handler for Next.js
export default async function handler(request, response) {
  const { buoyNumber, dataType = "allBands", units = "ft" } = request.body;

  try {
    const jsonData = await processBuoyData(buoyNumber, dataType, units);
    const parsedData = JSON.parse(jsonData);
    return response.status(200).json(parsedData);
  } catch (error) {
    console.error("API Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
