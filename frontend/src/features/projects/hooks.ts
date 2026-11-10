import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, createProject, deleteProject } from './api'
import type { Project, ProjectRequest } from './types'

const initialProjects: Project[] = [
  { id: 1, title: 'Website Redesign', status: 'In Progress', deadline: '2026-02-18', team: 13 },
  { id: 2, title: 'Mobile App API', status: 'To Do', deadline: '2026-02-25', team: 4 },
  { id: 3, title: 'Q3 Marketing', status: 'Done', deadline: '2026-02-10', team: 5 },
]

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await getProjects()
      return data.length > 0 ? data : initialProjects
    },
    placeholderData: initialProjects,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ProjectRequest) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
