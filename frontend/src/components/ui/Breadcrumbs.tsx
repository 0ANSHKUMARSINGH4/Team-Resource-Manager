import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  employees: 'Talent Directory',
  projects: 'Projects & Sprints',
  finance: 'Finance & Ledger',
  calendar: 'Milestone Calendar',
  apps: 'App Drawer',
  settings: 'Settings',
  profile: 'Profile',
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-slate-500 px-4 md:px-8 pt-3 pb-0 select-none"
    >
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-primary dark:hover:text-indigo-400 transition-colors"
      >
        <Home size={13} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/')
        const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
        const isLast = index === pathSegments.length - 1

        return (
          <React.Fragment key={path}>
            <ChevronRight size={12} className="text-gray-300 dark:text-slate-600" />
            {isLast ? (
              <span className="text-gray-700 dark:text-slate-200 font-semibold truncate max-w-[200px]">
                {label}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-primary dark:hover:text-indigo-400 transition-colors truncate max-w-[200px]"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
