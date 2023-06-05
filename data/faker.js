// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const client = require('../app/services/clientdb');
const logger = require('../app/services/logger');

/**
 *  Generate 300 fictitious users
 *  Assign roles to each user
 *  and insert in database
 */
async function insertUsers() {
  try {
    await client.connect();

    const users = [];
    for (let i = 0; i < 300; i += 1) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const countryOrigin = faker.datatype.number({ min: 1, max: 195 });
      const birthDate = faker.date.between(
        new Date('1928-01-01'),
        new Date('2008-01-01'),
      );

      const user = {
        username,
        email,
        password,
        country_origin: countryOrigin,
        birth_date: birthDate,
      };
      users.push(user);
    }

    // Insert users
    const query = `
      INSERT INTO "user" ("username", "email", "password", "country_origin", "birth_date")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const roleQuery = `
      INSERT INTO "user_has_role" ("user_id", "role_id")
      VALUES ($1, $2)
    `;

    const promises = users.map(async (user, index) => {
      const result = await client.query(
        query,
        [
          user.username, user.email, user.password, user.country_origin, user.birth_date,
        ],
      );
      const userId = result.rows[0].id;

      //  Assign the desired role to each user
      const roleId = index < 10 ? 1 : 2; // Admin for the first 10, User for the others
      const userRole = { user_id: userId, role_id: roleId };
      await client.query(roleQuery, [userRole.user_id, userRole.role_id]);
    });

    await Promise.all(promises);

    logger.info('Utilisateurs insérés avec succès dans la base de données');
  } catch (error) {
    logger.error('Erreur lors de l\'insertion des utilisateurs dans la base de données', error);
  } finally {
    await client.end();
  }
}

insertUsers();
