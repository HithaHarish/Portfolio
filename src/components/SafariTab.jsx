// components/SafariTab.js

import React from "react";
import { FaGithub } from "react-icons/fa";
import "../styles/SafariTab.css"; // you can create specific styles

export default function SafariTab({ image, title, description, techStack, github }) {
  return (
    <div className="safari-tab">
      <div className="safari-header">
        <div className="dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        <div className="fake-search-bar">
          <span className="search-text">localhost</span>
        </div>

        <div className="empty-space" />
      </div>


      <div className="safari-content">
        <img src={image} alt={title} className="project-image" />
        <h3 className="tab-title">{title}</h3>
        <p className="project-description">{description}</p>

        <div className="safari-footer">
          <div className="tech-stack">
            {techStack.map((tech, i) => (
              <img
                key={i}
                src={tech.icon}
                alt={tech.name}
                title={tech.name}
                className="tech-icons"
              />
            ))}
          </div>

          <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
