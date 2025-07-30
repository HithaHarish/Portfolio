import React from 'react';
import './styles/Navbar.css';

export default function Navbar(){
    return (
        <div className = "navbar">
            <div className="name open-sans"> Hitha Harish </div>
            <div className="nav-links-container open-sans">
                <ul className="nav-links">
                    <li>Home</li>
                    <li>Education</li>
                    <li>Projects</li>
                    <li>Skills</li>
                    <li>Experience</li>
                    <li>Profiles</li>
                    <li>Certifications</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    );
}

