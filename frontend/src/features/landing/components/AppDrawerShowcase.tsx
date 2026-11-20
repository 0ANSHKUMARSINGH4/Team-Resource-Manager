import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  Calendar,
  UserCheck,
  Activity,
  Clock,
  FileText,
  BarChart3,
  Sparkles,
  Pin,
  PinOff,
  RotateCcw,
  Smartphone,
  SlidersHorizontal,
  LucideIcon,
} from 'lucide-react'
import { AppDrawerLogo } from '@/components/ui'

interface ShowcaseApp {
  id: string
  name: string
  icon: LucideIcon
  category: 'Core CRM' | 'Operations' | 'Finance' | 'Productivity'
  description: string
  gradient: string
  badge: string
}

const SHOWCASE_APPS: ShowcaseApp[] = [
  {
    id: 'dashboard',
    name: 'Executive Dashboard',
    icon: LayoutDashboard,
    category: 'Core CRM',
    description: '360° Resource & KPI analytics',
    gradient: 'from-blue-500 to-indigo-600',
    badge: 'Core',
  },
  {
    id: 'talent',
    name: 'Talent Directory',
    icon: Users,
    category: 'Core CRM',
    description: 'Capacity, discipline score & roles',
    gradient: 'from-violet-500 to-purple-600',
    badge: 'Core',
  },
  {
    id: 'kanban',
    name: 'Agile Delivery Kanban',
    icon: Briefcase,
    category: 'Operations',
    description: 'Drag-and-drop sprint velocity',
    gradient: 'from-indigo-500 to-blue-600',
    badge: 'Kanban',
  },
  {
    id: 'finance',
    name: 'Finance & Ledger',
    icon: Wallet,
    category: 'Finance',
    description: 'Burn rate, margins & transactions',
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Ledger',
  },
  {
    id: 'calendar',
    name: 'Milestone Calendar',
    icon: Calendar,
    category: 'Operations',
    description: 'Sprint delivery dates & deadlines',
    gradient: 'from-amber-500 to-orange-600',
    badge: 'Roadmap',
  },
  {
    id: 'clients',
    name: 'Client Accounts',
    icon: UserCheck,
    category: 'Core CRM',
    description: 'Enterprise retainers & contracts',
    gradient: 'from-cyan-500 to-blue-500',
    badge: 'CRM 2.0',
  },
  {
    id: 'activity',
    name: 'Activity Stream',
    icon: Activity,
    category: 'Operations',
    description: 'Live audit log & event feed',
    gradient: 'from-rose-500 to-pink-600',
    badge: 'Audit',
  },
  {
    id: 'timetracking',
    name: 'Time & Bandwidth',
    icon: Clock,
    category: 'Productivity',
    description: 'Workload capacity & heatmaps',
    gradient: 'from-amber-600 to-yellow-500',
    badge: 'Productivity',
  },
  {
    id: 'documents',
    name: 'Document Vault',
    icon: FileText,
    category: 'Productivity',
    description: 'Team contracts & NDA store',
    gradient: 'from-slate-600 to-gray-800',
    badge: 'Vault',
  },
  {
    id: 'reports',
    name: 'Analytics & Reports',
    icon: BarChart3,
    category: 'Finance',
    description: 'Custom CSV export & formulas',
    gradient: 'from-fuchsia-500 to-purple-600',
    badge: 'BI Tool',
  },
]

