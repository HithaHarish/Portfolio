import React, { Suspense, useRef } from "react";
// - Suspense for lazy loading components
// - useRef for creating a reference to a component or DOM node
import { Canvas } from "@react-three/fiber";
// Import Canvas component from @react-three/fiber — this is the 3D rendering surface in React
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
// - OrbitControls for mouse/touch camera controls
// - useGLTF for loading 3D models in .gltf/.glb format
// - Environment for adding realistic lighting environments
// - Html for rendering regular HTML elements inside a 3D scene
import * as THREE from "three";
// Import all of THREE.js — the core 3D graphics library that powers react-three-fiber

function Model() { //responsible for loading and displaying the GLTF 3D model
  const gltf = useGLTF("/models/Untitled123.glb");
  // Load the 3D model from the "public/models/Untitled123.glb" path
  // useGLTF returns an object with scene, nodes, and materials from the model
  useGLTF.preload("/models/Untitled123.glb");
  // Preload the model before it is needed — improves performance and removes loading lag

  return (
    <primitive //is used when you already have a THREE.js object (here, gltf.scene)
      object={gltf.scene}
      rotation={[0, -Math.PI / 4, 0]}  
      scale={[0.3, 0.3, 0.3]}
      position={[0, -0.2, 0]}
      // rotation={[x, y, z]} — rotates the model in radians (here, y rotation is -45 degrees)
      // scale={[x, y, z]} — scales the model down to 30% in all directions
      // position={[x, y, z]} — moves the model in 3D space
    />
  );
}

function Loader() { // Loader component — shown while the model is loading
  return (
    // Html from drei lets you place normal HTML inside the 3D scene
    // "center" means it’s centered at its 3D position
    <Html center>
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading model...</p>
      </div>
    </Html>
  );
}

export default function ModelViewer() {
  const controlsRef = useRef();

  return (
    <div style={{ 
      height: "100vh",
      width: "100%",
      float: "right",
      marginTop: "10px",
      marginRight: "-50px",
      position: "relative",
      zIndex: 0
    }}>
      <Canvas
        camera={{ 
          position: [2, 0.8, 6],
          fov: 50
        }}
        gl={{ 
          physicallyCorrectLights: true,
          toneMappingExposure: 0.8
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight 
          intensity={0.5}
          position={[3, 3, 3]} 
          color="#ffffff"
        />
        <directionalLight 
          intensity={0.3}
          position={[-3, 2, -1]}
          color="#ffffee"
        />

        <Suspense fallback={<Loader />}>
          <Environment preset="dawn" background={false} />
          <Model />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.8}
          minAzimuthAngle={-Math.PI / 4} // Constrain left rotation
          maxAzimuthAngle={Math.PI / 4}  // Constrain right rotation
          minPolarAngle={Math.PI / 6}    // Limit looking down
          maxPolarAngle={Math.PI / 2.2}  // Limit looking up
        />
      </Canvas>

      <style jsx global>{`
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
