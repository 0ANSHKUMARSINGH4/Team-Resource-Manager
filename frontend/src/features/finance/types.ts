export interface Transaction {
  id: number
  desc: string
  amount: number
  date: string
  type: 'income' | 'expense' | 'INCOME' | 'EXPENSE'
  category?: string
}

export interface FinanceSummary {
  budget: number
  expenses: number
  netIncome: number
}
