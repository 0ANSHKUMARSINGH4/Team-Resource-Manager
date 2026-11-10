export interface ApiError {
  status: number
  message: string
  timestamp: string
  errors?: Record<string, string>
}

export interface PagedResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}
