'use client';

import { useState,useEffect,useRef,RefObject } from 'react';
import { Canvas,useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// import { BlendFunction } from 'postprocessing';
import CameraViewButtons from './CameraViewButtons';
import BikeModel from './MTBModel';
import { EffectComposer, Bloom, Outline } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import ProductSidebar from './ProductSidebar';
import type { BikePart } from '@/data/products';
// import { hover } from 'framer-motion';


function CameraController({
  view,
  controlsRef,
}: {
  view: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    let frameId: number;
    const start = camera.position.clone();
    const end = new THREE.Vector3(...view);
    const duration = 600;
    const startTime = performance.now();

    function animate(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      camera.position.lerpVectors(start, end, eased);
      camera.lookAt(0, 0, 0);
      controlsRef.current?.update();

      if (t < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [view, camera, controlsRef]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
export default function BikeScene() {
  const [selectedObjects, setSelectedObjects] = useState<THREE.Object3D[]>([]);
  const [hoveredObjects, setHoveredObjects] = useState<THREE.Object3D[]>([]);
    const [selectedPart, setSelectedPart] = useState<BikePart | null>(null);
    const [cameraView, setCameraView] = useState<[number, number, number]>([3, 2, 5]);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    return (
      <div className="relative h-screen w-full overflow-hidden bg-neutral-400">
        <CameraViewButtons
          onChangeView={setCameraView}
          onTopView={() => {
            const camera = controlsRef.current?.object;

            if (!camera) return;

            const current = camera.position.clone();

            const direction = new THREE.Vector3(current.x, 0, current.z).normalize();

            const topView: [number, number, number] = [direction.x * 1.5, 9, direction.z * 1.5];

            setCameraView(topView);
          }}
        />
        <Canvas
                camera={{ position: [3, 2, 5], fov: 35 }}
                onPointerMissed={() => {
                    setHoveredObjects([]);
                    setSelectedObjects([]);
                    setSelectedPart(null);
                }}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <BikeModel
            onHoveredObjects={setHoveredObjects}
            onSelectedObjects={setSelectedObjects}
            onSelectPart={setSelectedPart}
          />

          <CameraController view={cameraView} controlsRef={controlsRef} />
          <EffectComposer multisampling={4} autoClear={false}>
            <Outline
              selection={[...selectedObjects, ...hoveredObjects]}
              edgeStrength={10}
              pulseSpeed={0}
              visibleEdgeColor={0x1e90ff}
              hiddenEdgeColor={0x1e90ff}
              blur
            />

            <Bloom intensity={0.25} luminanceThreshold={0.2} luminanceSmoothing={1.2} />
          </EffectComposer>
        </Canvas>
        <ProductSidebar selectedPart={selectedPart} />
      </div>
    );
}
