const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
  
    await transporter.sendMail({
      from: 'NOVA Market <alaaproschool@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
  });
};

module.exports = sendEmail;