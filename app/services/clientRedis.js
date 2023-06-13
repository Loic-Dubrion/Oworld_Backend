require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { createClient } = require('@redis/client');
const redis = require('redis');
const logger = require('./logger');

// Creates a new instance of the Redis client
const client = redis.createClient({
  socket: {
    host: '<hostname>',
    port: '<port>',
  },
  username: '<username>',
  password: '<password>',
});

client.on('error', (err) => console.log('Redis Server Error', err));

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.log('Redis Client Error: ', err);
  logger.warn('Redis Client Error', err);
});

module.exports = client;
