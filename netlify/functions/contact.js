import nodemailer from 'nodemailer'; // Library to send email 
//(an SMTP - Simple Mail Transfer Protocol client for Node JS) 
// It sends mails between servers or an application to the server (here)

export const handler = async (event) => { //async indicates the function can use await - for asynchronous functions
  //event is passed when the function is triggered in frontend or by netlify
  if (event.httpMethod !== 'POST') { //check if event passed has method POST only

    // Wr use res.send() in Express, in serverless we send with return 
    return {
      statusCode: 405, // request method is not supported
      body: JSON.stringify({ error: 'Method not allowed' }),
      // convert { error: 'Method not allowed' } (JSON object) to a string and display as body
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body); //parse destructures the event's body into NEM constants

    const transporter = nodemailer.createTransport({
      //transporter is a SMTP Client configured to send emails
      service: 'gmail', // or your SMTP host
      auth: {
        user: 'hitha22harish@gmail.com',
        pass: 'aqcx aosl tjqv zvfz',
      },
    });

    await transporter.sendMail({
      // await pauses the javascript here so it doesnt move to return before the reponse is received
      from: email,
      to: 'hitha22harish@gmail.com',
      subject: `Hitha, ${name} tried to connect with you. Check it , could be important !`,
      text: message,
    });

    // So, this await function will return a Promise that will either be resolved or rejected
    // this Promise is resolved or rejected and will throw an error in try if rejected else it will continue to return if resolved

    return { // if no error is raised till here in try returns success
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'I received your message, I will get back to you !' }),
    };
  } catch (error) { //any error in try is caught here 
    // if the message isnt sent and an error raises, it will enter catch and print the following 
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
