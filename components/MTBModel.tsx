'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect,useMemo } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import type { BikePart } from '@/data/products';
import { isBikePart } from '@/data/products';

import { getPartFromMeshName } from '@/data/meshToPart';

type MTBModelProps = {
  onSelectedObjects: (objects: THREE.Object3D[]) => void;
  onHoveredObjects: (objects: THREE.Object3D[]) => void;
  onSelectPart: (part: BikePart | null) => void;
};

export default function BikeModel({
  onSelectPart,
  onSelectedObjects,
  onHoveredObjects,
}: MTBModelProps) {
    const gltf = useGLTF('/models/MTB.glb');
    const partObjectsMap = useMemo(() => {

    const map = new Map<BikePart, THREE.Object3D[]>();
    gltf.scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const part = getPartFromMeshName(child.name);
        if (!part) return;
        if (!map.has(part)) {
            map.set(part, []);
        }
        map.get(part)!.push(child);
    });
    return map;
    }, [gltf.scene]);
    

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log(child.name);

        child.userData.clickable = true;
      }
    });
  }, [gltf]);
    return (
        <primitive
            object={gltf.scene}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                const name = e.object.name;
                const part = getPartFromMeshName(name);

                if (!part) {
                    console.log('No product mapping for:', name);
                    onSelectPart(null);
                    onSelectedObjects([]);
                    return;
                }
                console.log('Pointing part:', part);
                onSelectPart(part);
                onSelectedObjects(partObjectsMap.get(part) ?? []);
        
            }}
            onPointerMove={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();

                const part = getPartFromMeshName(e.object.name);
                onHoveredObjects(part ? partObjectsMap.get(part) ?? [] : []);
            }}
            onPointerOut={() =>{
                onHoveredObjects([]);
          }}
    />
  );
}
