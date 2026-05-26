// export type BikePart =
//   | 'wheel_front'
//   | 'wheel_back'
//   | 'frame'
//   | 'handlebar'
//   | 'saddle'
//   | 'chain'
//   | 'pedal';

export type BikePart = string;

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const productsByPart: Record<BikePart, Product[]> = {
  wheel_front: [
    {
      id: 'front-wheel-1',
      name: '轻量前轮组',
      price: 129,
      description: '适合城市通勤与轻度运动。',
      image: '/placeholder-product.png',
    },
  ],
  wheel_back: [
    {
      id: 'rear-wheel-1',
      name: '耐用后轮组',
      price: 139,
      description: '加强辐条结构，适合日常骑行。',
      image: '/placeholder-product.png',
    },
  ],
  frame: [
    {
      id: 'frame-1',
      name: '铝合金车架',
      price: 399,
      description: '轻量、坚固，适合入门升级。',
      image: '/placeholder-product.png',
    },
  ],
  handlebar: [
    {
      id: 'handlebar-1',
      name: '人体工学车把',
      price: 49,
      description: '提升长时间骑行舒适度。',
      image: '/placeholder-product.png',
    },
  ],
  saddle: [
    {
      id: 'saddle-1',
      name: '舒适运动坐垫',
      price: 59,
      description: '适合通勤与周末骑行。',
      image: '/placeholder-product.png',
    },
  ],
  chain: [
    {
      id: 'chain-1',
      name: '防锈自行车链条',
      price: 24,
      description: '顺滑传动，易于维护。',
      image: '/placeholder-product.png',
    },
  ],
  pedal: [
    {
      id: 'pedal-1',
      name: '防滑脚踏',
      price: 29,
      description: '稳定抓脚，雨天也安心。',
      image: '/placeholder-product.png',
    },
  ],
};

// export const productsByPart = {
//   Front_tire: [],
//   Saddle: [],
//   Rear_brake: [],
//   Handlebar: [],
//   wheel_back: [],
// } as const;

// export type BikePart = keyof typeof productsByPart;

export function isBikePart(value: string): value is BikePart {
  return value in productsByPart;
}