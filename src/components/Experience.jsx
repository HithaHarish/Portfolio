import React, { useState } from "react";

//css 
import "../styles/Experience.css";

//data
import experienceData from "../data/experienceData";

export default function Experience() {
  const [hoveredExperience /* variable */ , setHoveredExperience /* function */ ] = useState(null); /* hook to track which experience the mouse or pointer is hovering at*/
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); /* hook to track current mouse position */

  const handleMouseEnter = (exp) => {
    if (exp.website) // Check if the hovered experience has a website link
    {
      setHoveredExperience(exp.website); // Set the hovered experience to its website link
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX + 20, y: e.clientY - 250 }); // Updates the position where the floating phone preview should appear
  };

  const handleMouseLeave = () => {
    setHoveredExperience(null); // When the mouse leaves a job card, this hides the floating preview.
  };

  return (
    <div className="experience-container">
      <h2 className="experience-title">My Experience</h2>

      {experienceData.map((exp, index) => (
        <div
          key={index}
          className="experience-row"
          onMouseEnter={() => handleMouseEnter(exp)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Left */}
          <div className="experience-left">
            <p className="experience-role-big">{exp.role}</p>
            <p className="experience-company-small">{exp.company}</p>
          </div>

          {/* Center */}
          <div className="experience-center">
            <p className="experience-description">{exp.description}</p>
          </div>

          {/* Right */}
          <div className="experience-right">
            <p className="experience-date">{exp.duration}</p>
              <div className="tech-stack-icons" >
                {exp.techStack.map((tech, index) => (
                  <img
                    key={index}
                    src={tech}
                    className="tech-icon"
                  />
                ))}
              </div>
          </div>
        </div>
      ))}

      {/* Floating phone iframe */}
      {hoveredExperience /* not null */ && /* then display */ (
      //In react, {condition && ( ... )} - “Only render the part inside ( ... ) if condition is truthy.”
        <div
          className="floating-phone"
          style={{ top: mousePos.y, left: mousePos.x }}
        >
          <iframe
            src={hoveredExperience} // hovered website is set to the website link, so src points to the website
            title="Website Preview"
            className="phone-iframe"
          ></iframe>
        </div>
      )}
    </div>
  );
}
