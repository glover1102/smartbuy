"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewBuyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    store: "COSTCO",
    itemUrl: "",
    totalPrice: "",
    totalQuantity: "",
    unitLabel: "",
    splitsNeeded: "",
    pickupNotes: "",
    zipCode: "",
  });

  const perPerson =
    form.totalPrice && form.splitsNeeded
      ? (parseFloat(form.totalPrice) / parseInt(form.splitsNeeded)).toFixed(2)
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/buys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create bulk buy");
      }
      const buy = await res.json();
      router.push(`/buys/${buy.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          required
          minLength={3}
          maxLength={100}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g., Costco Organic Olive Oil 2L"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Store *</label>
        <select
          value={form.store}
          onChange={(e) => setForm({ ...form, store: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="COSTCO">Costco</option>
          <option value="SAMS_CLUB">Sam&apos;s Club</option>
          <option value="BJS">BJ&apos;s</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          required
          minLength={10}
          maxLength={1000}
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the item, size, brand, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item URL (optional)</label>
        <input
          type="url"
          value={form.itemUrl}
          onChange={(e) => setForm({ ...form, itemUrl: e.target.value })}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price ($) *</label>
          <input
            type="number"
            required
            min="0.01"
            step="0.01"
            value={form.totalPrice}
            onChange={(e) => setForm({ ...form, totalPrice: e.target.value })}
            placeholder="19.99"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity *</label>
          <input
            type="number"
            required
            min="1"
            step="1"
            value={form.totalQuantity}
            onChange={(e) => setForm({ ...form, totalQuantity: e.target.value })}
            placeholder="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit Label *</label>
          <input
            type="text"
            required
            maxLength={50}
            value={form.unitLabel}
            onChange={(e) => setForm({ ...form, unitLabel: e.target.value })}
            placeholder="bottle, bag, pack..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Splits Needed *</label>
          <input
            type="number"
            required
            min="2"
            max="100"
            step="1"
            value={form.splitsNeeded}
            onChange={(e) => setForm({ ...form, splitsNeeded: e.target.value })}
            placeholder="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {perPerson && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-emerald-800 text-sm font-medium">
            💡 Each person pays{" "}
            <span className="text-2xl font-bold">${perPerson}</span>
            {form.unitLabel && ` per ${form.unitLabel}`}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
        <input
          type="text"
          required
          pattern="\d{5}"
          maxLength={5}
          value={form.zipCode}
          onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
          placeholder="10001"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Notes *</label>
        <textarea
          required
          minLength={5}
          maxLength={500}
          rows={2}
          value={form.pickupNotes}
          onChange={(e) => setForm({ ...form, pickupNotes: e.target.value })}
          placeholder="Available weekends, contact via email, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {loading ? "Posting..." : "Post Bulk Buy"}
      </button>
    </form>
  );
}
