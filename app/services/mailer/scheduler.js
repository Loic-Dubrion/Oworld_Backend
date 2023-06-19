const cron = require('node-cron');
const dumpDatabase = require('../pg_dump');
const sendEmailWithAttachment = require('./sender');

cron.schedule('30 14 * * *', dumpDatabase);

cron.schedule('30 14 * * *', () => {
  sendEmailWithAttachment(
    'Fichier de logs du jour',
    'Pièce jointe : fichier de logs du jour.',
    'logs/oWorld.log',
    'oWorld.log',
  );
});
