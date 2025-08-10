import nodemailer from 'nodemailer';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your SMTP host
      auth: {
        user: 'hitha22harish@gmail.com',
        pass: 'aqcx aosl tjqv zvfz',
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'hitha22harish@gmail.com',
      subject: `New message from ${name}`,
      text: message,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
