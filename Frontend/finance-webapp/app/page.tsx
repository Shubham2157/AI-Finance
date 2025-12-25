import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 text-balance">
            Take Control of Your Financial Future
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance leading-relaxed">
            Track expenses, analyze spending patterns, and make smarter financial decisions with our intuitive dashboard
            and powerful insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Visual Analytics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Interactive charts and graphs to understand your spending patterns
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Tracking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically categorize and organize all your transactions
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Budget Insights</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get personalized recommendations to optimize your finances
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
