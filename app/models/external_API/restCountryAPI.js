const Error503 = require('../../errors/Error503');
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
      return data;
    } catch (error) {
      return null;
    }
  },
};

module.exports = countryApi;
