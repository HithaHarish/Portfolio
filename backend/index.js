// ================== Import Required Packages ==================
const express = require('express');        // Web framework for building server APIs
const cors = require('cors');              // Allows cross-origin requests (frontend ↔ backend)
const bodyParser = require('body-parser'); // Parses JSON request bodies
const nodemailer = require('nodemailer');  // For sending emails
const path = require('path');              // Helps with file/directory paths

// ================== Initialize Express App ==================
const app = express();

// Load environment variables from .env file (for local dev only)
// On hosting platforms, these vars are set in the dashboard, not .env
require('dotenv').config(); // <-- added this so EMAIL_USER, EMAIL_PASS work locally too

// Load PORT from environment variables, fallback to 3001 if not set
// This allows platforms like Render, Railway, or Vercel to set their own port
const PORT = process.env.PORT || 3001;

// ================== Middleware Setup ==================
// Enable CORS (important when frontend & backend are on different domains during development)
app.use(cors());

// Parse incoming JSON requests into `req.body`
app.use(bodyParser.json());

// ================== Serve Frontend Build ==================
// Serve static files from frontend's dist folder (for production)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For any unknown route, serve the frontend's index.html (important for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// ================== Contact Form API Endpoint ==================
app.post('/contact', async (req, res) => {
  // Destructure data from request body
  const { name, email, message } = req.body;

  // Log the received message (optional, for debugging)
  console.log('Contact form submitted:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // ================== Configure Email Transporter ==================
  // Uses environment variables for security (never hardcode credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env or hosting env vars
      pass: process.env.EMAIL_PASS  // Your Gmail App Password from .env or hosting env vars
    }
  });

  // Email content configuration
  const mailOptions = {
    from: email, // Sender is the user filling the form
    to: 'hitha22harish@gmail.com', // Your receiving email
    subject: `A Portfolio Message from ${name}`,
    text: `Someone tried to connect with you:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'I got your message, I\'ll get back to you asap!' });
  } catch (error) {
    // Handle errors in sending email
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Oops, I didn’t get your message! Try again.' });
  }
});

// ================== Start the Server ==================
// Added "0.0.0.0" so server works on hosting platforms (Render, Railway, etc.)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
