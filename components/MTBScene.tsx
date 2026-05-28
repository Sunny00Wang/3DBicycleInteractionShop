'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// import { BlendFunction } from 'postprocessing';
import CameraViewButtons from './CameraViewButtons';
import BikeModel from './MTBModel';
import { EffectComposer, Bloom, Outline } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import ProductSidebar from './ProductSidebar';
import type { BikePart } from '@/data/products';
import { focusCameraOnObjects } from '@/lib/camera/focusCameraOnObjects';
import { animateCameraToView } from '@/lib/camera/cameraAnimation';
// import { hover } from 'framer-motion';
  const ORIGIN: [number, number, number] = [0, 0, 0];

function CameraController({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
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

function CameraZoomIn({ selectedObjects }: { selectedObjects: THREE.Object3D[] }) {
  const { camera } = useThree();
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;

  useEffect(() => {
    if (!controls || selectedObjects.length === 0) return;

    focusCameraOnObjects({
      camera: camera as THREE.PerspectiveCamera,
      controls,
      objects: selectedObjects,
    });
  }, [camera, controls, selectedObjects]);
  return null;

}
export default function BikeScene() {
  const [selectedObjects, setSelectedObjects] = useState<THREE.Object3D[]>([]);
  const [hoveredObjects, setHoveredObjects] = useState<THREE.Object3D[]>([]);
  const [selectedPart, setSelectedPart] = useState<BikePart | null>(null);
  const [cameraView, setCameraView] = useState<[number, number, number]>([3, 2, 5]);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);
  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-400">
      <CameraViewButtons
        onChangeView={setCameraView}
        onFrontView={() => {
          if (!controlsRef.current) return;

          animateCameraToView({
            camera: controlsRef.current.object as THREE.PerspectiveCamera,
            controls: controlsRef.current,
            position: [0, 0, 5],
            target: [0, 0, 0],
          });
        }}
        onBackView={() => {
          if (!controlsRef.current) return;

          animateCameraToView({
            camera: controlsRef.current.object as THREE.PerspectiveCamera,
            controls: controlsRef.current,
            position: [0, 0, -5],
            target: [0, 0, 0],
          });
        }}
        onDefaultView={() => {
          if (!controlsRef.current) return;

          animateCameraToView({
            camera: controlsRef.current.object as THREE.PerspectiveCamera,
            controls: controlsRef.current,
            position: [3, 2, 5],
            target: [0, 0, 0],
          });
        }}
        onTopView={() => {
          if (!controlsRef.current) return;

          const camera = controlsRef.current.object;
          const current = camera.position.clone();

          const direction = new THREE.Vector3(current.x, 0, current.z).normalize();

          const topView: [number, number, number] = [direction.x * 1, 6, direction.z * 1];

          animateCameraToView({
            camera: camera as THREE.PerspectiveCamera,
            controls: controlsRef.current,
            position: topView,
            target: [0, 0, 0],
          });
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
        <directionalLight position={[5, 5, 5]} intensity={2.0} />
        <BikeModel
          onHoveredObjects={setHoveredObjects}
          onSelectedObjects={setSelectedObjects}
          onSelectPart={setSelectedPart}
          selectedPart={selectedPart}
        />

        <CameraController controlsRef={controlsRef} />
        <CameraZoomIn selectedObjects={selectedObjects} />
        <EffectComposer multisampling={4} autoClear={false}>
          <Outline
            selection={[...selectedObjects,...hoveredObjects]}
            edgeStrength={6}
            pulseSpeed={0}
            visibleEdgeColor={0x1e90ff}
            hiddenEdgeColor={0x1e90ff}
            // blur
          />

          <Bloom intensity={0.15} luminanceThreshold={0.2} luminanceSmoothing={1.5} />
        </EffectComposer>
      </Canvas>
      <ProductSidebar selectedPart={selectedPart} />
    </div>
  );
}
