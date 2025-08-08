const express = require('express'); // Web framework for building APIs and web servers
const cors = require('cors'); // Middleware that allows cross-origin requests (e.g., frontend on one domain talking to a backend on another)
const bodyParser = require('body-parser'); // Middleware for parsing JSON data from incoming requests
const nodemailer = require('nodemailer'); // Module for sending emails

const app = express(); // Initialize the Express app
const PORT = 3001;

// Middleware
app.use(cors()); 
// Allows frontend apps from other domains/ports to make requests to this server. 
// For example, frontend on port 5173 can send requests to backend on port 5000

app.use(bodyParser.json()); 
// To parse means to read something and convert it into a form your code can understand and use.
// Parses incoming requests with JSON payloads and makes the data available in req.body by converting it to a JavaScript object.

// Contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body; // Extract name, email, and message from the parsed request body

  console.log('Contact form submitted:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Set up email transporter using Gmail and app password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hitha22harish@gmail.com', // Replace with your Gmail address
      pass: 'dwam hybz uxnr giot'     // Replace with your 16-character Gmail App Password
    }
  });

  // Email content and configuration
  const mailOptions = {
    from: email, // Sender (user who submitted the form)
    to: 'hitha22harish@gmail.com', // Your email address (receiver)
    subject: `A Portfolio Message from ${name}`,
    text: `Someone treid to connect with you, Wanna See who ?:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Try to send the email
  try {
    await transporter.sendMail(mailOptions); // Sends the email using the transporter
    res.status(200).json({ message: 'I got your message, I\'ll get back to you asap!' }); // Success response
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Oops, I didnt get your message ! Try Again' }); // Error response
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Logs the server URL once running
});
