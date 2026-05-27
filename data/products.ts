export type BikePart =
  | 'frame'
  | 'fork'
  | 'brake_front'
  | 'brake_rear'
  | 'wheel_front'
  | 'wheel_back'
  | 'handlebar'
  | 'grip'
  | 'shifter_left'
  | 'shifter_right'
  | 'cable'
  | 'front_derailleur'
  | 'rear_derailleur'
  | 'pedal'
  | 'crankset'
  | 'chain'
  | 'saddle';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const productsByPart: Record<BikePart, Product[]> = {
  frame: [
    {
      id: 'frame-1',
      name: '铝合金山地车车架',
      price: 399,
      description: '轻量坚固，适合山地车入门升级。',
      image: '/placeholder-product.png',
    },
  ],

  fork: [
    {
      id: 'fork-1',
      name: '避震前叉',
      price: 189,
      description: '提升颠簸路面的操控与舒适性。',
      image: '/placeholder-product.png',
    },
  ],

  brake_front: [
    {
      id: 'front-brake-1',
      name: '前碟刹套件',
      price: 79,
      description: '稳定制动，适合城市与轻度越野骑行。',
      image: '/placeholder-product.png',
    },
  ],

  brake_rear: [
    {
      id: 'rear-brake-1',
      name: '后碟刹套件',
      price: 79,
      description: '提供可靠后轮制动力，提升安全性。',
      image: '/placeholder-product.png',
    },
  ],

  wheel_front: [
    {
      id: 'front-wheel-1',
      name: '山地车前轮组',
      price: 129,
      description: '耐用轮圈结构，适合日常骑行与轻度越野。',
      image: '/placeholder-product.png',
    },
  ],

  wheel_back: [
    {
      id: 'rear-wheel-1',
      name: '山地车后轮组',
      price: 139,
      description: '加强辐条结构，适合承受更高传动负载。',
      image: '/placeholder-product.png',
    },
  ],

  handlebar: [
    {
      id: 'handlebar-1',
      name: '山地车直把',
      price: 49,
      description: '提升操控稳定性，适合宽胎山地车。',
      image: '/placeholder-product.png',
    },
  ],

  grip: [
    {
      id: 'grip-1',
      name: '防滑车把套',
      price: 19,
      description: '增强握持感，减少长时间骑行手部疲劳。',
      image: '/placeholder-product.png',
    },
  ],

  shifter_left: [
    {
      id: 'left-shifter-1',
      name: '左变速指拨',
      price: 39,
      description: '控制前变速器，换挡清晰稳定。',
      image: '/placeholder-product.png',
    },
  ],

  shifter_right: [
    {
      id: 'right-shifter-1',
      name: '右变速指拨',
      price: 39,
      description: '控制后变速器，适合多速飞轮系统。',
      image: '/placeholder-product.png',
    },
  ],

  cable: [
    {
      id: 'cable-1',
      name: '变速线管套装',
      price: 15,
      description: '提升变速响应，适合维护和替换。',
      image: '/placeholder-product.png',
    },
  ],

  front_derailleur: [
    {
      id: 'front-derailleur-1',
      name: '前变速器',
      price: 59,
      description: '负责牙盘间切换，适合多盘传动系统。',
      image: '/placeholder-product.png',
    },
  ],

  rear_derailleur: [
    {
      id: 'rear-derailleur-1',
      name: '后变速器',
      price: 89,
      description: '提供顺滑后轮变速体验。',
      image: '/placeholder-product.png',
    },
  ],

  pedal: [
    {
      id: 'pedal-1',
      name: '防滑山地脚踏',
      price: 29,
      description: '增强踩踏稳定性，雨天也更安心。',
      image: '/placeholder-product.png',
    },
  ],

  crankset: [
    {
      id: 'crankset-1',
      name: '山地车牙盘曲柄组',
      price: 99,
      description: '传动效率稳定，适合日常骑行升级。',
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

  saddle: [
    {
      id: 'saddle-1',
      name: '舒适运动坐垫',
      price: 59,
      description: '兼顾支撑与舒适性，适合通勤和周末骑行。',
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
