require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendPasswordResetEmail(userEmail, resetToken) {
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
    to: userEmail,
    subject: 'Password Reset',
    text: `
      You are receiving this because you have requested the reset of the password for your account.
      Please click on the following link, or paste it into your browser to complete the process within one hour of receiving it:
      ${process.env.FRONTEND_URL}/reset-password/${resetToken}
      If you did not request this, please ignore this email.
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendPasswordResetEmail;
