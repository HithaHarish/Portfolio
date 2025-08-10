// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create transporter using your environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // if you use Gmail, else adjust
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a new message from your portfolio contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Message:\n${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
}
