// App.jsx
import React from 'react';
import WaterWaveBackground from './WaterWaveBackground';

function Contact() {
  return (
    <>
      <WaterWaveBackground />
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem' }}>
        <h1>Hello 🌊</h1>
        <p>This is a water wave background using Three.js!</p>
      </div>
    </>
  );
}

export default Contact;
