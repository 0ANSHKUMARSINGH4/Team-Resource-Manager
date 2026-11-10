import { useQuery } from '@tanstack/react-query'
import { fetchDashboardStats } from './api'
import type { DashboardStats } from './types'

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    // Provide sensible fallback initial data for smooth UX
    placeholderData: {
      totalEmployees: 12,
      jobViews: 3342,
      jobApplied: 77,
      resigned: 17,
    },
  })
}
