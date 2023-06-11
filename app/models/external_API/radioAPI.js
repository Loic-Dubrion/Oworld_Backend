/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies

const RadioBrowser = require('radio-browser');
const client = require('../../services/clientdb');
const redisClient = require('../../services/clientRedis');

/**
 * Fetch radio station data for a specific country using the RadioBrowser API.
 *
 * The function makes a call to the RadioBrowser API and returns an object containing
 * the name, url, url_resolved, and homepage of the radio station.
 *
 * @param {string} isoCode - The ISO code for the country of interest.
 * @returns {Promise<Object>} A Promise that resolves to an object containing radio station data.
 *
 * @throws Will throw an error if the RadioBrowser API call fails.
 */
async function fetchRadioData(isoCode) {
  await redisClient.connect();
  console.log('Connected to Redis');
  const cacheKey = `wtf:${isoCode}`;

  const cacheValue = await redisClient.get(cacheKey);

  if (cacheValue) {
    // Si oui, je récupère le cache
    console.log('cache Value:', JSON.parse(cacheValue));
    await redisClient.quit();
    return JSON.parse(cacheValue);
  } else {
    // Si non, je déclenche ma requête
    console.log(`Not cache Value: ${cacheKey}`);

    const filter = {
      limit: 1,
      by: 'country',
      searchterm: isoCode,
    };

    try {
      const result = {};

      // Call RadioBrowser API and get radio station data
      const [radioData] = await RadioBrowser.getStations(filter);

      if (radioData) {
        result.radio = {
          name: radioData.name,
          url: radioData.url,
          url_resolved: radioData.url_resolved,
          homepage: radioData.homepage,
        };
      }

      // Retrieve "insolite" from the database
      const queryResult = await client.query('SELECT insolite FROM country WHERE iso3 = $1', [isoCode]);
      if (queryResult.rows.length > 0) {
        result.insolite = queryResult.rows[0].insolite;
      }

      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 600);
      await redisClient.quit();

      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = fetchRadioData;
