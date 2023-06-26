require('dotenv').config();

const axios = require('axios');
const { Error503 } = require('../../errors');
const redisClient = require('../../services/clientDB/clientRedis');

const countryApi = {
  /**
   * Retrieves data for a country using the ISO code.
   * @param {string} isoCode - ISO country code (e.g. FRA)
   * @returns {Promise<Object|null>} - Country data or null in case of error.
   */
  fetchCountryData: async (isoCode) => {
    // redis caching
    await redisClient.connect();
    const cacheKey = `restCountry:${isoCode}`;
    const cacheValue = await redisClient.get(cacheKey);
    // If cached data, I return them
    if (cacheValue) {
      await redisClient.quit();
      return JSON.parse(cacheValue);
    }

    // query construction
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
      const response = await axios.get(url);

      // Caching with Redis
      await redisClient.set(cacheKey, JSON.stringify(response.data));
      redisClient.expire(cacheKey, process.env.REDIS_TTL);
      await redisClient.quit();

      return response.data;
    } catch (error) {
      if (redisClient) await redisClient.quit();
      throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
    }
  },

  /**
   * Retrieves flags and isoCode from all countries.
   * @returns {Promise<Object|null>} - Data for all countries or null in the event of an error.
   */
  fetchAllCountries: async () => {
    // Redis caching
    await redisClient.connect();
    const cacheKey = 'restCountry';
    const cacheValue = await redisClient.get(cacheKey);

    if (cacheValue) {
      await redisClient.quit();
      return JSON.parse(cacheValue);
    }

    // Query construction
    const baseUrl = 'https://restcountries.com/v3.1/';

    const param = {
      service: 'all',
      fields: ['flags', 'cca3'],
    };

    const url = `${baseUrl}/${param.service}?fields=${param.fields}`;
    try {
      const response = await axios.get(url);

      // Caching with Redis
      await redisClient.set(cacheKey, JSON.stringify(response.data));
      redisClient.expire(cacheKey, process.env.REDIS_TTL);
      await redisClient.quit();

      return response.data;
    } catch (error) {
      if (redisClient) await redisClient.quit();
      throw new Error503('Service Unavailable - API REST COUNTRY');
    }
  },
};

module.exports = countryApi;
