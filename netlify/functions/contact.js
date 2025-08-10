import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required' }),
      };
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or other service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a new message from your portfolio contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Message:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };

  } catch (error) {
    console.error('Error in contact function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong. Please try again.' }),
    };
  }
};
