require('dotenv').config();

const redis = require('redis');
const logger = require('./logger');

/**
 * Create a new instance of the Redis client with the specified configurations.
 */
const client = redis.createClient({
  socket: {
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
  },
  username: process.env.REDISUSER,
  password: process.env.REDISPASSWORD,
});

client.on('connect', () => {
  logger.info('Connected to Redis');
});

client.on('error', (err) => {
  logger.warn('Redis Client Error', err);
});

client.on('end', () => {
  logger.info('Redis Client Connection Closed');
});

module.exports = client;
