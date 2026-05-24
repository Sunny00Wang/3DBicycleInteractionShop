'use client';

import { useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import type { BikePart } from '@/data/products';

type BikeModelProps = {
  selectedPart: BikePart | null;
  onSelectPart: (part: BikePart) => void;
};

export default function BikeModel({ selectedPart, onSelectPart }: BikeModelProps) {
  const [hoveredPart, setHoveredPart] = useState<BikePart | null>(null);

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const part = event.object.name as BikePart;
    onSelectPart(part);
  }

  function handlePointerEnter(part: BikePart) {
    document.body.style.cursor = 'pointer';
    setHoveredPart(part);
  }

  function handlePointerLeave() {
    document.body.style.cursor = 'default';
    setHoveredPart(null);
  }

//   function getColor(part: BikePart) {
//     if (selectedPart === part) return '#38bdf8';

//     if (hoveredPart === part) return '#94a3b8';

//     return '#475569';
//   }
    
    function getMaterial(part: BikePart) {
      const isSelected = selectedPart === part;
      const isHovered = hoveredPart === part;

      return {
        color: isSelected ? '#38bdf8' : isHovered ? '#94a3b8' : '#475569',
        emissive: isSelected ? '#38bdf8' : isHovered ? '#1e293b' : '#000000',
        emissiveIntensity: isSelected ? 0.8 : isHovered ? 0.35 : 0,
      };
    }

  return (
    <group>
      {/* 后轮 */}
      <mesh
        name="wheel_back"
        position={[-1.4, -0.6, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('wheel_back')}
        onPointerLeave={handlePointerLeave}
      >
        <torusGeometry args={[0.55, 0.045, 16, 64]} />
        <meshStandardMaterial {...getMaterial('wheel_back')} />
      </mesh>

      {/* 前轮 */}
      <mesh
        name="wheel_front"
        position={[1.4, -0.6, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('wheel_front')}
        onPointerLeave={handlePointerLeave}
      >
        <torusGeometry args={[0.55, 0.045, 16, 64]} />
        <meshStandardMaterial {...getMaterial('wheel_front')} />
      </mesh>

      {/* 车架 */}
      <mesh
        name="frame"
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('frame')}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[2.1, 0.08, 0.08]} />
        <meshStandardMaterial {...getMaterial('frame')} />
      </mesh>

      {/* 车座 */}
      <mesh
        name="saddle"
        position={[-0.35, 0.55, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('saddle')}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[0.5, 0.12, 0.28]} />
        <meshStandardMaterial {...getMaterial('saddle')} />
      </mesh>

      {/* 车把 */}
      <mesh
        name="handlebar"
        position={[1.1, 0.55, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('handlebar')}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[0.65, 0.08, 0.08]} />
        <meshStandardMaterial {...getMaterial('handlebar')} />
      </mesh>

      {/* 链条 */}
      <mesh
        name="chain"
        position={[-0.45, -0.55, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('chain')}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[1.0, 0.06, 0.06]} />
        <meshStandardMaterial {...getMaterial('chain')} />
      </mesh>

      {/* 脚踏 */}
      <mesh
        name="pedal"
        position={[0.1, -0.35, 0]}
        onClick={handleClick}
        onPointerEnter={() => handlePointerEnter('pedal')}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[0.35, 0.08, 0.16]} />
        <meshStandardMaterial {...getMaterial('pedal')} />
      </mesh>
    </group>
  );
}
