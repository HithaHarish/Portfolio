import React from "react";

//css
import "../styles/Certifications.css";

//data
import certificationsData from "../data/certificationsData";

export default function Certifications() {

  return (
    <div className="certifications-container">
      <h2 className="certifications-title">My Certifications</h2>

      {certificationsData.map((cer, index) => (
        <div
          key={index}
          className="certifications-row"
        >
          {/* Left */}
          <div className="certifications-left">
            <p className="certifications-role-big">{cer.title}</p>
          </div>

          {/* Center - Logo + Org */}
          <div className="certifications-center">
            <img
              src={cer.logo}
              alt={`${cer.organization} logo` /* template string */ }
              className="certifications-logo"
            />
            <p className="certifications-org">{cer.organization}</p>
          </div>

          {/* Right */}
          <div className="certifications-right">
            <p className="certifications-date">Issued in {cer.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
