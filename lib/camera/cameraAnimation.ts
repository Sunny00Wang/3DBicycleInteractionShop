import * as THREE from 'three';
import type { OrbitControls } from 'three-stdlib';

type AnimateCameraToViewParams = {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  position: [number, number, number];
  target: [number, number, number];
  duration?: number;
};

export function animateCameraToView({
  camera,
  controls,
  position,
  target,
  duration = 700,
}: AnimateCameraToViewParams) {
  const startPosition = camera.position.clone();
  const endPosition = new THREE.Vector3(...position);

  const startTarget = controls.target.clone();
  const endTarget = new THREE.Vector3(...target);

  const startTime = performance.now();

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function animate(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeInOutCubic(progress);

    camera.position.lerpVectors(startPosition, endPosition, eased);
    controls.target.lerpVectors(startTarget, endTarget, eased);

    controls.update();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
