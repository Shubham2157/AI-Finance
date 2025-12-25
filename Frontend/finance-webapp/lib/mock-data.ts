export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: "income" | "expense"
}

export interface MonthlyData {
  month: string
  income: number
  expenses: number
  savings: number
}

export interface CategorySpending {
  category: string
  amount: number
  percentage: number
  color: string
}

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2024-01-15", description: "Salary Deposit", amount: 5000, category: "Salary", type: "income" },
  {
    id: "2",
    date: "2024-01-14",
    description: "Grocery Shopping",
    amount: -150,
    category: "Groceries",
    type: "expense",
  },
  { id: "3", date: "2024-01-13", description: "Electric Bill", amount: -85, category: "Utilities", type: "expense" },
  { id: "4", date: "2024-01-12", description: "Restaurant Dinner", amount: -65, category: "Dining", type: "expense" },
  { id: "5", date: "2024-01-11", description: "Freelance Project", amount: 800, category: "Freelance", type: "income" },
  { id: "6", date: "2024-01-10", description: "Gas Station", amount: -45, category: "Transportation", type: "expense" },
  {
    id: "7",
    date: "2024-01-09",
    description: "Netflix Subscription",
    amount: -15,
    category: "Entertainment",
    type: "expense",
  },
  { id: "8", date: "2024-01-08", description: "Gym Membership", amount: -50, category: "Health", type: "expense" },
  { id: "9", date: "2024-01-07", description: "Online Shopping", amount: -120, category: "Shopping", type: "expense" },
  { id: "10", date: "2024-01-06", description: "Coffee Shop", amount: -8, category: "Dining", type: "expense" },
  { id: "11", date: "2024-01-05", description: "Rent Payment", amount: -1200, category: "Housing", type: "expense" },
  {
    id: "12",
    date: "2024-01-04",
    description: "Investment Return",
    amount: 250,
    category: "Investment",
    type: "income",
  },
]

export const monthlyData: MonthlyData[] = [
  { month: "Jul", income: 5200, expenses: 3800, savings: 1400 },
  { month: "Aug", income: 5500, expenses: 4100, savings: 1400 },
  { month: "Sep", income: 5300, expenses: 3900, savings: 1400 },
  { month: "Oct", income: 5800, expenses: 4200, savings: 1600 },
  { month: "Nov", income: 5400, expenses: 3700, savings: 1700 },
  { month: "Dec", income: 6200, expenses: 4500, savings: 1700 },
]

export const categorySpending: CategorySpending[] = [
  { category: "Housing", amount: 1200, percentage: 35, color: "hsl(var(--chart-1))" },
  { category: "Groceries", amount: 450, percentage: 13, color: "hsl(var(--chart-2))" },
  { category: "Transportation", amount: 280, percentage: 8, color: "hsl(var(--chart-3))" },
  { category: "Dining", amount: 320, percentage: 9, color: "hsl(var(--chart-4))" },
  { category: "Shopping", amount: 380, percentage: 11, color: "hsl(var(--chart-5))" },
  { category: "Utilities", amount: 200, percentage: 6, color: "hsl(142 76% 45%)" },
  { category: "Entertainment", amount: 150, percentage: 4, color: "hsl(173 58% 45%)" },
  { category: "Health", amount: 180, percentage: 5, color: "hsl(197 37% 50%)" },
  { category: "Other", amount: 310, percentage: 9, color: "hsl(173 58% 65%)" },
]

export const categories = [
  "All",
  "Salary",
  "Freelance",
  "Investment",
  "Housing",
  "Groceries",
  "Transportation",
  "Dining",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
]
