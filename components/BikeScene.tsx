'use client';

import { useRef,useState,useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import BikeModel from './BikeModel';
import ProductSidebar from './ProductSidebar';
import type { BikePart } from '@/data/products';

function CameraController({ view }: { view: [number, number, number] }) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    camera.position.set(...view);
    camera.lookAt(0, 0, 0);
    controlsRef.current?.update();
  }, [view, camera]);

  return <OrbitControls ref={controlsRef} enableDamping />;
}

export default function BikeScene() {
  const [selectedPart, setSelectedPart] = useState<BikePart | null>(null);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <BikeModel selectedPart={selectedPart} onSelectPart={setSelectedPart} />

        <OrbitControls enableDamping />
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={1.2} />
        </EffectComposer>
      </Canvas>

      <ProductSidebar selectedPart={selectedPart} />
    </div>
  );
}
