import React from "react";
import Navbar from "./components/Navbar";
import NightSky from "./components/NightSky";
import Home from "./components/Home";
import Education from "./components/Education";

export default function App(){
  return (
    <>
    <Navbar/>
    <NightSky />
    <Education />
    </>
  )
}