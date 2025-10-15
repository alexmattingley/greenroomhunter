// pages/api/buoyBreakDown.js
// Converted from Python buoyBreakDown.py

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
 * @param {string} datas - Raw data from httpDataSpec
 * @returns {Array} Array of objects with energy, frequency, and bandwidth
 */
function dataSpec(datas) {
  const errlog = [];
  const l = [];

  // Semi-hacky way of determining if data is energy or direction
  let dstart;
  if (datas.indexOf("(") > 23) {
    dstart = 23;
  } else {
    dstart = 16;
  }

  const dataParts = datas.substring(dstart).split(") ");
  let i = 0;

  while (i < dataParts.length) {
    if (dataParts[i]) {
      const t = dataParts[i].split(/\s+/);
      const e = parseFloat(t[0]);
      const f = parseFloat(t[1].replace(/[()]/g, ""));

      let b;
      if (i === 0) {
        b = 0.005;
      } else {
        b = f - l[i - 1].f;
        // Adjust the bandwidth where bandwidth transitions from .005 to .01 and .02
        if (
          0.0058 < Math.round(b * 1000) / 1000 &&
          Math.round(b * 1000) / 1000 < 0.008
        ) {
          b = 0.0075;
        } else if (
          0.012 < Math.round(b * 1000) / 1000 &&
          Math.round(b * 1000) / 1000 < 0.018
        ) {
          b = 0.015;
        }
        errlog.push(b);
      }

      l.push({ e, f, b });
    }
    i++;
  }

  return l;
}

/**
 * Calculates mean degree from angles and energy values
 * @param {Array} angles - Array of degrees for each frequency in the band
 * @param {Array} e - Array of energy values corresponding to the angles
 * @returns {number|null} The mean of the frequency degrees, or null if no valid data
 */
