/**
 * @module pg_restore
 */

const { exec } = require('child_process');
const logger = require('../logger');

/**
 * A function for restoring the database
 */
const restoreDatabase = () => {
  const restoreCommand = `PGPASSWORD="${process.env.PGPASSWORD}" 
  psql -U ${process.env.PGUSER} ${process.env.PGDATABASE} < data/dbSave/db.tar`;

  exec(restoreCommand, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Error during command execution : ${error.message}`);
      return;
    }

    if (stderr) {
      logger.error(`Standard error : ${stderr}`);
      return;
    }

    logger.info(`Standard output : ${stdout}`);
    logger.info('Database successfully restored!');
  });
};

module.exports = restoreDatabase;
