import * as THREE from 'three';
import type { OrbitControls } from 'three-stdlib';

type FocusParams = {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  objects: THREE.Object3D[];
  duration?: number;
  distanceMultiplier?: number;
};

export function focusCameraOnObjects({
  camera,
  controls,
  objects,
  duration = 900,
  distanceMultiplier = 2,
}: FocusParams) {
    if (objects.length === 0) return;
  const box = new THREE.Box3();

  objects.forEach((object) => {
    box.expandByObject(object);
  });

  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  box.getCenter(center);
  box.getSize(size);

  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const direction = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();

  const maxSize = Math.max(size.x, size.y, size.z);
  const distance = Math.max(maxSize * distanceMultiplier, 1.2);

    const startTime = performance.now();
    
    const endPosition = center.clone().add(direction.multiplyScalar(distance));
    const endTarget = center.clone();

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  function animate(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      
      camera.position.lerpVectors(startPosition, endPosition, eased);
      controls.target.lerpVectors(startTarget, endTarget, eased);

      controls.update();

      if (progress < 1) {
          requestAnimationFrame(animate);
      }

  }
    requestAnimationFrame(animate);
  // animation...
}
