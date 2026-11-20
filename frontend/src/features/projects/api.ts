import api from '@/lib/axios'
import type { Project, ProjectRequest } from './types'

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await api.get<Project[]>('/projects')
    return response.data
  } catch (error) {
    console.warn('Projects endpoint fallback:', error)
    return []
  }
}

export async function createProject(data: ProjectRequest): Promise<Project> {
  const response = await api.post<Project>('/projects', data)
  return response.data
}

export async function updateProject(id: number, data: Partial<ProjectRequest>): Promise<Project> {
  const response = await api.put<Project>(`/projects/${id}`, data)
  return response.data
}

export async function updateProjectStatus(id: number, status: string): Promise<Project> {
  const response = await api.patch<Project>(`/projects/${id}/status`, { status })
  return response.data
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/projects/${id}`)
}
