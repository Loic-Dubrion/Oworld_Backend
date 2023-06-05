const RadioBrowser = require('radio-browser');
const logger = require('../../services/logger');

async function fetchRadioData(isoCode) {
  const filter = {
    limit: 1,
    by: 'country',
    searchterm: isoCode,
  };

  try {
    const [data] = await RadioBrowser.getStations(filter); // Utilisation de [data] pour extraire le premier élément du tableau
    const { name, url, url_resolved, homepage, favicon } = data; // Déconstruction pour extraire les propriétés spécifiques

    const extractedData = {
      name,
      url,
      url_resolved,
      homepage,
    };
    return(extractedData);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = fetchRadioData;
