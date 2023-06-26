/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const client = require('../app/services/clientDB/clientPostgres');
const logger = require('../app/services/logger');

/**
 *  This script generates 600 fictitious users,
 *  assigns roles to each user,
 *  and inserts them into the database.
 *
 *  @returns {Promise} A Promise that resolves when all users have been inserted into the database
 */
(async function generateFakeUsers() {
  let connectionEstablished = false;
  try {
    await client.connect();
    connectionEstablished = true;

    /**
     *  @type {Array<Object>} users - An array to hold the generated user data
     */
    const users = [];

    // Generate user data for 300 users
    for (let i = 0; i < 600; i += 1) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      // Users are from 60 different countries
      const countryOrigin = faker.datatype.number({ min: 1, max: 60 });
      const birthDate = faker.date.between(
        new Date('1945-01-01'),
        new Date('2008-01-01'),
      );

      /**
       *  @type {Object} user - An object representing a single user
       *  @property {string} username - The user's username
       *  @property {string} email - The user's email
       *  @property {string} password - The user's password
       *  @property {number} country_origin - The user's country of origin
       *  @property {Date} birth_date - The user's date of birth
       */
      const user = {
        username,
        email,
        password,
        country_origin: countryOrigin,
        birth_date: birthDate,
      };
      users.push(user);
    }

    // SQL queries for inserting data into the database
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

    // Execute the queries for each user
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
        const favoriteCountriesCount = faker.datatype.number({ min: 0, max: 20 });
        for (let i = 0; i < favoriteCountriesCount; i += 1) {
        // Each user has favorites from 80 different countries
          const countryId = faker.datatype.number({ min: 10, max: 90 });

          await client.query(favQuery, [userId, countryId]);
        }
      } catch (error) {
        logger.error(`Error inserting user ${index}`, error);
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
}());
