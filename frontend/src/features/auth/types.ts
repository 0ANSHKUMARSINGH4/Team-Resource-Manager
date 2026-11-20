export interface User {
  id?: number
  email: string
  fullName: string
  role: 'ADMIN' | 'MANAGER' | 'VIEWER' | string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface RawAuthResponse {
  token: string
  email?: string
  fullName?: string
  role?: string
  user?: User
}
