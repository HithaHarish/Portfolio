// ================== Import Required Packages ==================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

// ================== Initialize Express App ==================
const app = express();

// Load environment variables from .env file (for local dev only)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

// ================== Middleware Setup ==================
app.use(cors());
app.use(bodyParser.json());

// ================== Serve Frontend Build ==================
// Serve static files from frontend's dist folder (for production)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For any unknown route, serve the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// ================== Contact Form API Endpoint ==================
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use your email as sender
      replyTo: email, // Set reply-to to user's email
      to: 'hitha22harish@gmail.com',
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// ================== Start the Server ==================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
