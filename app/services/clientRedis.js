require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { createClient } = require('@redis/client');
const logger = require('./logger');

// Crée une nouvelle instance du client Redis
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Ajout d'un gestionnaire d'erreur
redisClient.on('error', (err) => logger.warn('Redis Client Error', err));

module.exports = redisClient;
