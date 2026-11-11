import api from '@/lib/axios'
import type { LoginRequest, RegisterRequest, AuthResponse, RawAuthResponse } from './types'

function normalizeAuthResponse(data: RawAuthResponse): AuthResponse {
  if (data.user) {
    return { token: data.token, user: data.user }
  }
  return {
    token: data.token,
    user: {
      email: data.email ?? '',
      fullName: data.fullName ?? 'Manager',
      role: data.role ?? 'MANAGER',
    },
  }
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<RawAuthResponse>('/auth/login', data)
  return normalizeAuthResponse(response.data)
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<RawAuthResponse>('/auth/register', data)
  return normalizeAuthResponse(response.data)
}
