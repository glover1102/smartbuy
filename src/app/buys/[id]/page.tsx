import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { StoreBadge } from "@/src/components/StoreBadge";
import { ProgressBar } from "@/src/components/ProgressBar";
import { ClaimButton } from "@/src/components/ClaimButton";
import { CommentSection } from "@/src/components/CommentSection";
import { StatusControl } from "@/src/components/StatusControl";

interface BuyDetail {
  id: string;
  title: string;
  description: string;
  store: string;
  itemUrl: string | null;
  totalPrice: string;
  totalQuantity: number;
  unitLabel: string;
  splitsNeeded: number;
  splitsClaimed: number;
  pickupNotes: string;
  zipCode: string;
  status: string;
  organizerId: string;
  organizer: { displayName: string; email: string };
  claims: { id: string; quantity: number; userId: string; user: { displayName: string; email: string } }[];
  comments: { id: string; body: string; createdAt: string; user: { displayName: string; email: string } }[];
}

async function getBuy(id: string): Promise<BuyDetail | null> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/buys/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function BuyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [buy, session] = await Promise.all([
    getBuy(id),
    getServerSession(authOptions),
  ]);

  if (!buy) notFound();

  const perPerson = buy.splitsNeeded > 0
    ? (Number(buy.totalPrice) / buy.splitsNeeded).toFixed(2)
    : "0.00";

  const userClaim = session?.user
    ? buy.claims.find((c) => c.userId === session.user.id)
    : null;

  const isOrganizer = session?.user?.id === buy.organizerId;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex gap-2 flex-wrap">
              <StoreBadge store={buy.store} />
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {buy.status}
              </span>
            </div>
            <span className="text-sm text-gray-400">📍 {buy.zipCode}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{buy.title}</h1>
          <p className="text-gray-500 text-sm mb-4">
            Posted by {buy.organizer.displayName || buy.organizer.email}
          </p>
          <p className="text-gray-700 mb-6">{buy.description}</p>

          {buy.itemUrl && (
            <a
              href={buy.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline text-sm"
            >
              🔗 View item
            </a>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Per Person</div>
              <div className="text-2xl font-bold text-emerald-600">${perPerson}</div>
              <div className="text-sm text-gray-500">per {buy.unitLabel}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Total Price</div>
              <div className="text-2xl font-bold text-gray-900">${Number(buy.totalPrice).toFixed(2)}</div>
              <div className="text-sm text-gray-500">{buy.totalQuantity} {buy.unitLabel} total</div>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar claimed={buy.splitsClaimed} needed={buy.splitsNeeded} />
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-medium text-amber-800">📦 Pickup Notes</p>
            <p className="text-sm text-amber-700 mt-1">{buy.pickupNotes}</p>
          </div>

          {isOrganizer && (
            <div className="mt-4">
              <StatusControl buyId={buy.id} currentStatus={buy.status} />
            </div>
          )}

          {!isOrganizer && session?.user && buy.status === "OPEN" && (
            <div className="mt-4">
              <ClaimButton buyId={buy.id} existingClaim={userClaim ?? null} />
            </div>
          )}

          {!session?.user && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-sm text-blue-700">
                <a href="/auth/signin" className="font-semibold underline">Sign in</a> to claim your split
              </p>
            </div>
          )}
        </div>

        {/* Claims */}
        {buy.claims.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Claims ({buy.claims.length})</h2>
            <div className="space-y-2">
              {buy.claims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">
                    {claim.user.displayName || claim.user.email}
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    {claim.quantity} {buy.unitLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <CommentSection buyId={buy.id} comments={buy.comments} isSignedIn={!!session?.user} />
      </div>
    </div>
  );
}
