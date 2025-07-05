// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', function (err) {
  console.error('❌ Uncaught Exception:', err);
});


app.use(express.static('public'));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact Form Route
app.post('/contact', (req, res) => {
  console.log("🔔 Incoming POST /contact request");

  const { name, email, message } = req.body;
  console.log("📩 Request Data:", { name, email, message });

  if (!name || !email || !message) {
    console.log("⚠️ Missing fields");
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log(`✅ Message saved to DB from: ${name} (${email})`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📤 Attempting to send email to:", process.env.TO_EMAIL);

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email Send Error:', error.message);
        return res.status(200).json({ message: 'Message saved, but failed to send email.' });
      }

      console.log('✅ Email sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully!' });
    });
  });
});

// Default Route
app.get('/', (req, res) => {
  res.send('✅ Backend is up and running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
