import api from '@/lib/axios'
import type { Transaction, TransactionRequest, FinanceSummary } from './types'

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await api.get<Transaction[]>('/finance/transactions')
    return response.data
  } catch (error) {
    console.warn('Finance transactions fallback:', error)
    return []
  }
}

export async function getFinanceSummary(): Promise<FinanceSummary | null> {
  try {
    const response = await api.get<FinanceSummary>('/finance/summary')
    return response.data
  } catch (error) {
    console.warn('Finance summary fallback:', error)
    return null
  }
}

export async function createTransaction(data: TransactionRequest): Promise<Transaction> {
  const response = await api.post<Transaction>('/finance/transactions', data)
  return response.data
}

export async function deleteTransaction(id: number): Promise<void> {
  await api.delete(`/finance/transactions/${id}`)
}
