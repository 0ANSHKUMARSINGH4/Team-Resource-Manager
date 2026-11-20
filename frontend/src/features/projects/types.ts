export type ProjectStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'To Do' | 'In Progress' | 'Done'

export interface Project {
  id: number
  title: string
  description?: string
  status: ProjectStatus
  deadline?: string
  startDate?: string
  budget?: number
  team?: number
  createdBy?: number
  createdAt?: string
  updatedAt?: string
}

export interface ProjectRequest {
  title: string
  description?: string
  status?: string
  startDate?: string
  deadline?: string
  team?: number
  budget?: number
}

export interface ProjectStatusUpdateRequest {
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}
