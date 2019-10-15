const express = require('express');
const mapBuoyData = require('../api-data/noaa/parse-buoy-data.js');
const fetchTideData = require('../api-data/noaa/fetch-tide-data.js');
const parseTideData = require('../api-data/noaa/parse-tide-data.js');


const router = express.Router();


router.post('/', async (req, res) => {
  const { buoys, tideStation: { id } } = req.body;
  const buoyData = await mapBuoyData(buoys);
  const rawTideData = await fetchTideData(id);
  const tideData = parseTideData(rawTideData);
  res.send(
    {
      buoyData,
      tideData,
    },
  );
});

module.exports = router;
