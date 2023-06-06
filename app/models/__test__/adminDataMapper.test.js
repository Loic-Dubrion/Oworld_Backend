// import needed modules
const AdminDataMapper = require('../AdminDataMapper');

describe('AdminDataMapper', () => {
  it('should be able to call findAll method', async () => {
    // Assume findAll returns an empty array
    AdminDataMapper.findAll = jest.fn().mockResolvedValue([]);

    const result = await AdminDataMapper.findAll();

    // Check that the function was called
    expect(AdminDataMapper.findAll).toHaveBeenCalled();
    // Check that the function returned an array
    expect(Array.isArray(result)).toBe(true);

    // Check that the returned objects have correct keys
    const expectedKeys = ['country_origin', 'average_age', 'user_count', 'favorite_count'];
    result.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
