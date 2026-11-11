import { useQuery } from '@tanstack/react-query'
import { fetchDashboardStats } from './api'
import type { DashboardStats } from './types'

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    placeholderData: {
      totalEmployees: 0,
      byDepartment: {},
      byStatus: {},
      byWorkMode: {},
      permanentRate: 0,
      averageDisciplineScore: 0,
    },
  })
}
