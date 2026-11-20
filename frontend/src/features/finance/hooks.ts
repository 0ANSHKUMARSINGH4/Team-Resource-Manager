import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTransactions,
  getFinanceSummary,
  createTransaction,
  deleteTransaction,
} from './api'
import type { Transaction, TransactionRequest, FinanceSummary } from './types'

const fallbackTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Enterprise Client Retainer - Acme Corp',
    amount: 45000,
    type: 'INCOME',
    category: 'CLIENT_PAYMENT',
    transactionDate: '2026-02-05',
  },
  {
    id: 2,
    description: 'January Employee Payroll',
    amount: 89000,
    type: 'EXPENSE',
    category: 'SALARY',
    transactionDate: '2026-01-31',
  },
  {
    id: 3,
    description: 'Q1 Cloud Infrastructure (AWS)',
    amount: 14500,
    type: 'EXPENSE',
    category: 'SERVER',
    transactionDate: '2026-02-01',
  },
  {
    id: 4,
    description: 'Design Tooling Licenses (Figma & Adobe)',
    amount: 3200,
    type: 'EXPENSE',
    category: 'LICENSE',
    transactionDate: '2026-02-10',
  },
  {
    id: 5,
    description: 'SaaS Platform Subscription - TechCorp',
    amount: 12500,
    type: 'INCOME',
    category: 'CLIENT_PAYMENT',
    transactionDate: '2026-02-12',
  },
]

const fallbackSummary: FinanceSummary = {
  totalBudget: 128000,
  totalExpenses: 106700,
  totalIncome: 189500,
  netIncome: 82800,
  profitMargin: 43.7,
  monthlyCashFlow: [
    { month: 'Jan', income: 35000, expenses: 18000, net: 17000 },
    { month: 'Feb', income: 42000, expenses: 22000, net: 20000 },
    { month: 'Mar', income: 48000, expenses: 20000, net: 28000 },
    { month: 'Apr', income: 52000, expenses: 24000, net: 28000 },
    { month: 'May', income: 58000, expenses: 21000, net: 37000 },
    { month: 'Jun', income: 64000, expenses: 25000, net: 39000 },
  ],
}

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: ['finance-transactions'],
    queryFn: async () => {
      const data = await getTransactions()
      return data && data.length > 0 ? data : fallbackTransactions
    },
    placeholderData: fallbackTransactions,
  })
}

export function useFinanceSummary() {
  return useQuery<FinanceSummary>({
    queryKey: ['finance-summary'],
    queryFn: async () => {
      const data = await getFinanceSummary()
      return data || fallbackSummary
    },
    placeholderData: fallbackSummary,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: TransactionRequest) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['finance-summary'] })
    },
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['finance-summary'] })
    },
  })
}
