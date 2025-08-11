import React from 'react';

/* css */
import '../styles/Navbar.css';

export default function Navbar(){
  return (
    
    <div className="navbar">

      <div className="myname">Hitha Harish</div>

      <div className="nav-links-container">

        <ul className="nav-links">

          <li><a href="#home">Me</a></li> 
          <li><a href="#skills">Stack</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>

        </ul>

      </div>

    </div>

  );
}

