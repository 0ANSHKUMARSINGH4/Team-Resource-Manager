export type ProjectStatus = 'To Do' | 'In Progress' | 'Done' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'

export interface Project {
  id: number
  title: string
  description?: string
  status: ProjectStatus
  deadline: string
  team: number
  budget?: number
}

export interface ProjectRequest {
  title: string
  description?: string
  status?: string
  deadline: string
  team: number
  budget?: number
}
