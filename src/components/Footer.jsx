// components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-icons">
        <a
          href="https://github.com/HithaHarish"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/hitha-harish-47b19b29b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bqug3atOmQ0KL81ScPvSt8A%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:hitha22harish@gmail.com">
          <FaEnvelope />
        </a>
      </div>

      <div className="footer-copy">
        © 2025 Hitha Harish. All rights reserved.
      </div>
    </footer>
  );
}
