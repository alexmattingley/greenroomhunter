const express = require('express');
const mapBuoyData = require('../api-data/noaa/parse-buoy-data.js');


const router = express.Router();


router.post('/', async (req, res) => {
  const { buoys } = req.body;
  const buoyData = await mapBuoyData(buoys);
  res.send(
    {
      buoyData,
    },
  );
});

module.exports = router;
