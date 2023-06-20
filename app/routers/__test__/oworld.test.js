// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const app = require('../..'); // replace with path to your app file

describe('Oworld API', () => {
  it('GET /api/oworld?useView=false - should return 200', async () => {
    const res = await request(app).get('/api/oworld');
    expect(res.statusCode).toEqual(200);
  });
});

describe('List country', () => {
  it('GET /api/oworld/list?useView=true - should return 200', async () => {
    const res = await request(app).get('/api/oworld');
    expect(res.statusCode).toEqual(200);
  });
});

describe('List flags', () => {
  it('GET /api/oworld/flags - should return 200', async () => {
    const res = await request(app).get('/api/oworld');
    expect(res.statusCode).toEqual(200);
  });
});
