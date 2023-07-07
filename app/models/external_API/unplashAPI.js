const { createApi } = require('unsplash-js');
// eslint-disable-next-line no-unused-vars
require('dotenv').config();

const redisClient = require('../../services/clientDB/clientRedis');

/**
* Fetches Unsplash pictures for a given country.
* @param {string} country - Country name.
* @returns {Promise<Array>} - Array of pictures.
*/
async function fetchUnsplash(country) {
  // Redis caching
  await redisClient.connect();
  const cacheKey = `unsplash:${country}`;
  const cacheValue = await redisClient.get(cacheKey);
  // If cached data exists, return them
  if (cacheValue) {
    await redisClient.quit();
    return JSON.parse(cacheValue);
  }

  // Query construction
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });

  const response = await unsplash.search.getPhotos({
    query: `${country} landscape`,
    orientation: 'landscape',
    perPage: 5,
  });

  const pictures = response.response.results.map((pic) => ({
    url: pic.urls.full,
    author: pic.user.name,
    description: pic.description || pic.alt_description,
  }));

  // Caching with Redis
  await redisClient.set(cacheKey, JSON.stringify(pictures));
  redisClient.expire(cacheKey, process.env.REDIS_TTL);
  await redisClient.quit();

  return pictures;
}

module.exports = fetchUnsplash;
