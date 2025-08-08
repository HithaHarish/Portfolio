import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
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
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Your Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type carefully. This could be the start of something awesome."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button className="submit" type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
