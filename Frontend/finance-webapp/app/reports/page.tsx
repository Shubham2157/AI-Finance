"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { monthlyData, categorySpending } from "@/lib/mock-data"
import DashboardLayout from "@/components/dashboard-layout"

export default function ReportsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const spendingTrends = monthlyData.map((data) => ({
    month: data.month,
    spending: data.expenses,
    budget: 4000,
  }))

  const dailySpending = [
    { day: "Mon", amount: 120 },
    { day: "Tue", amount: 85 },
    { day: "Wed", amount: 150 },
    { day: "Thu", amount: 95 },
    { day: "Fri", amount: 180 },
    { day: "Sat", amount: 220 },
    { day: "Sun", amount: 110 },
  ]

  const incomeExpensesTrend = monthlyData.map((data) => ({
    month: data.month,
    income: data.income,
    expenses: data.expenses,
  }))

  const topCategories = [...categorySpending].sort((a, b) => b.amount - a.amount).slice(0, 5)

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">Financial Reports</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Spending analysis and financial trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Avg Daily</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">$138</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Savings Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">28%</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+3% last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Budget Left</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">$1,240</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">31% remaining</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Top Expense</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">Housing</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">35% of total</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Income vs Expenses */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Income vs Expenses</CardTitle>
              <CardDescription className="text-xs sm:text-sm dark:text-slate-400">Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 sm:h-80">
                <ChartContainer
                  config={{
                    income: { label: "Income", color: "hsl(142 76% 36%)" },
                    expenses: { label: "Expenses", color: "hsl(0 84% 60%)" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={incomeExpensesTrend} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Area type="monotone" dataKey="income" stroke="hsl(142 76% 36%)" fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expenses" stroke="hsl(0 84% 60%)" fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Spending vs Budget */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Spending vs Budget</CardTitle>
              <CardDescription className="text-xs sm:text-sm dark:text-slate-400">Monthly tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 sm:h-80">
                <ChartContainer
                  config={{
                    spending: { label: "Spending", color: "hsl(173 58% 39%)" },
                    budget: { label: "Budget", color: "hsl(142 76% 36%)" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingTrends} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="spending" stroke="var(--color-spending)" strokeWidth={2} />
                      <Line type="monotone" dataKey="budget" stroke="var(--color-budget)" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Daily Pattern */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Daily Pattern</CardTitle>
              <CardDescription className="text-xs sm:text-sm dark:text-slate-400">Weekly habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 sm:h-80">
                <ChartContainer
                  config={{ amount: { label: "Amount", color: "hsl(173 58% 39%)" } }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailySpending} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="var(--color-amount)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Top Categories</CardTitle>
              <CardDescription className="text-xs sm:text-sm dark:text-slate-400">Biggest expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-200">{category.category}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${category.amount}</span>
                    </div>
                    <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{category.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg dark:text-white">Financial Insights</CardTitle>
            <CardDescription className="text-xs sm:text-sm dark:text-slate-400">Recommendations for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Great Savings</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">You are saving 28% of income, above the recommended 20%.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-7 4h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">High Dining</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Dining expenses are 15% higher. Try meal planning.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Income Up</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Income increased 12.5%. Consider increasing savings.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">On Track</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">5 of 6 budget categories on track. Great work!</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
