"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: { displayName: string; email: string };
}

interface CommentSectionProps {
  buyId: string;
  comments: Comment[];
  isSignedIn: boolean;
}

export function CommentSection({ buyId, comments, isSignedIn }: CommentSectionProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/buys/${buyId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error("Failed");
      setBody("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="font-bold text-gray-900 mb-4">Comments ({comments.length})</h2>
      <div className="space-y-4 mb-6">
        {comments.map((c) => (
          <div key={c.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900">
                {c.user.displayName || c.user.email}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{c.body}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-gray-400">No comments yet.</p>
        )}
      </div>

      {isSignedIn ? (
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add a comment..."
            maxLength={1000}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !body.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400">
          <a href="/auth/signin" className="text-emerald-600 underline">Sign in</a> to comment.
        </p>
      )}
    </div>
  );
}
