import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  Sun,
  Moon,
  User as UserIcon,
  ChevronDown,
  Settings,
  LogOut,
  LayoutGrid,
} from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/features/auth/store'
import { useDarkMode } from '@/hooks/useDarkMode'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/finance': 'Finance',
  '/employees': 'Employees',
  '/projects': 'Projects',
  '/calendar': 'Calendar',
  '/apps': 'App Drawer & Dock Customizer',
  '/settings': 'Settings',
  '/profile': 'Profile',
}

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toggleMobileMenu } = useUIStore()
  const { user, logout } = useAuthStore()
  const { isDark, toggleDarkMode } = useDarkMode()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentTitle = pageTitles[location.pathname] || 'Dashboard'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    setIsDropdownOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">
          {currentTitle}
        </h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 relative">
        {/* App Drawer Launcher */}
        <button
          onClick={() => navigate('/apps')}
          className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700/80 text-gray-600 dark:text-slate-300 hover:text-primary dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold"
          title="Customize Navigation Dock (Drag & Drop)"
          aria-label="Open App Drawer Page"
        >
          <LayoutGrid size={18} />
          <span className="hidden sm:inline">App Drawer</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Profile Dropdown Trigger */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors group select-none"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 dark:bg-slate-600 flex items-center justify-center text-primary dark:text-indigo-400 overflow-hidden">
              <UserIcon size={18} />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                {user?.fullName || 'Manager'}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {user?.role || 'Team Lead'}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 group-hover:text-primary transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 mb-2">
                <p className="text-sm font-bold text-gray-800 dark:text-white">Signed in as</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                  {user?.email || 'admin@trm.com'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  navigate('/profile')
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <UserIcon size={16} /> My Profile
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  navigate('/settings')
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Settings size={16} /> Account Settings
              </button>
              <div className="border-t border-gray-100 dark:border-slate-700 mt-2 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
