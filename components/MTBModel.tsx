'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import type { BikePart } from '@/data/products';
import { isBikePart } from '@/data/products';

type MTBModelProps = {
  onSelectPart: (part: BikePart | null) => void;
};


export default function BikeModel({ onSelectPart }: MTBModelProps) {
    const gltf = useGLTF('/models/MTB.glb');
    
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(child.name);
                
                child.userData.clickable = true
            }
        })
    }, [gltf])
    return (
        <primitive
            object={gltf.scene}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                const name = e.object.name;

                if (isBikePart(name)) {
                    onSelectPart(name);
                } else {
                    console.log('No product mapping for:', name);
                    onSelectPart(null);

                }
            }
            } />
  );
}
