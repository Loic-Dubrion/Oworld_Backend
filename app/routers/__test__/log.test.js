const axios = require('axios');

const baseUrl = 'http://localhost:3000/api'; // Remplacez par l'URL de base de votre API

describe('POST api/log/in', () => {
  it('should return 200 when the credentials are correct', async () => {
    const response = await axios.post(`${baseUrl}/log/in`, {
      username: 'Loic',
      password: '&Tets1234',
    });

    expect(response.status).toBe(200);
  });
});
