// ================== Import Required Packages ==================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
// Security additions (your comments remain unchanged below)
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// ================== Initialize Express App ==================
const app = express();

// Load environment variables from .env file (for local dev only)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

// ================== Middleware Setup ==================
app.use(helmet()); // Added security headers
app.use(cors());
app.use(bodyParser.json());

// Rate limiter for contact form (5 requests/15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

// ================== Serve Frontend Build ==================
// Serve static files from frontend's dist folder (for production)
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

// For any unknown route, serve the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// ================== Contact Form API Endpoint ==================
app.use('/contact', limiter); // Apply rate limiting only to contact form
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

// Health check endpoint (no comment modification)
app.get('/health', (req, res) => res.status(200).send('OK'));

// ================== Error Handling Middleware ==================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ================== Start the Server ==================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
