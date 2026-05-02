import Link from "next/link";
import { BulkBuyCard } from "@/src/components/BulkBuyCard";

interface BulkBuy {
  id: string;
  title: string;
  store: string;
  totalPrice: string;
  splitsNeeded: number;
  splitsClaimed: number;
  unitLabel: string;
  zipCode: string;
  status: string;
  organizer: { displayName: string };
}

async function getBuys(zip?: string): Promise<BulkBuy[]> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const url = zip ? `${base}/api/buys?zip=${zip}` : `${base}/api/buys`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: { zip?: string };
}) {
  const zip = searchParams.zip;
  const buys = await getBuys(zip);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {zip ? `Bulk Buys near ${zip}` : "All Bulk Buys"}
            </h1>
            <p className="text-gray-500 mt-1">{buys.length} active splits</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <form action="/feed" method="get" className="flex gap-2">
              <input
                type="text"
                name="zip"
                defaultValue={zip}
                placeholder="ZIP code"
                maxLength={5}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Filter
              </button>
            </form>
            <Link
              href="/buys/new"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              + Post a Buy
            </Link>
          </div>
        </div>

        {buys.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No bulk buys found</h2>
            <p className="text-gray-500 mb-6">
              {zip ? `No active splits in ZIP ${zip} yet.` : "No active splits yet."}
            </p>
            <Link
              href="/buys/new"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Be the first to post one!
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buys.map((buy) => (
              <BulkBuyCard key={buy.id} buy={buy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
