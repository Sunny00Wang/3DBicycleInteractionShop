'use client';

type CameraViewButtonsProps = {
  onChangeView: (view: [number, number, number]) => void;
  onTopView: () => void;
  onDefaultView: () => void;
  onFrontView: () => void;
  onBackView: () => void;
};

export default function CameraViewButtons({
  onTopView,
  onDefaultView,
  onFrontView,
  onBackView,
}: CameraViewButtonsProps) {
  return (
    <div className="absolute left-6 top-6 z-10 flex gap-2">
      <button
        onClick={onDefaultView}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        默认
      </button>

      <button
        onClick={onFrontView}
        className="rounded bg-white/10 px-3 py-2 text-white backdrop-blur"
      >
        正面
      </button>

      <button
        onClick={onBackView}
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
