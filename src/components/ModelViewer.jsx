import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

function Model({ onLoaded }) {
  const gltf = useGLTF(
    "/models/Untitled123.glb",
    undefined,
    undefined,
    (loader) => {
      loader.manager.onError = (url) => 
        console.error(`Failed to load ${url}`);
    }
  );

  useEffect(() => {
    if (gltf) onLoaded();
  }, [gltf, onLoaded]);

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
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Preload assets
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "/models/Untitled123.glb",
      () => useGLTF.preload("/models/Untitled123.glb"),
      undefined,
      (err) => setError("Failed to load 3D model")
    );
  }, []);

  if (error) return (
    <div className="error-message">
      <p>⚠️ {error}</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  return (
    <div style={{ 
      height: "100vh",
      width: "100%",
      position: "relative",
      overflow: "hidden"
    }}>
      <Canvas
        camera={{ 
          position: [2, 0.8, 6],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          physicallyCorrectLights: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        dpr={[1, 2]} // Responsive device pixel ratio
      >
        <color attach="background" args={["#121212"]} />
        
        <ambientLight intensity={0.7} />
        <directionalLight 
          intensity={0.5}
          position={[3, 3, 3]} 
          color="#ffffff"
          castShadow
        />
        <directionalLight 
          intensity={0.3}
          position={[-3, 2, -1]}
          color="#ffffee"
        />

        <Suspense fallback={<Loader />}>
          <Environment 
            preset="dawn" 
            background={false}
            blur={0.5}
          />
          <Model onLoaded={() => setModelLoaded(true)} />
        </Suspense>

        {modelLoaded && (
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            makeDefault
          />
        )}
      </Canvas>

      <style jsx global>{`
        .loading-spinner, .error-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          background: rgba(0,0,0,0.7);
          padding: 20px;
          border-radius: 10px;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 1s ease-in-out infinite;
          margin: 0 auto 10px;
        }
        .error-message button {
          margin-top: 15px;
          padding: 8px 16px;
          background: #ff4757;
          border: none;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
