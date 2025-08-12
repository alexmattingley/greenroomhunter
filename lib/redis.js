// lib/redis.js
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
// e.g. REDIS_URL="redis://default:password@your-redis-host:6379"

export default redis;
