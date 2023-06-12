const Error503 = require('../../errors/Error503');
const redisClient = require('../../services/clientRedis');

/**
 * Objet contenant les fonctions pour récupérer les données des pays depuis l'API RestCountries.
 */
const countryApi = {
  /**
   * Récupère les données d'un pays en utilisant le code ISO.
   * @param {string} isoCode - Code ISO du pays (ex: FRA)
   * @returns {Promise<Object|null>} - Les données du pays ou null en cas d'erreur.
   */
  fetchCountryData: async (isoCode) => {
    await redisClient.connect();
    const cacheKey = `restCountry:${isoCode}`;

    const cacheValue = await redisClient.get(cacheKey);

    if (cacheValue) {
      await redisClient.quit();
      return JSON.parse(cacheValue);
    }

    const baseUrl = 'https://restcountries.com/v3.1/';

    const param = {
      service: 'alpha',
      value: isoCode,
      fields: [
        'name',
        'currencies',
        'capital',
        'subregion',
        'region',
        'languages',
        'flags',
        'coatOfArms',
        'area',
        'maps',
        'population',
        'car',
        'timezone',
        'continent',
      ],
    };

    const url = `${baseUrl}/${param.service}/${param.value}?fields=${param.fields}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
      }
      const data = await response.json();

      await redisClient.set(cacheKey, JSON.stringify(data));
      redisClient.expire(cacheKey, process.env.REDIS_TTL);
      await redisClient.quit();

      return data;
    } catch (error) {
      return null;
    }
  },

  /**
   * Récupère les données de tous les pays.
   * @returns {Promise<Object|null>} - Les données de tous les pays ou null en cas d'erreur.
   */
  fetchAllCountries: async () => {
    await redisClient.connect();
    const cacheKey = 'restCountry';

    const cacheValue = await redisClient.get(cacheKey);

    if (cacheValue) {
      await redisClient.quit();
      return JSON.parse(cacheValue);
    }

    const baseUrl = 'https://restcountries.com/v3.1/';

    const param = {
      service: 'all',
      fields: ['flags', 'cca3'],
    };

    const url = `${baseUrl}/${param.service}?fields=${param.fields}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
      }
      const data = await response.json();

      await redisClient.set(cacheKey, JSON.stringify(data));
      redisClient.expire(cacheKey, process.env.REDIS_TTL);
      await redisClient.quit();

      return data;
    } catch (error) {
      return null;
    }
  },
};

// Exporter les fonctions mémoïsées plutôt que les originales
module.exports = countryApi;
