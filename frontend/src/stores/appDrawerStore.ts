import { create } from 'zustand'
import {
  LayoutDashboard,
  Wallet,
  Users,
  Briefcase,
  Calendar as CalendarIcon,
  UserCheck,
  Activity,
  Clock,
  FileText,
  BarChart3,
  LucideIcon,
} from 'lucide-react'

export interface AppFeature {
  id: string
  name: string
  to: string
  icon: LucideIcon
  category: 'Core CRM' | 'Operations' | 'Finance' | 'Productivity'
  description: string
  gradient: string
  badge?: string
  isDefaultPinned: boolean
}

export const ALL_FEATURES: AppFeature[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
    category: 'Core CRM',
    description: '360° Executive Resource & KPI analytics overview',
    gradient: 'from-blue-500 to-indigo-600',
    badge: 'Core',
    isDefaultPinned: true,
  },
  {
    id: 'employees',
    name: 'Talent Directory',
    to: '/employees',
    icon: Users,
    category: 'Core CRM',
    description: 'Talent capacity, department filters & discipline scores',
    gradient: 'from-violet-500 to-purple-600',
    badge: 'Core',
    isDefaultPinned: true,
  },
  {
    id: 'projects',
    name: 'Projects & Sprints',
    to: '/projects',
    icon: Briefcase,
    category: 'Operations',
    description: 'Agile Kanban delivery board, sprint velocity & tasks',
    gradient: 'from-indigo-500 to-blue-600',
    badge: 'Kanban',
    isDefaultPinned: true,
  },
  {
    id: 'finance',
    name: 'Finance & Ledger',
    to: '/finance',
    icon: Wallet,
    category: 'Finance',
    description: 'Double-entry transaction ledger, gross burn & margins',
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Ledger',
    isDefaultPinned: true,
  },
  {
    id: 'calendar',
    name: 'Milestone Calendar',
    to: '/calendar',
    icon: CalendarIcon,
    category: 'Operations',
    description: 'Sprint delivery dates, team milestones & holidays',
    gradient: 'from-amber-500 to-orange-600',
    badge: 'Roadmap',
    isDefaultPinned: true,
  },
  {
    id: 'clients',
    name: 'Client Accounts',
    to: '/projects',
    icon: UserCheck,
    category: 'Core CRM',
    description: 'Enterprise accounts, client retainers & contracts',
    gradient: 'from-cyan-500 to-blue-500',
    badge: 'CRM 2.0',
    isDefaultPinned: false,
  },
  {
    id: 'activity',
    name: 'Activity Stream',
    to: '/dashboard',
    icon: Activity,
    category: 'Operations',
    description: 'Live audit log, team changes & real-time event feed',
    gradient: 'from-rose-500 to-pink-600',
    badge: 'Audit',
    isDefaultPinned: false,
  },
  {
    id: 'timetracking',
    name: 'Time & Bandwidth',
    to: '/employees',
    icon: Clock,
    category: 'Productivity',
    description: 'Workload capacity heatmaps, timesheets & allocation',
    gradient: 'from-amber-600 to-yellow-500',
    badge: 'New',
    isDefaultPinned: false,
  },
  {
    id: 'documents',
    name: 'Document Vault',
    to: '/settings',
    icon: FileText,
    category: 'Productivity',
    description: 'Team contracts, NDA repository & employee paperwork',
    gradient: 'from-slate-600 to-gray-800',
    badge: 'Vault',
    isDefaultPinned: false,
  },
  {
    id: 'reports',
    name: 'Analytics & Reports',
    to: '/finance',
    icon: BarChart3,
    category: 'Finance',
    description: 'Custom CSV export wizard, runway formulas & metrics',
    gradient: 'from-fuchsia-500 to-purple-600',
    badge: 'BI Tool',
    isDefaultPinned: false,
  },
]

const STORAGE_KEY = 'trm_pinned_features'

const DEFAULT_PINNED_IDS = ALL_FEATURES.filter((f) => f.isDefaultPinned).map((f) => f.id)

function getInitialPinnedIds(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed
      }
    }
  } catch (e) {
    console.warn('Failed to parse pinned features from storage', e)
  }
  return DEFAULT_PINNED_IDS
}

