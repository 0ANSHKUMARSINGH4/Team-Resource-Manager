import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  Sun,
  Moon,
  User as UserIcon,
  ChevronDown,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  Calendar,
  Grid3X3,
  X,
  ArrowRight,
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

interface QuickAction {
  id: string
  label: string
  category: 'Navigation' | 'Action'
  icon: React.ElementType
  shortcut?: string
  keywords: string[]
  action: () => void
}

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toggleMobileMenu, isSidebarOpen, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()
  const { isDark, toggleDarkMode } = useDarkMode()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [quickQuery, setQuickQuery] = useState('')
  const [isQuickBarFocused, setIsQuickBarFocused] = useState(false)
  const [quickSelectedIndex, setQuickSelectedIndex] = useState(0)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const quickBarRef = useRef<HTMLDivElement>(null)
  const quickInputRef = useRef<HTMLInputElement>(null)

  const currentTitle = pageTitles[location.pathname] || 'Dashboard'

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      category: 'Navigation',
      icon: LayoutDashboard,
      shortcut: 'G D',
      keywords: ['dashboard', 'home', 'kpi', 'analytics', 'overview'],
      action: () => navigate('/dashboard'),
    },
    {
      id: 'nav-employees',
      label: 'Go to Talent Directory',
      category: 'Navigation',
      icon: Users,
      shortcut: 'G E',
      keywords: ['employees', 'talent', 'people', 'team', 'staff', 'hr'],
      action: () => navigate('/employees'),
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects & Sprints',
      category: 'Navigation',
      icon: Briefcase,
      shortcut: 'G P',
      keywords: ['projects', 'kanban', 'sprints', 'tasks', 'delivery'],
      action: () => navigate('/projects'),
    },
    {
      id: 'nav-finance',
      label: 'Go to Finance & Ledger',
      category: 'Navigation',
      icon: Wallet,
      shortcut: 'G F',
      keywords: ['finance', 'budget', 'ledger', 'cash', 'expenses', 'revenue'],
      action: () => navigate('/finance'),
    },
    {
      id: 'nav-calendar',
      label: 'Go to Milestone Calendar',
      category: 'Navigation',
      icon: Calendar,
      shortcut: 'G C',
      keywords: ['calendar', 'milestones', 'schedule', 'deadlines', 'events'],
      action: () => navigate('/calendar'),
    },
    {
      id: 'nav-apps',
      label: 'Go to App Drawer',
      category: 'Navigation',
      icon: Grid3X3,
      shortcut: 'G A',
      keywords: ['apps', 'drawer', 'dock', 'integrations'],
      action: () => navigate('/apps'),
    },
    {
      id: 'act-theme',
      label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      category: 'Action',
      icon: isDark ? Sun : Moon,
      shortcut: '⌘J',
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
      action: toggleDarkMode,
    },
    {
      id: 'nav-settings',
      label: 'Account Settings',
      category: 'Navigation',
      icon: Settings,
      shortcut: '⌘,',
      keywords: ['settings', 'preferences', 'profile', 'config'],
      action: () => navigate('/settings'),
    },
  ], [isDark, navigate, toggleDarkMode])

  const filteredQuickActions = useMemo(() => {
    if (!quickQuery.trim()) return quickActions
    const q = quickQuery.toLowerCase().trim()
    return quickActions.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q))
    )
  }, [quickActions, quickQuery])

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (quickBarRef.current && !quickBarRef.current.contains(event.target as Node)) {
        setIsQuickBarFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        quickInputRef.current?.focus()
        setIsQuickBarFocused(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleQuickBarKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsQuickBarFocused(false)
      quickInputRef.current?.blur()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setQuickSelectedIndex(prev => (prev + 1) % Math.max(filteredQuickActions.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setQuickSelectedIndex(prev => (prev - 1 + filteredQuickActions.length) % Math.max(filteredQuickActions.length, 1))
    } else if (e.key === 'Enter' && filteredQuickActions.length > 0) {
      e.preventDefault()
      const selected = filteredQuickActions[quickSelectedIndex] || filteredQuickActions[0]
      selected.action()
      setIsQuickBarFocused(false)
      setQuickQuery('')
      quickInputRef.current?.blur()
    }
  }

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
        {/* Quick Bar: Interactive Expandable Command Center */}
        <div ref={quickBarRef} className="relative flex items-center">
          <div
            className={cn(
              'group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700/80 text-gray-700 dark:text-slate-200 transition-all duration-300 ease-in-out border border-transparent shadow-2xs',
              isQuickBarFocused
                ? 'w-64 sm:w-88 ring-2 ring-indigo-500 bg-white dark:bg-slate-700 shadow-md border-indigo-200 dark:border-indigo-500/40'
                : 'w-40 sm:w-56 hover:bg-gray-200/90 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-600'
            )}
            title="Quick Bar: Type to search or press ⌘K"
          >
            <Search
              size={15}
              className={cn(
                'shrink-0 transition-colors',
                isQuickBarFocused ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-400'
              )}
            />
            <input
              ref={quickInputRef}
              type="text"
              value={quickQuery}
              onChange={(e) => {
                setQuickQuery(e.target.value)
                setQuickSelectedIndex(0)
                setIsQuickBarFocused(true)
              }}
              onFocus={() => setIsQuickBarFocused(true)}
              onKeyDown={handleQuickBarKeyDown}
              placeholder="Quick Bar (Type to search...)"
              className="bg-transparent text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none w-full font-medium"
            />
            {quickQuery ? (
              <button
                type="button"
                onClick={() => {
                  setQuickQuery('')
                  quickInputRef.current?.focus()
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                title="Clear"
              >
                <X size={13} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono font-bold text-gray-400 dark:text-slate-400 border border-gray-200 dark:border-slate-600 shadow-2xs shrink-0 select-none">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Quick Bar Live Floating Dropdown */}
          {isQuickBarFocused && (
            <div className="absolute left-0 top-11 w-72 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 border-b border-gray-100 dark:border-slate-700/60 flex justify-between items-center">
                <span>{quickQuery ? 'Search Results' : 'Quick Jump & Actions'}</span>
                <span className="text-[10px] font-mono normal-case">ESC to close</span>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800/40 py-1">
                {filteredQuickActions.length > 0 ? (
                  filteredQuickActions.map((action, idx) => {
                    const Icon = action.icon
                    const isSelected = idx === quickSelectedIndex
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onMouseEnter={() => setQuickSelectedIndex(idx)}
                        onClick={() => {
                          action.action()
                          setIsQuickBarFocused(false)
                          setQuickQuery('')
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left cursor-pointer',
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                            : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon size={15} className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-400'} />
                          <span className="truncate">{action.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {action.shortcut && (
                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-[10px] font-mono text-gray-500 dark:text-slate-400">
                              {action.shortcut}
                            </kbd>
                          )}
                          <ArrowRight size={12} className={isSelected ? 'text-indigo-500 opacity-100' : 'opacity-0'} />
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="px-4 py-4 text-center text-xs text-gray-400 dark:text-slate-500">
                    No matching actions for "{quickQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
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
              className={`text-gray-400 group-hover:text-primary transition-transform ${isDropdownOpen ? 'rotate-180' : ''
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
                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
              >
                <UserIcon size={16} /> My Profile
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  navigate('/settings')
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
              >
                <Settings size={16} /> Account Settings
              </button>
              <div className="border-t border-gray-100 dark:border-slate-700 mt-2 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 cursor-pointer"
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
