// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const app = require('../..');

describe('Admin Statistics API', () => {
  it('should return statistics for all countries', async () => {
    const response = await request(app).get('/api/admin/stat?useView=true');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('country_origin');
    expect(response.body[0]).toHaveProperty('iso2');
    expect(response.body[0]).toHaveProperty('iso3');
    expect(response.body[0]).toHaveProperty('average_age');
    expect(response.body[0]).toHaveProperty('user_count');
    expect(response.body[0]).toHaveProperty('favorite_count');
  });
});
