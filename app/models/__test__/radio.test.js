const fetchRadioData = require('../external_API/radioAPI');

describe('fetchRadioData', () => {
  it('should return an object with the expected categories', async () => {
    const isoCode = 'FR';

    const data = await fetchRadioData(isoCode);

    expect(typeof data).toBe('object');
    expect(data).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        url: expect.any(String),
        url_resolved: expect.any(String),
        homepage: expect.any(String),
      })
    );
  });
});
