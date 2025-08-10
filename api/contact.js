// api/contact.js
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

    // For now, we just log the message instead of sending an email
    console.log("📩 New message received:", { name, email, message });

    // Respond success
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
}
