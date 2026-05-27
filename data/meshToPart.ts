import type { BikePart } from '@/data/products';

export function getPartFromMeshName(name: string): BikePart | null {
  if (name.startsWith('Frame')) return 'frame';
  if (name.startsWith('Fork')) return 'fork';

  if (name.startsWith('Front_brake')) return 'brake_front';
  if (name.startsWith('Rear_brake')) return 'brake_rear';

  if (name.startsWith('Front_rim') || name === 'Front_tire') {
    return 'wheel_front';
  }

  if (name.startsWith('Rear_rim') || name === 'Rear_tire') {
    return 'wheel_back';
  }

  if (name.startsWith('Handlebar')) return 'handlebar';

  if (name.includes('grip')) return 'grip';
  if (name.includes('shifter')) return name.startsWith('Left') ? 'shifter_left' : 'shifter_right';

  if (name.includes('gear_cable') || name.startsWith('Cable_catcher')) return 'cable';

  if (name.startsWith('Front_derailleur')) return 'front_derailleur';

  if (name.startsWith('Rear_derailleur')) return 'rear_derailleur';

  if (name.includes('pedal') || name.startsWith('Pedals')) return 'pedal';

  if (name === 'Front_gears') return 'crankset';
  if (name.startsWith('Chain')) return 'chain';

  if (name.startsWith('Saddle')) return 'saddle';

  return null;
}
