const baseUrl = 'https://restcountries.com/v3.1/';

const param = {
  service: 'alpha',
  value: 'FRA',
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

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Traitement des données retournées
    console.log(data);
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
  }
}

fetchData();
