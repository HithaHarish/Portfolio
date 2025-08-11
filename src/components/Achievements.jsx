import React from "react";

/* css */
import "../styles/Achievements.css";

// Data import
import { achievementsData } from "../data/achievementsData";

export default function Achievements() {
  const { profileImage, name, descriptionPoints, achievements, badges } = achievementsData; //object 

  return (
    <div className="about-container">

      {/* Left Section */}
      <div className="about-left">

        <img src={profileImage} alt="Profile" className="profile-image" />

        <h2 className="name">{name}</h2>

        <ul className="description">

          {descriptionPoints.map((point, index) => ( // Using map to iterate over descriptionPoints
            <li key={index}>{point}</li> // print each point as an item in unordered list - bulleted not numbered
          ))}

        </ul>

      </div>

      {/* Right Section */}
      <div className="about-right">
        <h3 className="section-title">My Achievements</h3>
        <ul className="achievements-list">
          {achievements.map((item, index) => (
            <li key={index}>
              <strong>{item}</strong>
            </li>
          ))}
        </ul>

        {/* Badges Section */}
        <div className="badges-section">
          <div className="badges-list">
            {badges.map((badge, index) => (
              <img key={index} src={badge.image} alt={badge.name} title={badge.name} className="badge-icon" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
