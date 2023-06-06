// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const client = require('../app/services/clientdb');
const logger = require('../app/services/logger');

/**
 *  Generate 300 fictitious users
 *  Assign roles to each user
 *  and insert in database
 */
(async function() {
  let connectionEstablished = false;
  try {
    await client.connect();
    connectionEstablished = true;

    const users = [];
    for (let i = 0; i < 300; i += 1) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const countryOrigin = faker.datatype.number({ min: 1, max: 30 }); // Users are from 30 different countries
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

    const favQuery = `
      INSERT INTO "user_has_favorite" ("user_id", "country_id")
      VALUES ($1, $2)
    `;

    const promises = users.map(async (user, index) => {
      try {
        const result = await client.query(
          query,
          [
            user.username, user.email, user.password, user.country_origin, user.birth_date,
          ],
        );
        const userId = result.rows[0].id;

        const roleId = index < 10 ? 1 : 2;
        const userRole = { user_id: userId, role_id: roleId };
        await client.query(roleQuery, [userRole.user_id, userRole.role_id]);

        // Insert favorite countries for each user
        const favoriteCountriesCount = faker.datatype.number({ min: 0, max: 10 });
        for (let i = 0; i < favoriteCountriesCount; i++) {
          const countryId = faker.datatype.number({ min: 20, max: 50 }); // Each user has favorites from 30 different countries
          await client.query(favQuery, [userId, countryId]);
        }

      } catch (error) {
        logger.error(`Error inserting user ${index}`, error);
        return;
      }
    });

    await Promise.all(promises);
    logger.info('Users successfully inserted in the database 🎉');
  } catch (error) {
    logger.error('Error inserting users into the database', error);
  } finally {
    if (connectionEstablished) {
      client.end();
    }
    process.exit();
  }
})();
