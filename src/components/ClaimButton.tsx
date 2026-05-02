"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ClaimButtonProps {
  buyId: string;
  existingClaim: { id: string; quantity: number } | null;
}

export function ClaimButton({ buyId, existingClaim }: ClaimButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(existingClaim?.quantity ?? 1);

  async function handleClaim() {
    setLoading(true);
    try {
      const res = await fetch(`/api/buys/${buyId}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleUnclaim() {
    setLoading(true);
    try {
      await fetch(`/api/buys/${buyId}/claim`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (existingClaim) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-emerald-600 font-medium">✓ You claimed {existingClaim.quantity} unit(s)</span>
        <button
          onClick={handleUnclaim}
          disabled={loading}
          className="text-sm text-red-500 hover:text-red-700 disabled:opacity-60"
        >
          Leave split
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />
      <button
        onClick={handleClaim}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors"
      >
        {loading ? "Joining..." : "Claim Split"}
      </button>
    </div>
  );
}
