import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const gltf = useGLTF("/models/Untitled123.glb");
  useGLTF.preload("/models/Untitled123.glb");

  return (
    <primitive 
      object={gltf.scene}
      rotation={[0, -Math.PI / 4, 0]}  
      scale={[0.3, 0.3, 0.3]}
      position={[0, -0.2, 0]}
    />
  );
}

function Loader() {
  return (
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
