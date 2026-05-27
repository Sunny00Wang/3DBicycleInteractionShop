'use client';

type CameraViewButtonsProps = {
  onChangeView: (view: [number, number, number]) => void;
  onTopView: () => void;
};

export default function CameraViewButtons({ onChangeView,onTopView }: CameraViewButtonsProps) {
  return (
    <div className="absolute left-6 top-6 z-10 flex gap-2">
      <button
        onClick={() => onChangeView([3, 2, 5])}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        默认
      </button>

      <button
        onClick={() => onChangeView([0, 1.5, 6])}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        正面
      </button>

      <button
        onClick={() => onChangeView([0, 1.5, -6])}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        背面
      </button>

      <button
        onClick={onTopView}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        俯视
      </button>
    </div>
  );
}
