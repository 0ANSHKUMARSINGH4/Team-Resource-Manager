import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './api'
import type { EmployeeRequest, EmployeeFilters } from './types'

export const EMPLOYEES_QUERY_KEY = ['employees']

export function useEmployees(filters?: EmployeeFilters) {
  return useQuery({
    queryKey: [...EMPLOYEES_QUERY_KEY, filters],
    queryFn: () => getEmployees(filters),
  })
}

export function useEmployee(id: number) {
  return useQuery({
    queryKey: [...EMPLOYEES_QUERY_KEY, id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: EmployeeRequest) => createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeRequest> }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
