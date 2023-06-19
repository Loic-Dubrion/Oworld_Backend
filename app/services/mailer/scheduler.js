const cron = require('node-cron');
const dumpDatabase = require('../pg_dump');
const sendEmailWithAttachment = require('./sender');

// Planifier la tâche pour sauvegarder la base de données chaque jour à minuit
cron.schedule('30 11 * * *', dumpDatabase);

// Planifier la tâche pour envoyer le fichier de logs chaque jour à minuit
cron.schedule('30 11 * * *', () => {
  sendEmailWithAttachment(
    'Fichier de logs du jour',
    'Pièce jointe : fichier de logs du jour.',
    'logs/oWorld.log',
    'oWorld.log',
  );
});
