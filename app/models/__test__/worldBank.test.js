const fetchAndLogData = require('../worldBankApi');

describe('fetchAndLogData', () => {
  it('should return an object with the expected structure', async () => {
    // Arrange
    const iso3 = 'FRA';

    // Act
    const data = await fetchAndLogData(iso3);

    // Assert
    expect(data).toEqual({
      country: { id: iso3 },
      environnement: expect.arrayContaining([
        expect.objectContaining({
          indicator: expect.objectContaining({}),
          values: expect.objectContaining({}),
        }),
      ]),
      job: expect.arrayContaining([
        expect.objectContaining({
          indicator: expect.objectContaining({}),
          values: expect.objectContaining({}),
        }),
      ]),
      population: expect.arrayContaining([
        expect.objectContaining({
          indicator: expect.objectContaining({}),
          values: expect.objectContaining({}),
        }),
      ]),
      education: expect.arrayContaining([
        expect.objectContaining({
          indicator: expect.objectContaining({}),
          values: expect.objectContaining({}),
        }),
      ]),
      economy: expect.arrayContaining([
        expect.objectContaining({
          indicator: expect.objectContaining({}),
          values: expect.objectContaining({}),
        }),
      ]),
    });
  });
});
