export interface DashboardStats {
  totalEmployees: number
  jobViews: number
  jobApplied: number
  resigned: number
  permanentCount?: number
  contractCount?: number
  permanentRate?: string
}

export interface TaskTrend {
  name: string
  tasks: number
  completed: number
}
