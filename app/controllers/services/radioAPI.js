const RadioBrowser = require('radio-browser');
const logger = require('../../services/logger');

async function fetchRadioData(isoCode) {
  const filter = {
    limit: 1,
    by: 'country',
    searchterm: isoCode,
  };

  try {
    const data = await RadioBrowser.getStations(filter);
    logger.info(data);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = fetchRadioData;
