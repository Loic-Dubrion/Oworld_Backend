const { exec } = require('child_process');
const dotenv = require('dotenv');
const logger = require('./logger');
const sendEmailWithAttachment = require('./mailer/sender');

dotenv.config();

const dumpDatabase = () => {
  const dumpCommand = `PGPASSWORD="${process.env.PGPASSWORD}"
  pg_dump -U ${process.env.PGUSER} -F t ${process.env.PGDATABASE} > data/dbSave/db.tar`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      logger.info(`Error during command execution : ${error.message}`);
      return;
    }

    if (stderr) {
      logger.info(`Erreur standard : ${stderr}`);
      return;
    }

    logger.info(`Standard error : ${stdout}`);
    logger.info('Backup successfully completed!');

    sendEmailWithAttachment(
      'Sauvegarde de la base de données',
      'Pièce jointe : sauvegarde de la base de données.',
      'data/dbSave/db.tar',
      'db.tar',
    );
  });
};

dumpDatabase();

module.exports = dumpDatabase;
