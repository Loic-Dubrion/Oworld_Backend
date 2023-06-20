const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const logger = require('../logger');

dotenv.config();

const sendEmailWithAttachment = (subject, text, attachmentPath, attachmentFilename) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_USER,
    to: process.env.MAILER_RECEIVER,
    subject,
    text,
    attachments: [
      {
        filename: attachmentFilename,
        path: attachmentPath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(`Error sending the e-mail : ${error.message}`);
    } else {
      logger.info(`E-mail sent successfully : ${info.response}`);
    }
  });
};

module.exports = sendEmailWithAttachment;
