import React from 'react';

/* css */
import '../styles/Skills.css'; /* .. represents the parent directory of this file */

/* Data */
import skillsData from '../data/skillsData.js'; /* .. represents the parent directory of this file */

export default function Skills() {
  const allSkills = Object.values(skillsData).flat(); 

  /* .values() gets all values from key value pairs  
  [
  [{ name: "Java", logo: "..." }, ...],   // Programming Languages
  [{ name: "HTML", logo: "..." }, ...],   // Frontend Technologies
  ...
  ]
*/

  /* .flat() flattens the array of arrays into a single array 
  [
  { name: "Java", logo: "..." },
  { name: "HTML", logo: "..." },
  ...
  ]
  */

  return (
    <div className="skills-container">
      <h2 className="skills-title open-sans">My Stack</h2>

      <div className="all-skills-wrapper">
        {allSkills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <img src={skill.logo} alt={skill.name} className="skill-logo" />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
