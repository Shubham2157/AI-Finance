"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockTransactions, monthlyData, categorySpending } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard-layout"

export default function DashboardPage() {
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

  // Calculate summary statistics
  const totalIncome = mockTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(
    mockTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
  )
  const netSavings = totalIncome - totalExpenses
  const recentTransactions = mockTransactions.slice(0, 5)

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">Dashboard Overview</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Welcome back! Here's your financial summary</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Total Income</CardTitle>
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white truncate">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Total Expenses</CardTitle>
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white truncate">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">Net Savings</CardTitle>
              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white truncate">${netSavings.toLocaleString()}</div>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">+28.4% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Monthly Overview Chart */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ChartContainer
                  config={{
                    income: {
                      label: "Income",
                      color: "hsl(142 76% 36%)",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(0 84% 60%)",
                    },
                    savings: {
                      label: "Savings",
                      color: "hsl(173 58% 39%)",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="savings" fill="var(--color-savings)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Spending Pie Chart */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg dark:text-white">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-64 sm:h-80 w-full">
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => {
                          const data = entry.payload as any
                          return `${data.category} ${data.percentage}%`
                        }}
                        wrapperStyle={{ paddingTop: '20px' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg dark:text-white">Recent Transactions</CardTitle>
            <Link href="/transactions">
              <Button variant="ghost" className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 h-auto px-2 py-1 sm:px-4 sm:py-2">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 hover:border-emerald-200 dark:hover:border-emerald-400 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "income" ? "bg-emerald-100 dark:bg-emerald-900" : "bg-slate-100 dark:bg-slate-600"
                      }`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm sm:text-base truncate">{transaction.description}</p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold text-sm sm:text-base whitespace-nowrap ml-2 ${
                      transaction.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