interface AppDrawerState {
  isDrawerOpen: boolean
  pinnedIds: string[]
  searchQuery: string
  selectedCategory: string
  toastMessage: string | null

  // Actions
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (cat: string) => void
  pinFeature: (id: string, targetIndex?: number) => void
  unpinFeature: (id: string) => void
  togglePinFeature: (id: string) => void
  reorderPinned: (sourceIndex: number, destinationIndex: number) => void
  moveApp: (id: string, toPinned: boolean, targetIndex?: number) => void
  setPinnedIds: (newOrder: string[]) => void
  resetToDefault: () => void
  pinAll: () => void
  clearDock: () => void
  clearToast: () => void
}

export const useAppDrawerStore = create<AppDrawerState>((set, get) => ({
  isDrawerOpen: false,
  pinnedIds: getInitialPinnedIds(),
  searchQuery: '',
  selectedCategory: 'All',
  toastMessage: null,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false, searchQuery: '' }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  pinFeature: (id: string, targetIndex?: number) => {
    const { pinnedIds } = get()
    if (!pinnedIds.includes(id)) {
      const updated = [...pinnedIds]
      if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= updated.length) {
        updated.splice(targetIndex, 0, id)
      } else {
        updated.push(id)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      const feature = ALL_FEATURES.find((f) => f.id === id)
      set({
        pinnedIds: updated,
        toastMessage: `Dropped "${feature?.name || id}" into sidebar dock`,
      })
    }
  },

  unpinFeature: (id: string) => {
    const { pinnedIds } = get()
    const updated = pinnedIds.filter((item) => item !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    const feature = ALL_FEATURES.find((f) => f.id === id)
    set({
      pinnedIds: updated,
      toastMessage: `Moved "${feature?.name || id}" to App Drawer storage`,
    })
  },

  togglePinFeature: (id: string) => {
    const { pinnedIds, pinFeature, unpinFeature } = get()
    if (pinnedIds.includes(id)) {
      unpinFeature(id)
    } else {
      pinFeature(id)
    }
  },

  reorderPinned: (sourceIndex: number, destinationIndex: number) => {
    const { pinnedIds } = get()
    if (
      sourceIndex < 0 ||
      sourceIndex >= pinnedIds.length ||
      destinationIndex < 0 ||
      destinationIndex >= pinnedIds.length
    ) {
      return
    }
    const updated = [...pinnedIds]
    const [moved] = updated.splice(sourceIndex, 1)
    updated.splice(destinationIndex, 0, moved)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({
      pinnedIds: updated,
      toastMessage: 'Reordered sidebar dock items',
    })
  },

  moveApp: (id: string, toPinned: boolean, targetIndex?: number) => {
    const { pinnedIds } = get()
    const withoutItem = pinnedIds.filter((item) => item !== id)
    let updated: string[]

    if (toPinned) {
      if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= withoutItem.length) {
        withoutItem.splice(targetIndex, 0, id)
        updated = withoutItem
      } else {
        updated = [...withoutItem, id]
      }
      const feature = ALL_FEATURES.find((f) => f.id === id)
      set({
        pinnedIds: updated,
        toastMessage: `Pinned "${feature?.name || id}" to sidebar dock`,
      })
    } else {
      updated = withoutItem
      const feature = ALL_FEATURES.find((f) => f.id === id)
      set({
        pinnedIds: updated,
        toastMessage: `Stored "${feature?.name || id}" in App Drawer`,
      })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  },

  setPinnedIds: (newOrder: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder))
    set({ pinnedIds: newOrder })
  },

  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PINNED_IDS))
    set({
      pinnedIds: DEFAULT_PINNED_IDS,
      toastMessage: 'Reset sidebar dock to default setup',
    })
  },

  pinAll: () => {
    const allIds = ALL_FEATURES.map((f) => f.id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds))
    set({
      pinnedIds: allIds,
      toastMessage: 'Pinned all apps to sidebar dock',
    })
  },

  clearDock: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    set({
      pinnedIds: [],
      toastMessage: 'Cleaned all apps from sidebar dock',
    })
  },

  clearToast: () => set({ toastMessage: null }),
}))
