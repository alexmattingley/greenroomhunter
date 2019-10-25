const express = require('express');
const mapBuoyData = require('../api-data/noaa/buoys/parse-buoy-data.js');
const fetchTideData = require('../api-data/noaa/tides/fetch-tide-data.js');
const parseTideData = require('../api-data/noaa/tides/parse-tide-data.js');


const router = express.Router();


router.post('/', async (req, res) => {
  const { buoys, tideStation: { id } } = req.body;
  let tideData;
  let buoyData;
  try {
    buoyData = {
      success: true,
      data: await mapBuoyData(buoys),
    };
  } catch (error) {
    buoyData = {
      success: false,
      error: error.message,
      data: null,
    };
  }
  try {
    const rawTideData = await fetchTideData(id);
    tideData = {
      success: true,
      data: parseTideData(rawTideData),
    };
  } catch (error) {
    tideData = {
      success: false,
      error: error.message,
      data: null,
    };
  }
  res.send(
    {
      buoyData,
      tideData,
    },
  );
});

module.exports = router;
