export interface ApiError {
  status: number
  message: string
  timestamp: string
  errors?: Record<string, string>
}

export interface PagedResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}
