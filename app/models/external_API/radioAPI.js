const RadioBrowser = require('radio-browser');
const logger = require('../../services/logger');

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
  const filter = {
    limit: 1,
    by: 'country',
    searchterm: isoCode,
  };

  try {
    // Use array destructuring ([data]) to extract the first element of the returned array
    const [data] = await RadioBrowser.getStations(filter);

    // Use object destructuring to extract specific properties from the data object
    const { name, url, url_resolved, homepage } = data;

    // Create a new object with the extracted data
    const extractedData = {
      name,
      url,
      url_resolved,
      homepage,
    };

    return(extractedData);
  } catch (error) {
    // Log any errors that occur during the RadioBrowser API call
    logger.error(error);
  }
}

module.exports = fetchRadioData;
