import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Settings,
  User,
  X,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useAppDrawerStore, ALL_FEATURES } from '@/stores/appDrawerStore'
import { cn } from '@/lib/cn'

const bottomNavItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const MobileMenu: React.FC = () => {
  const navigate = useNavigate()
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { pinnedIds } = useAppDrawerStore()

  if (!isMobileMenuOpen) return null

  const pinnedFeatures = pinnedIds
    .map((id) => ALL_FEATURES.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))

  const handleOpenAppDrawer = () => {
    setMobileMenuOpen(false)
    navigate('/apps')
  }

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
            <div className="w-7 h-7 bg-gradient-to-br from-primary to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
              TRM
            </div>
            <span className="font-bold text-gray-800 dark:text-white text-sm">
              Team Resource CRM
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-slate-300"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-1">
          {pinnedFeatures.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-3 px-6 py-2.5 transition-colors border-l-4 font-medium text-sm',
                    isActive
                      ? 'border-primary text-primary bg-indigo-50 dark:bg-slate-700/60 dark:text-indigo-400 font-bold'
                      : 'border-transparent text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-white'
                  )
                }
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs shrink-0 bg-gradient-to-tr shadow-xs',
                    item.gradient
                  )}
                >
                  <Icon size={15} />
                </div>
                <span>{item.name}</span>
              </NavLink>
            )
          })}

          {/* Mobile App Drawer Launcher */}
          <div className="px-4 pt-3">
            <button
              onClick={handleOpenAppDrawer}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-700/60 text-primary dark:text-indigo-300 border border-indigo-100 dark:border-slate-600 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid size={16} />
                <span>Open App Drawer</span>
              </div>
              <Sparkles size={12} className="text-amber-500" />
            </button>
          </div>
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
                    'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors font-medium text-sm',
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
