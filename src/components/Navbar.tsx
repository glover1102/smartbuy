import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-bold text-xl text-emerald-700">SmartBuy</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/feed"
            className="text-gray-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/buys/new"
            className="text-gray-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            Post a Buy
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden sm:block">
                {session.user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
