import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { NewBuyForm } from "@/src/components/NewBuyForm";

export default async function NewBuyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/buys/new");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Bulk Buy</h1>
        <p className="text-gray-500 mb-8">List a warehouse deal and split it with neighbors.</p>
        <NewBuyForm />
      </div>
    </div>
  );
}
