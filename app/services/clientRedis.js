require('dotenv').config();

const logger = require('./logger');
const { createClient } = require('@redis/client');

// Crée une nouvelle instance du client Redis
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Ajoute un gestionnaire d'erreur pour intercepter toute erreur émise par le client Redis
redisClient.on('error', (err) => logger.warn('Redis Client Error', err));

// Exporte l'instance du client Redis
module.exports = redisClient;
