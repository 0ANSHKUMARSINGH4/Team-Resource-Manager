import api from '@/lib/axios'
import type { Employee, EmployeeRequest, EmployeeFilters } from './types'
import type { PagedResponse } from '@/types'

export async function getEmployees(filters?: EmployeeFilters): Promise<PagedResponse<Employee>> {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.department) params.append('department', filters.department)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.page !== undefined) params.append('page', filters.page.toString())
  if (filters?.size !== undefined) params.append('size', filters.size.toString())

  const response = await api.get<PagedResponse<Employee> | Employee[]>('/employees', { params })

  // Support both paginated PagedResponse<Employee> and plain array for backwards compatibility
  if (Array.isArray(response.data)) {
    return {
      content: response.data,
      pageNumber: 0,
      pageSize: response.data.length,
      totalElements: response.data.length,
      totalPages: 1,
      last: true,
    }
  }

  return response.data
}

export async function getEmployeeById(id: number): Promise<Employee> {
  const response = await api.get<Employee>(`/employees/${id}`)
  return response.data
}

export async function createEmployee(data: EmployeeRequest): Promise<Employee> {
  const response = await api.post<Employee>('/employees', data)
  return response.data
}

export async function updateEmployee(id: number, data: Partial<EmployeeRequest>): Promise<Employee> {
  const response = await api.put<Employee>(`/employees/${id}`, data)
  return response.data
}

export async function deleteEmployee(id: number): Promise<void> {
  await api.delete(`/employees/${id}`)
}
