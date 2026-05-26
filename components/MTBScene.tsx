'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BikeModel from './MTBModel';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import ProductSidebar from './ProductSidebar';
import type { BikePart } from '@/data/products';


export default function BikeScene() {
    const [selectedPart, setSelectedPart] = useState<BikePart | null>(null);
    return (
      <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
        <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <BikeModel onSelectPart={setSelectedPart} />

          <OrbitControls enableDamping />
          <EffectComposer>
            <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={1.2} />
          </EffectComposer>
        </Canvas>
        <ProductSidebar selectedPart={selectedPart} />
      </div>
    );
}
