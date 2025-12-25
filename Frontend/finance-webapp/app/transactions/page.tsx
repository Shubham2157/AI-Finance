"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockTransactions, categories, type Transaction } from "@/lib/mock-data"
import DashboardLayout from "@/components/dashboard-layout"

export default function TransactionsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    let filtered = transactions

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((t) => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((t) => t.category === categoryFilter)
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter((t) => new Date(t.date) >= new Date(dateFrom))
    }
    if (dateTo) {
      filtered = filtered.filter((t) => new Date(t.date) <= new Date(dateTo))
    }

    setFilteredTransactions(filtered)
  }, [searchTerm, categoryFilter, dateFrom, dateTo, transactions])

  const handleAddTransaction = () => {
    const transaction: Transaction = {
      id: String(transactions.length + 1),
      description: newTransaction.description,
      amount:
        newTransaction.type === "expense" ? -Math.abs(Number(newTransaction.amount)) : Number(newTransaction.amount),
      category: newTransaction.category,
      type: newTransaction.type,
      date: newTransaction.date,
    }

    setTransactions([transaction, ...transactions])
    setIsAddDialogOpen(false)
    setNewTransaction({
      description: "",
      amount: "",
      category: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("All")
    setDateFrom("")
    setDateTo("")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">Transactions</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">View and manage all your transactions</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto text-sm sm:text-base">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Add New Transaction</DialogTitle>
                <DialogDescription className="text-sm">Enter the details of your transaction</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm">Description</Label>
                  <Input
                    id="description"
                    placeholder="e.g., Grocery shopping"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm">Type</Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value: "income" | "expense") =>
                      setNewTransaction({ ...newTransaction, type: value })
                    }
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm">Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c !== "All")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <Button onClick={handleAddTransaction} className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg dark:text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-xs sm:text-sm dark:text-slate-300">Search</Label>
                <Input
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs sm:text-sm dark:text-slate-300">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="dark:text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="text-xs sm:text-sm dark:text-slate-300">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo" className="text-xs sm:text-sm dark:text-slate-300">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4 bg-transparent text-xs sm:text-sm w-full sm:w-auto dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg dark:text-white">All Transactions ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">No transactions found</div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 hover:border-emerald-200 dark:hover:border-emerald-400 transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          transaction.type === "income" ? "bg-emerald-100 dark:bg-emerald-900" : "bg-slate-100 dark:bg-slate-600"
                        }`}
                      >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {transaction.type === "income" ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                          )}
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white text-sm sm:text-base truncate">{transaction.description}</p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4 flex-shrink-0 ml-2">
                      <div
                        className={`font-semibold text-sm sm:text-lg whitespace-nowrap ${
                          transaction.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          transaction.type === "income"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
