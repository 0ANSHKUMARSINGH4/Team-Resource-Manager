import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  Calendar,
  Settings,
  User,
  Grid3X3,
  ArrowRight,
  Command,
  Moon,
  Sun,
  LogOut,
  Plus,
  Hash,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useAuthStore } from '@/features/auth/store'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  section: string
  keywords: string[]
  action: () => void
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { toggleDarkMode, isDark } = useDarkMode()
  const { logout } = useAuthStore()

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const items: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-dashboard',
        label: 'Go to Dashboard',
        description: 'Executive KPI overview',
        icon: LayoutDashboard,
        section: 'Navigation',
        keywords: ['dashboard', 'home', 'kpi', 'stats', 'overview'],
        action: () => { navigate('/dashboard'); close() },
      },
      {
        id: 'nav-employees',
        label: 'Go to Talent Directory',
        description: 'Manage employees & team members',
        icon: Users,
        section: 'Navigation',
        keywords: ['employees', 'talent', 'people', 'team', 'directory', 'hr'],
        action: () => { navigate('/employees'); close() },
      },
      {
        id: 'nav-projects',
        label: 'Go to Projects & Sprints',
        description: 'Kanban board & task tracking',
        icon: Briefcase,
        section: 'Navigation',
        keywords: ['projects', 'kanban', 'board', 'sprints', 'tasks'],
        action: () => { navigate('/projects'); close() },
      },
      {
        id: 'nav-finance',
        label: 'Go to Finance & Ledger',
        description: 'Transactions, budget & cash flow',
        icon: Wallet,
        section: 'Navigation',
        keywords: ['finance', 'money', 'budget', 'ledger', 'transactions', 'cash'],
        action: () => { navigate('/finance'); close() },
      },
      {
        id: 'nav-calendar',
        label: 'Go to Milestone Calendar',
        description: 'Deadlines & key dates',
        icon: Calendar,
        section: 'Navigation',
        keywords: ['calendar', 'milestones', 'dates', 'deadlines', 'schedule'],
        action: () => { navigate('/calendar'); close() },
      },
      {
        id: 'nav-apps',
        label: 'Open App Drawer',
        description: 'Customize sidebar dock',
        icon: Grid3X3,
        section: 'Navigation',
        keywords: ['apps', 'drawer', 'dock', 'customize', 'sidebar'],
        action: () => { navigate('/apps'); close() },
      },
      {
        id: 'nav-settings',
        label: 'Go to Settings',
        description: 'Account & security preferences',
        icon: Settings,
        section: 'Navigation',
        keywords: ['settings', 'preferences', 'account', 'security'],
        action: () => { navigate('/settings'); close() },
      },
      {
        id: 'nav-profile',
        label: 'Go to Profile',
        description: 'View & edit your profile',
        icon: User,
        section: 'Navigation',
        keywords: ['profile', 'avatar', 'name', 'account'],
        action: () => { navigate('/profile'); close() },
      },
      // Quick Actions
      {
        id: 'action-add-employee',
        label: 'Add New Employee',
        description: 'Create a new team member record',
        icon: Plus,
        section: 'Quick Actions',
        keywords: ['add', 'new', 'employee', 'create', 'hire'],
        action: () => { navigate('/employees'); close() },
      },
      {
        id: 'action-new-project',
        label: 'Create New Project',
        description: 'Start a new project or sprint',
        icon: Plus,
        section: 'Quick Actions',
        keywords: ['new', 'project', 'create', 'sprint', 'start'],
        action: () => { navigate('/projects'); close() },
      },
      {
        id: 'action-toggle-theme',
        label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        description: 'Toggle the application theme',
        icon: isDark ? Sun : Moon,
        section: 'Quick Actions',
        keywords: ['theme', 'dark', 'light', 'mode', 'toggle', 'appearance'],
        action: () => { toggleDarkMode(); close() },
      },
      {
        id: 'action-sign-out',
        label: 'Sign Out',
        description: 'Log out of your account',
        icon: LogOut,
        section: 'Quick Actions',
        keywords: ['sign', 'out', 'logout', 'exit', 'leave'],
        action: () => { logout(); navigate('/login'); close() },
      },
    ],
    [navigate, close, isDark, toggleDarkMode, logout]
  )

  // Filter items by query
  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const lq = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lq) ||
        item.description?.toLowerCase().includes(lq) ||
        item.keywords.some((kw) => kw.includes(lq))
    )
  }, [items, query])

  // Group by section
  const sections = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const list = map.get(item.section) || []
      list.push(item)
      map.set(item.section, list)
    }
    return map
  }, [filtered])

  // Global keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Auto-focus input
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  // Keyboard navigation in list
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault()
        filtered[activeIndex].action()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, activeIndex, filtered, close])

  // Reset active index on filter change
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const active = listRef.current.querySelector('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  if (!isOpen) return null

  let flatIndex = -1

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={close}
        aria-hidden
      />

      {/* Dialog */}
      <div
        className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <Search size={20} className="text-gray-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm font-medium outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 text-[10px] font-mono font-bold border border-gray-200 dark:border-slate-600">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Hash size={28} className="mx-auto text-gray-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-medium text-gray-400 dark:text-slate-500">
                No results for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            Array.from(sections.entries()).map(([section, sectionItems]) => (
              <div key={section}>
                <div className="px-5 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                  {section}
                </div>
                {sectionItems.map((item) => {
                  flatIndex += 1
                  const idx = flatIndex
                  const isActive = idx === activeIndex
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onClick={item.action}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        'w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors',
                        isActive
                          ? 'bg-primary/8 dark:bg-indigo-500/15'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-700/40'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                        )}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-semibold truncate',
                            isActive
                              ? 'text-primary dark:text-indigo-300'
                              : 'text-gray-700 dark:text-slate-200'
                          )}
                        >
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-400 dark:text-slate-500 truncate">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <ArrowRight size={14} className="text-primary dark:text-indigo-400 shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-200 dark:bg-slate-700 text-[10px] font-mono">↑</kbd>
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-200 dark:bg-slate-700 text-[10px] font-mono">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-200 dark:bg-slate-700 text-[10px] font-mono">↵</kbd>
              Select
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-slate-500">
            <Command size={11} />
            <span className="font-bold">K</span>
          </div>
        </div>
      </div>
    </div>
  )
}

CommandPalette.displayName = 'CommandPalette'
