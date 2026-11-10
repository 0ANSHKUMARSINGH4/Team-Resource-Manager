import api from '@/lib/axios'
import type { Project, ProjectRequest } from './types'

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await api.get<Project[]>('/projects')
    return response.data
  } catch {
    // Return empty array if backend endpoint is not yet ready
    return []
  }
}

export async function createProject(data: ProjectRequest): Promise<Project> {
  const response = await api.post<Project>('/projects', data)
  return response.data
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/projects/${id}`)
}
