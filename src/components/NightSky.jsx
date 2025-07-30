import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './styles/NightSky.css'; 

const NightSky = () => {
  return (
    <div className="night-sky-container" >
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Starfield */}
        <Stars
          radius={100} // how far the stars are spread in the sphere
          depth={80}   // how deep the space is
          count={3000} // how many stars
          factor={3}   // size factor (lower is smaller)
          saturation={100} // color saturation
          fade        // fade in and out as camera moves
          speed={0.7}   // twinkle speed
        />
      </Canvas>
    </div>
  );
};

export default NightSky;
