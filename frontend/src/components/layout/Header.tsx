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
  Command,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/features/auth/store'
import { useDarkMode } from '@/hooks/useDarkMode'
import { NotificationCenter } from '@/components/ui'

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
  const { toggleMobileMenu, isSidebarOpen, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()
  const { isDark, toggleDarkMode } = useDarkMode()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isQuickBarFocused, setIsQuickBarFocused] = useState(false)
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
    <header className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 px-4 md:px-8 py-3.5 flex justify-between items-center sticky top-0 z-40 transition-colors shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">
          {currentTitle}
        </h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 relative">
        {/* Quick Bar: Expandable Navbar Command Center */}
        <div className="relative flex items-center">
          <div
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
              )
            }}
            className={cn(
              'group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700/80 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/90 dark:hover:bg-slate-600 transition-all duration-300 ease-in-out cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-slate-600 shadow-2xs',
              isQuickBarFocused
                ? 'w-60 sm:w-80 ring-2 ring-indigo-500/40 bg-white dark:bg-slate-700 shadow-md'
                : 'w-36 sm:w-48'
            )}
            title="Quick Bar (⌘K): Jump anywhere, search records, or trigger actions"
          >
            <Command
              size={14}
              className="text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform"
            />
            <input
              type="text"
              readOnly
              onFocus={() => {
                setIsQuickBarFocused(true)
                window.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
                )
              }}
              onBlur={() => setIsQuickBarFocused(false)}
              placeholder="Quick Bar..."
              className="bg-transparent text-xs text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none w-full cursor-pointer select-none font-medium"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-slate-600 shadow-2xs shrink-0">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Notification Center */}
        <NotificationCenter />

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
