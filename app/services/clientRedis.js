const logger = require('./logger');
const { createClient } = require('@redis/client');

// Crée une nouvelle instance du client Redis
const redisClient = createClient({
  host: 'localhost',
  port: 6379,
  password: 'bouleau',
});

// Ajoute un gestionnaire d'erreur pour intercepter toute erreur émise par le client Redis
redisClient.on('error', (err) => logger.warn('Redis Client Error', err));

// Exporte l'instance du client Redis
module.exports = redisClient;
