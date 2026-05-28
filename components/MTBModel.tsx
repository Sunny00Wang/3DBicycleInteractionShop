'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import type { BikePart } from '@/data/products';
// import { isBikePart } from '@/data/products';

import { getPartFromMeshName } from '@/data/meshToPart';

type MTBModelProps = {
  onSelectedObjects: (objects: THREE.Object3D[]) => void;
  onHoveredObjects: (objects: THREE.Object3D[]) => void;
  onSelectPart: (part: BikePart | null) => void;
  selectedPart: BikePart | null;
};

export default function BikeModel({
  onSelectPart,
  onSelectedObjects,
  onHoveredObjects,
  selectedPart,
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

  // useEffect(() => {
  //   gltf.scene.traverse((child) => {
  //     if (!(child instanceof THREE.Mesh)) return;

  //     const childPart = getPartFromMeshName(child.name);

  //     const isHovered = childPart === selectedPart;

  //     const materials = Array.isArray(child.material) ? child.material : [child.material];

  //     materials.forEach((material) => {
  //       if (!('emissive' in material)) return;

  //       material.emissive.set(isHovered ? '#1e90ff' : '#000000');

  //       material.emissiveIntensity = isHovered ? 0.15 : 0;

  //       material.needsUpdate = true;
  //     });
  //   });
  // }, [gltf.scene, selectedPart]);

  return (
    <primitive
      object={gltf.scene}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        // e.stopPropagation();
        // const name = e.object.name;
        // const part = getPartFromMeshName(name);

        // if (!part) {
        //   console.log('No product mapping for:', name);
        //   onSelectPart(null);
        //   onSelectedObjects([]);
        //   return;
        // }
        // console.log('Pointing part:', part);
        // onSelectPart(part);
        // onSelectedObjects(partObjectsMap.get(part) ?? []);

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

        const objects = partObjectsMap.get(part) ?? [];

        console.log('clicked mesh:', e.object.name);

        console.log(
          'selected group:',
          objects.map((obj) => obj.name)
        );

        onSelectPart(part);
        onSelectedObjects(objects);
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        const part = getPartFromMeshName(e.object.name);
        onHoveredObjects(part ? (partObjectsMap.get(part) ?? []) : []);
      }}
      onPointerOut={() => {
        onHoveredObjects([]);
      }}
    />
  );
}
