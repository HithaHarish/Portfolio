import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  //form data has name, email and message - it is a state variable 
  // set form data is a function that updates the state using the hook useState

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }; 
  //...prev uses spread operator that copies all prev properties n puts it in the new object
  //the new values are updates there

  const handleSubmit = async (e) => { //async indicates this function uses await
    e.preventDefault(); // on submitting the form, the browser reloads the page and the data entered is lost 
    // that is prevented here, for convinience 
    
    try {
      const response = await fetch('/.netlify/functions/contact', { //create a Prmoise to send the data
        // path where the data should be sent to from there it is sent to the server
        method: 'POST', //indicates we are sending data to the server
        headers: { 'Content-Type': 'application/json' }, //sending JSON data in the body
        body: JSON.stringify(formData) // JSON data is sent after converting to a string
      });

      const data = await response.json(); //reply from backend
      alert(data.message);
      setFormData({ name: '', email: '', message: '' }); // for new message
    } 
    catch (error) {
      console.error('Error sending message:', error); //if error arised, enters here
      alert('Oops, I didnt get your message ! Try Again');
    }
  };

  return (
    <>
      <p className="contact-title">Contact Me !</p>
      <div className="safari-window-dark">
        <div className="safari-header-dark">
          <span className="traffic-light red" />
          <span className="traffic-light yellow" />
          <span className="traffic-light green" />
        </div>

        <div className="safari-content-dark">
          <p className="contact-intro">
            Hiring? Building something cool? I’m in — let’s talk!
          </p>

          <form className="contact-form-dark" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text" //single line text only
              name="name"  // for input elemment 
              placeholder="Your Full Name"
              value={formData.name} 
              onChange={handleChange} //update name in formData state variable 
              required
            />

            <label>Email</label>
            <input
              type="email"  //email
              name="email" // for input elemment 
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange} //update name in formData state variable 
              required
            />

            <label>Your Message</label>
            <textarea
              name="message" //multiple lines
              rows="5" //visually 5 line height, can scroll n type more
              placeholder="Type carefully. This could be the start of something awesome."
              value={formData.message}
              onChange={handleChange} //update message in formData
              required
            />

            <button className="submit" type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