function meanDegree(angles, e) {
  // Filter out invalid angles and low energy values, then convert to radians
  const validAngles = [];
  for (let i = 0; i < angles.length; i++) {
    if (angles[i] !== 999 && e[i] > 0.005) {
      validAngles.push((angles[i] * Math.PI) / 180); // Convert to radians
    }
  }

  if (validAngles.length < 1) {
    return null;
  }

  let s = 0,
    c = 0;
  for (let i = 0; i < validAngles.length; i++) {
    s += Math.sin(validAngles[i]);
    c += Math.cos(validAngles[i]);
  }

  const sbar = s / validAngles.length;
  const cbar = c / validAngles.length;
  let abar = (Math.atan(sbar / cbar) * 180) / Math.PI; // Convert back to degrees

  if (cbar < 0) {
    abar += 180;
  } else if (sbar < 0) {
    abar += 360;
  }

  return Math.round(abar * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculates energy and direction for a specific frequency band
 * @param {Array} spec - Array of spectrum objects
 * @param {Array} fences - Tuple containing high and low frequency for band
 * @returns {Array} [energy, meanDirection]
 */
function band(spec, fences) {
  const errlog = [];
  errlog.push(
    `high / low freq fences: ${Math.round((1.0 / fences[1]) * 10) / 10}(${
      Math.round(fences[1] * 1000000) / 1000000
    }) ${Math.round((1.0 / fences[0]) * 10) / 10}(${
      Math.round(fences[0] * 1000000) / 1000000
    })`
  );

  const e = spec.map((s) => s.e);
  const f = spec.map((s) => s.f);
  const b = spec.map((s) => s.b);
  const d = spec.map((s) => s.md);

  let i = 0;
  let partial1percent;
  let fend;

  if (fences[1] === f[f.length - 1]) {
    // This is the shortest frequency so gonna use all of it
    partial1percent = 1;
    i = f.length - 1;
  } else {
    while (i < f.length) {
      fend = f[i] + 0.5 * b[i]; // Get high frequency / low period end of frequency band
      if (Math.round(fend * 1000) / 1000 > fences[1]) {
        break;
      } else if (Math.round(fend * 1000) / 1000 === fences[1]) {
        i++;
        break; // i is index of last full band now
      }
      i++;
    }
    const partial1 = Math.abs(fend - fences[1]); // partial1 is band of spectra between low end of freq band and the high freq side of the fence
    partial1percent = 1 - partial1 / b[i]; // find how much of the partial band we are taking, then multiply the energy by it
  }

  const partial1e = e[i] * partial1percent;
  const partial1eb = partial1e * b[i];
  errlog.push(
    `high freq fenced frequency band ${Math.round((1.0 / f[i]) * 10) / 10}(${
      Math.round(f[i] * 10000) / 10000
    }) is ${Math.round(partial1percent * 100 * 10) / 10}%`
  );

  // Same as above for opposite end of fence
  let j = 0;
  let partial2percent;
  let fbegin;

  if (fences[0] === 1.0 / 40) {
    partial2percent = 1;
  } else {
    while (j < f.length) {
      fbegin = f[j] + 0.5 * b[j]; // Get low frequency / high period end of frequency band
      if (Math.round(fbegin * 1000) / 1000 > fences[0]) {
        break;
      } else if (Math.round(fbegin * 1000) / 1000 === fences[0]) {
        j++;
        break; // j is index of last full band now
      }
      j++;
    }
    const partial2 = fbegin - fences[0];
    partial2percent = Math.abs(partial2 / b[j]);
  }

  const partial2e = e[j] * partial2percent;
  const partial2eb = partial2e * b[j];
  errlog.push(
    `low freq fenced frequency band ${Math.round((1.0 / f[j]) * 10) / 10} (${
      Math.round(f[j] * 10000) / 10000
    }) is ${Math.round(partial2percent * 100 * 10) / 10}%`
  );

  const mide = e
    .slice(j + 1, i)
    .reduce((sum, energy, k) => sum + energy * b[j + 1 + k], 0);
  const fullBands = f.slice(j + 1, i);
  const printFullBands = fullBands
    .filter((fb) => fb > 0)
    .map(
      (fb) =>
        `${Math.round((1.0 / fb) * 10000) / 10000} (${
          Math.round(fb * 10000) / 10000
        })`
    )
    .join("\n");
  errlog.push(`middle, full frequency bands: \n${printFullBands}`);

  const bande = (partial2eb + mide + partial1eb) * 10000;

  // Provisional direction data
  const meanDirection = meanDegree(d.slice(j, i), e.slice(j, i));
  errlog.push(
    `mean direction: ${meanDirection}, # of values: ${d.slice(j, i).length}`
  );

  return [bande, meanDirection];
}

/**
 * Main class for processing NDBC buoy spectra data
 */
class NdbcSpectra {
  constructor(buoy = "46232", datasource = "http", e = [], options = {}) {
    this.buoy = buoy;
    this.nineHeights = [];
    this.nineEnergy = [];
    this.nineDirections = [];

    const units = options.units || "ft"; // default is to convert m to ft
    if (["m", "metric", "meters"].includes(units)) {
      this.units = 1;
    } else {
      this.units = 3.28;
    }
  }

  async initialize() {
    try {
      // Fetch data from NOAA
      this.data = await httpDataSpec(this.buoy);
      this.dataPDirection = await httpDataSpec(this.buoy, "swdir2");
      this.dataMDirection = await httpDataSpec(this.buoy, "swdir");

      // Parse timestamp
      const td = this.data.substring(0, 23).split(/\s+/);
      this.timestamp = new Date(
        Date.UTC(
          parseInt(td[0]), // year
          parseInt(td[1]) - 1, // month (0-indexed)
          parseInt(td[2]), // day
          parseInt(td[3]), // hour
          parseInt(td[4]) // minute
        )
      );

      // Parse spectra data
      const ds = dataSpec(this.data);
      const pd_data = dataSpec(this.dataPDirection);
      const md_data = dataSpec(this.dataMDirection);

      this.spectra = [];
      for (let i = 0; i < ds.length; i++) {
        this.spectra.push({
          e: ds[i].e, // energy
          f: ds[i].f, // frequency
          b: ds[i].b, // bandwidth
          pd: i < pd_data.length ? Math.round(pd_data[i].e) : 999, // peak direction
          md: i < md_data.length ? Math.round(md_data[i].e) : 999, // mean direction
        });
      }

      // Calculate significant wave height
      const total_energy = this.spectra.reduce(
        (sum, spectrum) => sum + spectrum.e * spectrum.b,
        0
      );
      this.Hs = this.units * 4.01 * Math.sqrt(total_energy);
    } catch (error) {
      console.error("Error initializing NdbcSpectra:", error);
      throw error;
    }
  }

  /**
   * Returns all individual period bands with their heights and directions
   */
  allBands() {
    const allHeights = [];
    const allDirections = [];
    const allPeriods = [];

    for (const spectrum of this.spectra) {
      // Calculate height using the same formula as nineBand
      // Need to multiply by 10000 to match the scaling used in the band() function
      const energy_times_bandwidth = spectrum.e * spectrum.b * 10000;
      const height =
        Math.round(
          2 * 4 * this.units * 0.01 * Math.sqrt(energy_times_bandwidth) * 100
        ) / 100;
      const period = Math.round((1.0 / spectrum.f) * 10) / 10; // Round to 1 decimal place
      const direction = spectrum.md; // Use mean direction

      allHeights.push(height);
      allDirections.push(direction);
      allPeriods.push(period);
    }

    return [allHeights, allDirections, allPeriods];
  }

  /**
   * Returns wave heights in 9 bands of wave periods
   */
  nineBand() {
    const { spectra } = this;
    const o = 1.0;
    let endBand = o / 2;
    if (spectra[spectra.length - 1].f < endBand) {
      endBand = spectra[spectra.length - 1].f;
    }
    const nineBands = [
      o / 40,
      o / 22,
      o / 18,
      o / 16,
      o / 14,
      o / 12,
      o / 10,
      o / 8,
      o / 6,
      endBand,
    ];

    this.nineEnergy = [];
    for (let fence = 0; fence < 9; fence++) {
      this.nineEnergy.push(
        band(spectra, [nineBands[fence], nineBands[fence + 1]])
      );
    }

    this.nineHeights = this.nineEnergy.map(
      (v) =>
        Math.round(
          2 * 4 * this.units * 0.01 * Math.sqrt(Math.floor(v[0])) * 100
        ) / 100
    );
    this.nineDirections = this.nineEnergy.map((v) => v[1]);

    return [this.nineHeights, this.nineDirections];
  }

  /**
   * Returns JSON representation of the data
   */
  jsonify(dataType = "spectra") {
    const js = {
      timestamp: this.timestamp
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
      buoyNumber: this.buoy,
      disclaimer:
        "Data in this object has not been validated and should be considered a placeholder",
    };

    let jsList = [];
    const digits = 3;

    if (dataType === "spectra") {
      const keys = [
        "energy density",
        "frequency",
        "bandwidth",
        "period",
        "peak direction",
        "mean direction",
      ];
      for (const spectrum of this.spectra) {
        const period = 1.0 / spectrum.f;
        const dip = {
          "energy density":
            Math.round(spectrum.e * Math.pow(10, digits)) /
            Math.pow(10, digits),
          frequency:
            Math.round(spectrum.f * Math.pow(10, digits)) /
            Math.pow(10, digits),
          bandwidth:
            Math.round(spectrum.b * Math.pow(10, digits)) /
            Math.pow(10, digits),
          period:
            Math.round(period * Math.pow(10, digits)) / Math.pow(10, digits),
          "peak direction":
            Math.round(spectrum.pd * Math.pow(10, digits)) /
            Math.pow(10, digits),
          "mean direction":
            Math.round(spectrum.md * Math.pow(10, digits)) /
            Math.pow(10, digits),
        };
        jsList.push(dip);
      }
    } else if (dataType === "nineBand") {
      const b = this.nineBand();
      const keys = ["22+", "20", "17", "15", "13", "11", "9", "7", "4"];
      jsList = {};
      for (let i = 0; i < keys.length; i++) {
        const [heights, directions] = b;
        jsList[keys[i]] = {
          height: heights[i],
          direction: directions[i],
        };
      }
    } else if (dataType === "allBands") {
      const b = this.allBands();
      // Create keys from periods (e.g., "22.0", "20.5", etc.)
      const keys = b[2].map((p) => p.toString()); // b[2] contains the periods
      jsList = {};
      for (let i = 0; i < keys.length; i++) {
        const [heights, directions] = b;
        jsList[keys[i]] = {
          height: heights[i],
          direction: directions[i],
        };
      }
    }

    js[dataType] = jsList;
    return JSON.stringify(js);
  }
}

/**
 * Main function to process buoy data
 */
async function processBuoyData(
  buoyNumber,
  dataType = "allBands",
  units = "ft"
) {
  try {
    const bs = new NdbcSpectra(buoyNumber, "http", [], { units });
    await bs.initialize();

    if (dataType === "spectra") {
      return bs.jsonify("spectra");
    } else if (dataType === "nineBand") {
      return bs.jsonify("nineBand");
    } else if (dataType === "allBands") {
      return bs.jsonify("allBands");
    }

    return bs.jsonify("allBands"); // default
  } catch (error) {
    console.error("Error processing buoy data:", error);
    throw error;
  }
}

// Export for use in API handler
export { processBuoyData, NdbcSpectra };

// API handler for Next.js
export default async function handler(req, res) {
  const { buoyNumber, dataType = "allBands", units = "ft" } = req.body;

  try {
    const data = await processBuoyData(buoyNumber, dataType, units);
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
