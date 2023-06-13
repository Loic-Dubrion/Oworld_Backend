require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { createClient } = require('@redis/client');
const logger = require('./logger');

// Creates a new instance of the Redis client
const redisClient = createClient();

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error: ', err);
  logger.warn('Redis Client Error', err);
});

module.exports = redisClient;
