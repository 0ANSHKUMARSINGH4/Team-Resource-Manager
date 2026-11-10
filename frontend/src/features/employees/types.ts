export type EmployeeStatus = 'PERMANENT' | 'CONTRACT' | 'INTERN' | 'Permanent' | 'Contract' | 'Intern'
export type WorkMode = 'ON_SITE' | 'REMOTE' | 'HYBRID' | 'On-Site' | 'Remote' | 'Hybrid'

export interface Employee {
  id: number
  name: string
  email?: string
  department: string
  designation?: string
  age: number
  phone?: string
  status: EmployeeStatus
  workMode?: WorkMode
  disciplineScore?: number
  joinDate?: string
  salary?: number
  avatarUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface EmployeeRequest {
  name: string
  email?: string
  department: string
  designation?: string
  age: number
  phone?: string
  status: string
  workMode?: string
  disciplineScore?: number
  salary?: number
}

export interface EmployeeFilters {
  search?: string
  department?: string
  status?: string
  page?: number
  size?: number
}
