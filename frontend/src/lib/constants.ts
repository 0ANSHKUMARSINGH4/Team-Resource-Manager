export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://team-resource-backend.onrender.com/api/v1'
    : 'http://localhost:8080/api/v1')

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  FINANCE: '/finance',
  CALENDAR: '/calendar',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const
