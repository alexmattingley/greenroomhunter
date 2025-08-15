import mapBuoyData from 'data/api-data/noaa/buoys/parse-buoy-data';
import fetchTideData from 'data/api-data/noaa/tides/fetch-tide-data';
import parseTideData from 'data/api-data/noaa/tides/parse-tide-data';
import redis from '../../lib/redis';

export default async function handler(req, res) {
  const buoyReqInfo = req.body.buoys;
  const { tideStationId, location } = req.body;
  let buoyData;
  let tideData;

  // Create a unique cache key based on the request parameters
  const cacheKey = `locationData:${location}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('Recent data in redis cache, return cached data');
    return res.status(200).json(JSON.parse(cached));
  }

  try {
    buoyData = {
      success: true,
      data: await mapBuoyData(buoyReqInfo),
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
    buoyData, tideData,
  };
  await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
  res.status(200).json(data);
}
