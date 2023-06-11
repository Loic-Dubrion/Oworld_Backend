const logger = require('../services/logger');

// Importation du client Redis depuis le fichier clientRedis.js
const redisClient = require('../services/clientRedis');

async function testRedis() {
  // Connexion au client Redis
  await redisClient.connect();
  console.log('Connected to Redis');

  // Une variable pour générer une clef (plus tard mon req.param)
  const iso2 = 'NL';
  const cacheKey = `celebrity:${iso2}`;

  // Vérifier si les données sont déjà en cache
  // Dans redis get pour la lecture
  const cacheValue = await redisClient.get(cacheKey);

  // test si j'ai une valeur
  if (cacheValue) {
    // Si oui, je récupère le cache
    console.log('cache Value:', JSON.parse(cacheValue));
    await redisClient.quit();
  } else {
    // Si non, je déclenche ma requête
    console.log(`Not cache Value: ${cacheKey}`);
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/celebrity?nationality=${iso2}`, {
        headers: {
          'X-Api-Key': 'LBuPMzuZ+Tv29IU9UUkd5g==FoQKpOaRaopey9eV',
        },
      });

      if (!response.ok) {
        // si problème api je capture une erreur
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data[0]);
      // Je mets dans le cache pendant 10 minutes
      // Redis: set pour insérer une données et setex pour ajouter avec un ttl
      // ATENTION SETEX n'est pas pris en charge par la bibliothèque redis
      // Il faut passer l'argument 'EX' pour enregistrer le TTL
      await redisClient.set(cacheKey, JSON.stringify(data[1]), 'EX', 600);
      await redisClient.quit();
    } catch (error) {
      logger.error('Request failed:', error);
    }
  }
}

// Test dans la console
// redis-cli
// auth password
// get cacheKey
// TTL cacheKey (-2 la clé n'existe pas, -1 la clé existe et son TTL n'est pas expiré)

testRedis();
