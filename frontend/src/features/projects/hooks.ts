import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProjects,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
} from './api'
import type { Project, ProjectRequest, ProjectStatus } from './types'

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'CRM Modernization',
    description: 'Rebuilding the core CRM platform with modern layered architecture and responsive UX',
    status: 'IN_PROGRESS',
    deadline: '2026-04-15',
    team: 6,
    budget: 120000,
  },
  {
    id: 2,
    title: 'Mobile App Redesign',
    description: 'Revamping iOS and Android apps with new dark mode and micro-interactions',
    status: 'TODO',
    deadline: '2026-05-30',
    team: 4,
    budget: 75000,
  },
  {
    id: 3,
    title: 'Cloud Migration Phase 2',
    description: 'Migrating on-prem database workloads to AWS RDS PostgreSQL with automated failover',
    status: 'DONE',
    deadline: '2026-02-10',
    team: 8,
    budget: 95000,
  },
  {
    id: 4,
    title: 'AI Copilot Integration',
    description: 'Embedding automated talent matching algorithms into employee search drawer',
    status: 'TODO',
    deadline: '2026-06-20',
    team: 3,
    budget: 60000,
  },
  {
    id: 5,
    title: 'PCI-DSS Security Audit',
    description: 'Third-party compliance penetration testing and vault encryption verification',
    status: 'IN_PROGRESS',
    deadline: '2026-03-25',
    team: 5,
    budget: 45000,
  },
]

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await getProjects()
      return data && data.length > 0 ? data : initialProjects
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

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProjectRequest> }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useUpdateProjectStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ProjectStatus }) =>
      updateProjectStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] })
      const previousProjects = queryClient.getQueryData<Project[]>(['projects'])
      if (previousProjects) {
        queryClient.setQueryData<Project[]>(['projects'], (old = []) =>
          old.map((p) => (p.id === id ? { ...p, status } : p))
        )
      }
      return { previousProjects }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects)
      }
    },
    onSettled: () => {
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
