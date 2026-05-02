interface ProgressBarProps {
  claimed: number;
  needed: number;
}

export function ProgressBar({ claimed, needed }: ProgressBarProps) {
  const pct = needed > 0 ? Math.min((claimed / needed) * 100, 100) : 0;
  const color =
    pct >= 100
      ? "bg-orange-500"
      : pct >= 75
      ? "bg-yellow-500"
      : "bg-emerald-500";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>
          {claimed} / {needed} splits claimed
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
