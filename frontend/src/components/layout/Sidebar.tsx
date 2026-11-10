import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Users,
  Briefcase,
  Calendar as CalendarIcon,
  Settings,
  User,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/finance', label: 'Finance', icon: Wallet },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/projects', label: 'Projects', icon: Briefcase },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
]

const bottomNavItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col transition-colors z-20 shrink-0">
      {/* Brand Header */}
      <div className="p-6 flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md text-xs">
          TRM
        </div>
        <span className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
          Team Resource
          <br />
          Manager
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-6 py-3 transition-colors border-l-4 font-medium text-sm',
                  isActive
                    ? 'border-primary text-primary bg-indigo-50 dark:bg-slate-700/60 dark:text-indigo-400 font-semibold'
                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-slate-200'
                )
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm',
                  isActive
                    ? 'text-primary bg-indigo-50 dark:bg-slate-700/60 dark:text-indigo-400 font-semibold'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-slate-200'
                )
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}
