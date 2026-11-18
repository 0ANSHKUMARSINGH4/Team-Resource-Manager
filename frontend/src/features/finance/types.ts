export type TransactionType = 'INCOME' | 'EXPENSE' | 'income' | 'expense'

export interface Transaction {
  id: number
  description?: string
  desc?: string // Backward compatibility with legacy mock
  amount: number
  type: TransactionType
  category?: string
  transactionDate?: string
  date?: string // Backward compatibility with legacy mock
  recordedBy?: number
  createdAt?: string
}

export interface TransactionRequest {
  description: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  category?: string
  transactionDate?: string
}

export interface CashFlowPoint {
  month: string
  income: number
  expenses: number
  net: number
}

export interface FinanceSummary {
  totalBudget: number
  totalExpenses: number
  totalIncome: number
  netIncome: number
  profitMargin: number
  monthlyCashFlow: CashFlowPoint[]
}
