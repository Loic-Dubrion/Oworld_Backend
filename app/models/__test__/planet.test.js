const { planet } = require('../OworldDataMapper');

describe('planet function', () => {
  it('should return a JSON object containing data for Earth', async () => {
    const result = await planet();

    const resultObj = JSON.parse(result);

    expect(typeof resultObj).toBe('object');

    expect(resultObj).toHaveProperty('Earth');
  });
});
