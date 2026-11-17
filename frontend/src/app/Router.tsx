import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { EmployeesPage } from '@/features/employees/pages/EmployeesPage'
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage'
import { FinancePage } from '@/features/finance/pages/FinancePage'
import { CalendarPage } from '@/features/calendar/pages/CalendarPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'
import { useAuthStore } from '@/features/auth/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore()

  // In development, if no token, allow bypass or prompt login
  // Per instructions: "checks auth store and redirects to /login if no token"
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/employees',
        element: <EmployeesPage />,
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/finance',
        element: <FinancePage />,
      },
      {
        path: '/calendar',
        element: <CalendarPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
