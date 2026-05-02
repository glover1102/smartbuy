import Link from "next/link";
import { ProgressBar } from "./ProgressBar";
import { StoreBadge } from "./StoreBadge";

export interface BulkBuyCardProps {
  buy: {
    id: string;
    title: string;
    store: string;
    totalPrice: string | number;
    splitsNeeded: number;
    splitsClaimed: number;
    unitLabel: string;
    zipCode: string;
    status: string;
    organizer: { displayName: string };
  };
}

export function BulkBuyCard({ buy }: BulkBuyCardProps) {
  const perPerson =
    buy.splitsNeeded > 0
      ? (Number(buy.totalPrice) / buy.splitsNeeded).toFixed(2)
      : "0.00";

  const statusColors: Record<string, string> = {
    OPEN: "bg-emerald-100 text-emerald-800",
    FULL: "bg-orange-100 text-orange-800",
    PURCHASED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-gray-100 text-gray-700",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <Link href={`/buys/${buy.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex gap-2 flex-wrap">
            <StoreBadge store={buy.store} />
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                statusColors[buy.status] ?? statusColors.OPEN
              }`}
            >
              {buy.status}
            </span>
          </div>
          <span className="text-xs text-gray-400 shrink-0">📍 {buy.zipCode}</span>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {buy.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          by {buy.organizer.displayName || "Anonymous"}
        </p>

        <div className="mt-auto space-y-3">
          <ProgressBar
            claimed={buy.splitsClaimed}
            needed={buy.splitsNeeded}
          />
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-emerald-600">
                ${perPerson}
              </span>
              <span className="text-sm text-gray-500 ml-1">/ {buy.unitLabel}</span>
            </div>
            <span className="text-sm text-gray-500">
              Total: ${Number(buy.totalPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
