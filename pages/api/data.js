import mapBuoyData from 'data/api-data/noaa/buoys/parse-buoy-data';
import redis from '../../lib/redis';
import fetchTideData from 'data/api-data/noaa/tides/fetch-tide-data';
import parseTideData from 'data/api-data/noaa/tides/parse-tide-data';

export default async function handler(req, res) {
  const buoyReqInfo = req.body.buoys;
  const tideStationId = req.body.tideStationId;
  let buoyData;
  let tideData;

  const cached = await redis.get('locationData');
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  try {
    buoyData = {
      success: true,
      data: await mapBuoyData(buoyReqInfo)
    };
  } catch (error) {
    buoyData = {
      success: false,
      error: error.message,
      data: null,
    };
  }
  try {
    const rawTideData = await fetchTideData(tideStationId);
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

  const data = {
    buoyData, tideData
  }
  await redis.set('locationData', JSON.stringify(data), 'EX', 3600);

  res.status(200).json(data);
}