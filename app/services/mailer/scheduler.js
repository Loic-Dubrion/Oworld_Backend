const cron = require('node-cron');
const dumpDatabase = require('../pg_dump');
const sendEmailWithAttachment = require('./sender');

const scheduleTasks = () => {
  cron.schedule('0 0 * * *', dumpDatabase);

  cron.schedule('0 0 * * *', () => {
    sendEmailWithAttachment(
      'Fichier de logs du jour',
      'Pièce jointe : fichier de logs du jour.',
      'logs/oWorld.log',
      'oWorld.log',
    );
  });
};

module.exports = scheduleTasks;
