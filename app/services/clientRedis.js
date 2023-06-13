require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { createClient } = require('@redis/client');
const logger = require('./logger');

// Creates a new instance of the Redis client
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Handler error
redisClient.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redisClient;
