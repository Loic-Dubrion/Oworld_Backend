/* eslint-disable camelcase */
const axios = require('axios');
const RadioBrowser = require('radio-browser');

const client = require('../../services/clientdb');
const redisClient = require('../../services/clientRedis');

const { Error400, Error503 } = require('../../errors');

/**
 * Fetch radio station data for a specific country using the RadioBrowser API.
 *
 * The function makes a call to the RadioBrowser API and returns an object containing
 * the name, url, url_resolved, and homepage of the radio station.
 *
 * @param {string} isoCode - The ISO code for the country of interest.
 * @returns {Promise<Object>} A Promise that resolves to an object containing radio station data.
 *
 * @throws Will throw an error if the RadioBrowser API call
 *  fails or if the ISO code is not found in the database.
 */
async function fetchRadioData(isoCode) {
  // Redis caching
  await redisClient.connect();
  const cacheKey = `wtf:${isoCode}`;

  const cacheValue = await redisClient.get(cacheKey);

  if (cacheValue) {
    await redisClient.quit();
    return JSON.parse(cacheValue);
  }

  try {
    // Check if ISO code exists in the database
    const countryQuery = await client.query('SELECT iso3 FROM country WHERE iso3 = $1', [isoCode]);
    if (countryQuery.rows.length === 0) {
      await redisClient.quit();
      throw new Error400(`ISO code '${isoCode}' not found in the database.`);
    }

    const filter = {
      limit: 1,
      by: 'country',
      searchterm: isoCode,
    };

    const result = {
      radio: {
        name: '',
        url: '',
        url_resolved: '',
        homepage: '',
      },
      insolite: '',
      celebrity: [],
    };

    // Call RadioBrowser API and get radio station data
    const [radioData] = await RadioBrowser.getStations(filter);

    if (radioData) {
      result.radio.name = radioData.name || '';
      result.radio.url = radioData.url || '';
      result.radio.url_resolved = radioData.url_resolved || '';
      result.radio.homepage = radioData.homepage || '';
    }

    // Retrieve "insolite" from the database
    const country = await client.query('SELECT insolite, iso2 FROM country WHERE iso3 = $1', [isoCode]);
    if (country.rows.length > 0) {
      result.insolite = country.rows[0].insolite || '';
    }
    const { iso2 } = country.rows[0];

    const ninjaApiKey = process.env.NINJA_API_KEY;

    const responseCelebrity = await axios.get(`https://api.api-ninjas.com/v1/celebrity?nationality=${iso2}`, {
      headers: {
        'X-Api-Key': ninjaApiKey,
      },
    });
    if (responseCelebrity.data && responseCelebrity.data.length > 0) {
      result.celebrity = responseCelebrity.data;
    }

    await redisClient.set(cacheKey, JSON.stringify(result));
    redisClient.expire(cacheKey, process.env.REDIS_TTL);
    await redisClient.quit();

    return result;
  } catch (error) {
    throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
  }
}

module.exports = fetchRadioData;
