/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies

const axios = require('axios');
const client = require('../../services/clientdb');
const redisClient = require('../../services/clientRedis');
const RadioBrowser = require('radio-browser');
const Error503 = require('../../errors/Error503');

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
  const cacheKey = `wtf:${isoCode}`;

  const cacheValue = await redisClient.get(cacheKey);

  if (cacheValue) {
    await redisClient.quit();
    return JSON.parse(cacheValue);
  }

  const filter = {
    limit: 1,
    by: 'country',
    searchterm: isoCode,
  };

  try {
    const result = {};

    // Call RadioBrowser API and get radio station data
    const response = await axios.get('https://de1.api.radio-browser.info/json/stations/search', { params: filter });

    if (response.status === 200) {
      const [radioData] = response.data;

      if (radioData) {
        result.radio = {
          name: radioData.name,
          url: radioData.url,
          url_resolved: radioData.url_resolved,
          homepage: radioData.homepage,
        };
      }
    } else {
      throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
    }

    // Retrieve "insolite" from the database
    const country = await client.query('SELECT insolite, iso2 FROM country WHERE iso3 = $1', [isoCode]);
    if (country.rows.length > 0) {
      result.insolite = country.rows[0].insolite;
    }
    const { iso2 } = country.rows[0];

    const responseCelebrity = await axios.get(`https://api.api-ninjas.com/v1/celebrity?nationality=${iso2}`, {
      headers: {
        'X-Api-Key': 'LBuPMzuZ+Tv29IU9UUkd5g==FoQKpOaRaopey9eV',
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
    if (error.response.status === 503) {
      throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
    } else {
      return error;
    }
  }
}

module.exports = fetchRadioData;
