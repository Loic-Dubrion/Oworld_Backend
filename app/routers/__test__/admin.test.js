const axios = require('axios');

const baseUrl = 'http://localhost:3000/api/';

describe('GET /admin/:userId/stat', () => {
  let accessToken;

  beforeAll(async () => {
    // Obtenir les tokens à partir de la route /log/in
    const loginResponse = await axios.post(`${baseUrl}/log/in`, {
      username: 'Loic',
      password: '&Tets1234',
    });
    const responseData = loginResponse.data;
    accessToken = responseData.data.accessToken;
  });

  it('should return 200 is admin', async () => {
    const response = await axios.get(
      `${baseUrl}admin/601/stat?useView=true`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    expect(response.status).toBe(200);
  });
});
