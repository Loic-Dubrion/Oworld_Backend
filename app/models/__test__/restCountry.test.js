const fetchCountryData = require('../external_API/restCountryAPI');

describe('fetchCountryData', () => {
  it('should return an object with the expected categories', async () => {
    const isoCode = 'FRA';
    const data = await fetchCountryData(isoCode);

    expect(data).toBeDefined();
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining([
        'flags',
        'coatOfArms',
        'name',
        'currencies',
        'capital',
        'region',
        'subregion',
        'languages',
        'area',
        'maps',
        'population',
        'car',
      ]),
    );
  });
});
