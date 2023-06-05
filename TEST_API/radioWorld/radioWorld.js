const RadioBrowser = require('radio-browser');

const filter = {
  limit: 1, // list max 5 items
  by: 'country', // search in tag
  searchterm: 'fr', // term in tag
};
RadioBrowser.getStations(filter)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
