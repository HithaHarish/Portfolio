import React from "react";

/* Components */
import FluidCursor from "./components/FluidCursor";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div id="home"><Home /></div>
      <div id="achievements"><Achievements /></div>
      <div id="skills"><Skills /></div>
      <div id="experience"><Experience /></div>
      <div id="projects"><Projects /></div>
      <div id="certifications"><Certifications /></div>
      <div id="contact"><Contact /></div>
      <div ><Footer /></div>
      <FluidCursor />
    </>
  );
}

