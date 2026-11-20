import api from '@/lib/axios'
import type { DashboardStats } from './types'

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>('/dashboard/overview')
  return response.data
}
