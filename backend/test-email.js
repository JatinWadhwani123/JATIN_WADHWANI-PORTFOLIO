const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: `"Test Mail" <${process.env.EMAIL_USER}>`,
  to: process.env.TO_EMAIL,
  subject: 'Test Email from Portfolio',
  text: 'This is a test email to check if app password works.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌ Test Mail Failed:', error.message);
  }
  console.log('✅ Test Mail Sent:', info.response);
});
