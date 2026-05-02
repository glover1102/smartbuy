import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">SmartBuy</h1>
          <p className="text-2xl font-semibold mb-3 text-emerald-100">
            Make Your Membership Pay For Itself
          </p>
          <p className="text-lg text-emerald-200 mb-10 max-w-2xl mx-auto">
            Split bulk warehouse purchases with neighbors in your ZIP code.
            Share Costco, Sam&apos;s Club, and BJ&apos;s deals — save up to 70%.
          </p>
          <form action="/feed" method="get" className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              name="zip"
              placeholder="Enter your ZIP code"
              pattern="\d{5}"
              maxLength={5}
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Find Deals
            </button>
          </form>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How SmartBuy Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "🔍", title: "Find a Split", desc: "Browse bulk buys in your ZIP code posted by neighbors." },
              { step: "2", icon: "🤝", title: "Claim Your Share", desc: "Join a split and secure your portion of the bulk purchase." },
              { step: "3", icon: "💰", title: "Save Big", desc: "Pay only your share. Pick up locally. Save up to 70%." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{icon}</div>
                <div className="text-emerald-600 font-bold text-sm uppercase tracking-wide mb-2">Step {step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings comparison */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Real Savings, Real Examples
          </h2>
          <p className="text-center text-gray-600 mb-10">See how much you can save splitting bulk purchases</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="text-left p-4">Item</th>
                  <th className="text-right p-4">Bulk Price</th>
                  <th className="text-right p-4">Your Share (1/4)</th>
                  <th className="text-right p-4">Retail</th>
                  <th className="text-right p-4 text-orange-300">You Save</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Costco Organic Olive Oil (2L)", bulk: "$19.99", share: "$5.00", retail: "$16.99", save: "71%" },
                  { item: "Sam's Club Paper Towels (30pk)", bulk: "$24.98", share: "$6.25", retail: "$22.00", save: "72%" },
                  { item: "Costco Parmigiano Reggiano (2lb)", bulk: "$21.99", share: "$11.00", retail: "$18.99", save: "42%" },
                ].map((row) => (
                  <tr key={row.item} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{row.item}</td>
                    <td className="p-4 text-right text-gray-600">{row.bulk}</td>
                    <td className="p-4 text-right font-semibold text-emerald-600">{row.share}</td>
                    <td className="p-4 text-right text-gray-500">{row.retail}</td>
                    <td className="p-4 text-right font-bold text-orange-500">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start saving?</h2>
        <p className="text-emerald-100 mb-8">Post your own bulk buy or join one near you.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/buys/new" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            Post a Buy
          </Link>
          <Link href="/feed" className="border-2 border-white text-white hover:bg-emerald-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Browse Deals
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 SmartBuy Contributors · MIT License</p>
      </footer>
    </div>
  );
}