export const AppDrawerShowcase: React.FC = () => {
  const [pinnedIds, setPinnedIds] = useState<string[]>(['dashboard', 'talent', 'kanban', 'finance'])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const togglePin = (id: string) => {
    const app = SHOWCASE_APPS.find((a) => a.id === id)
    if (pinnedIds.includes(id)) {
      setPinnedIds((prev) => prev.filter((item) => item !== id))
      showToast(`Dumped "${app?.name}" to App Drawer`)
    } else {
      if (pinnedIds.length >= 7) {
        showToast('Dock full! Remove an app before adding another.')
        return
      }
      setPinnedIds((prev) => [...prev, id])
      showToast(`Pinned "${app?.name}" to Active Dock`)
    }
  }

  const resetDock = () => {
    setPinnedIds(['dashboard', 'talent', 'kanban', 'finance'])
    showToast('Reset dock to default setup')
  }

  const pinAll = () => {
    setPinnedIds(SHOWCASE_APPS.slice(0, 7).map((a) => a.id))
    showToast('Pinned top 7 apps to dock')
  }

  const categories = ['All', 'Core CRM', 'Operations', 'Finance', 'Productivity']
  const filteredApps = activeCategory === 'All'
    ? SHOWCASE_APPS
    : SHOWCASE_APPS.filter((a) => a.category === activeCategory)

  const pinnedApps = pinnedIds
    .map((id) => SHOWCASE_APPS.find((a) => a.id === id))
    .filter((a): a is ShowcaseApp => Boolean(a))

  return (
    <section id="app-drawer" className="py-24 bg-gradient-to-b from-white via-indigo-50/25 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-xs font-extrabold text-primary dark:text-indigo-400 mb-4 shadow-2xs">
            <AppDrawerLogo size="xs" />
            <span className="uppercase tracking-wider">Industry First</span>
            <span className="text-gray-300 dark:text-slate-600">|</span>
            <span className="text-gray-700 dark:text-slate-300 font-semibold flex items-center gap-1">
              Smartphone-Style App Drawer
              <Sparkles size={13} className="text-amber-500" />
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight leading-tight">
            Your CRM, Organized Like Your Smartphone.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            Never get overwhelmed by 40 cluttered sidebar links again. Pin only what you need to your active dock. Dump the rest into your app drawer with a single click.
          </p>
        </div>

        {/* Live Interactive Simulator Workspace */}
        <div className="relative max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-2xl p-4 sm:p-8 overflow-hidden">
          {/* Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-primary to-violet-600 text-white shadow-md">
                <Smartphone size={18} />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
                  Interactive Dock Customizer
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500">
                  Try clicking &quot;Pin to Dock&quot; or &quot;Dump&quot; below to see the sidebar transform live!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetDock}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>
              <button
                onClick={pinAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
              >
                <Pin size={12} /> Fill Dock
              </button>
            </div>
          </div>

          {/* Interactive Split View: Left (Simulated Dock) vs Right (App Drawer Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Active Sidebar Dock Simulator (4 cols) */}
            <div className="lg:col-span-4 bg-gray-50/80 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/60 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-slate-200">
                    Active Sidebar Dock
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-primary dark:text-indigo-400 border border-gray-200 dark:border-slate-600">
                  {pinnedApps.length} pinned
                </span>
              </div>

              {/* Simulated Sidebar Items */}
              <div className="space-y-2 min-h-[260px]">
                {pinnedApps.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                      Sidebar Dock is Empty!
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1">
                      Click &quot;Pin to Dock&quot; on any app to the right.
                    </p>
                  </div>
                ) : (
                  pinnedApps.map((app) => {
                    const Icon = app.icon
                    return (
                      <div
                        key={app.id}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/70 dark:border-slate-700/80 shadow-xs hover:border-primary/40 transition-all animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-xs`}
                          >
                            <Icon size={14} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                              {app.name}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-slate-500">
                              {app.badge}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => togglePin(app.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Dump to App Drawer"
                        >
                          <PinOff size={13} />
                        </button>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Bottom Dock App Drawer Trigger */}
              <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-primary dark:text-indigo-400">
                <span className="flex items-center gap-2">
                  <AppDrawerLogo size="xs" />
                  <span>Launch App Drawer</span>
                </span>
                <SlidersHorizontal size={14} />
              </div>
            </div>

            {/* Right: Available Apps in Drawer (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* App Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredApps.map((app) => {
                  const isPinned = pinnedIds.includes(app.id)
                  const Icon = app.icon

                  return (
                    <div
                      key={app.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isPinned
                          ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-primary/40 dark:border-indigo-500/40'
                          : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-sm`}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                              <span>{app.name}</span>
                              {isPinned && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                              {app.category}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400">
                          {app.badge}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 line-clamp-1">
                        {app.description}
                      </p>

                      <button
                        onClick={() => togglePin(app.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isPinned
                            ? 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400'
                            : 'bg-primary text-white hover:bg-indigo-700 shadow-xs'
                        }`}
                      >
                        {isPinned ? (
                          <>
                            <PinOff size={13} />
                            <span>Dump to Drawer</span>
                          </>
                        ) : (
                          <>
                            <Pin size={13} />
                            <span>Pin to Active Dock</span>
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Toast Notification Bar */}
          {toastMessage && (
            <div className="absolute bottom-6 right-6 z-30 bg-gray-950 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 border border-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <Sparkles size={14} className="text-amber-400" />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
