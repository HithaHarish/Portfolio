import React from 'react';
import '../styles/Home.css'; 

import ModelViewer from "./ModelViewer.jsx";

export default function Home() {
  return (
    <div className="home-container">
      {/* Left Side: Intro and Resume Download */}
      <div className="animation">
        <p className="subtitle">Meet Me,</p>
        <p className="title">Hitha Harish</p>
        <p className="subtitle">Full&nbsp;&nbsp;Stack&nbsp;&nbsp;Developer.</p>

        <a
          href="/hitha22harish@gmail.com_HithaHarish_Resume.pdf"
          download="hitha22harish@gmail.com_HithaHarish_Resume.pdf"
          className="download-btn"
        >
          Download Resume
        </a>
      </div>

      {/* Right Side: 3D Model Viewer */}
      <div className="model-section">
        <ModelViewer />
      </div>
    </div>
  );
}
