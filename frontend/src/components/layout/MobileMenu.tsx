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
  X,
} from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
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

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()

  if (!isMobileMenuOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="relative bg-white dark:bg-slate-800 w-64 h-full shadow-2xl flex flex-col transition-transform z-10">
        <div className="p-4 flex justify-between items-center border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-indigo-700 rounded flex items-center justify-center text-white font-bold text-[10px]">
              TRM
            </div>
            <span className="font-bold text-gray-800 dark:text-white">Menu</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-slate-300"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
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

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
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
      </div>
    </div>
  )
}
