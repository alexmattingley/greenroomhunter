const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();


const getInvidBuoyData = async (buoyNum) => {
  try {
    const response = await fetch(`https://www.ndbc.noaa.gov/data/realtime2/${buoyNum}.txt`);
    const json = await response.text();
    return json;
  } catch (error) {
    console.log(error);
  }
};

function parseBuoyData(str) {
  JSON.parse(str);
}


async function mapBuoys(buoys) {
  const buoyData = buoys.map(async (itm) => {
    const rawData = await getInvidBuoyData(itm);
    return rawData;
    // const indivBuoyData = parseBuoyData(rawData);
  });
  return Promise.all(buoyData);
}

router.post('/', async (req, res) => {
  // req.body is the params that you can access
  // https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=DP01,DP05,DP10,DSND,DSNW,DT00,DT32,DX32,DX70,DX90,SNOW,PRCP&stations=ASN00084027&startDate=1952-01-01&endDate=1970-12-31&includeAttributes=true&format=json
  const { buoys } = req.body;
  const buoyData = await mapBuoys(buoys);
  res.send(buoyData);
});

module.exports = router;
