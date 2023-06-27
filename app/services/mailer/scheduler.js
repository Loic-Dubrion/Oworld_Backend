/**
 * @module Service
 */

const cron = require('node-cron');
const dumpDatabase = require('../secureDB/pg_dump');
const sendEmail = require('./sender');

/**
 * Schedule tasks to dump the database and send log emails at the specified cron schedule.
 * @function
 */
const scheduleTasks = () => {
  /**
   * Schedule the task to dump the database every day at midnight.
   * @see {@link https://www.npmjs.com/package/node-cron} for more details on cron scheduling.
   */
  cron.schedule('0 0 * * *', dumpDatabase);

  /**
   * Schedule the task to send the log email every day at midnight.
   * The email will have a subject of 'Fichier de logs du jour', a message of
   * 'Pièce jointe : fichier de logs du jour.', and an attachment of 'logs/oWorld.log'.
   */
  cron.schedule('0 0 * * *', () => {
    sendEmail(
      'Fichier de logs du jour',
      'Pièce jointe : fichier de logs du jour.',
      'oWorld.log',
      'logs/oWorld.log',
    );
  });
};

module.exports = scheduleTasks;
