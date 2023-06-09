require('dotenv').config();
const { exec } = require('child_process');
const logger = require('./logger');

const dumpDatabase = () => {
  const dumpCommand = `PGPASSWORD="${process.env.PGPASSWORD}"
  pg_dump -U ${process.env.PGUSER} -F t ${process.env.PGDATABASE} > data/dbSave/db.tar`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      logger.info(`Erreur lors de l'exécution de la commande : ${error.message}`);
      return;
    }

    if (stderr) {
      logger.info(`Erreur standard : ${stderr}`);
      return;
    }
    logger.info(`Sortie standard : ${stdout}`);
    logger.info('Sauvegarde terminée avec succès !');
  });
};

dumpDatabase();
