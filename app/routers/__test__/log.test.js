// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const app = require('../..');

describe('Authentication API', () => {
  it('should authenticate a user and initiate a session', async () => {
    const response = await request(app)
      .post('/api/log/in')
      .send({ email: 'test@test.com', password: '&Test1234' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('httpCode', 200);
  });

  it('should return 403 error for invalid email or password', async () => {
    const response = await request(app)
      .post('/api/log/in')
      .send({ email: 'invalid@test.com', password: 'password123' });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('httpCode', 403);
  });
});
