export interface DashboardStats {
  totalEmployees: number
  byDepartment?: Record<string, number>
  byStatus?: Record<string, number>
  byWorkMode?: Record<string, number>
  permanentRate?: number
  averageDisciplineScore?: number
}

export interface TaskTrend {
  name: string
  tasks: number
  completed: number
}
