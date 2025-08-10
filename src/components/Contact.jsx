import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // NEW: Better error handling (keeps your original alert messages)
      if (!response.ok) throw new Error(data.message || 'Failed to send');
      
      alert(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.message || 'Oops, I didnt get your message ! Try Again');
    } finally {
      setIsSubmitting(false); // NEW: Reset loading state
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
               disabled={isSubmitting} 
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
               disabled={isSubmitting} 
            />

            <label>Your Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type carefully. This could be the start of something awesome."
              value={formData.message}
              onChange={handleChange}
              required
               disabled={isSubmitting} 
            />

            <button 
              className="submit" 
              type="submit"
              disabled={isSubmitting} 
            >
              {isSubmitting ? 'Sending...' : 'Send'} {/* NEW: Loading state */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
