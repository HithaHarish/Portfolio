// api/contact.js
import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // max requests per IP per window

// In-memory store (best-effort; serverless instances are stateless across cold starts)
global.__rateLimitStore = global.__rateLimitStore || new Map();
const rateLimitStore = global.__rateLimitStore;

function getClientIP(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"'`]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
}

export default async function handler(req, res) {
  // CORS for testing; in production you might restrict origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simple rate limiter (in-memory)
  const ip = getClientIP(req);
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(t => t > now - RATE_LIMIT_WINDOW);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({ message: 'Too many requests from this IP, please try again later' });
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);

  // parse body (Vercel provides parsed JSON in req.body, but guard if it's string)
  let { name, email, message } = req.body || {};
  if (!name && typeof req.body === 'string') {
    try { ({ name, email, message } = JSON.parse(req.body)); } catch(e) {}
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Use your email (from env) as "from" and set replyTo to the user's email.
    // This avoids "string did not match the expected pattern" errors when mail providers reject arbitrary From headers.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const receiver = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: receiver,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
}
