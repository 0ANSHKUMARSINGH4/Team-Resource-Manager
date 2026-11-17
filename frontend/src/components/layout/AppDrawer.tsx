import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Search,
  LayoutGrid,
  PinOff,
  RotateCcw,
  Sparkles,
  Check,
  Plus,
  ArrowUpRight,
  Info
} from 'lucide-react'
import { useAppDrawerStore, ALL_FEATURES } from '@/stores/appDrawerStore'

export const AppDrawer: React.FC = () => {
  const navigate = useNavigate()
  const {
    isDrawerOpen,
    pinnedIds,
    searchQuery,
    selectedCategory,
    toastMessage,
    closeDrawer,
    setSearchQuery,
    setSelectedCategory,
    pinFeature,
    unpinFeature,
    resetToDefault,
    pinAll,
    clearDock,
    clearToast,
  } = useAppDrawerStore()

  const modalRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  // Auto-clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, clearToast])

  if (!isDrawerOpen) return null

  const categories = ['All', 'Core CRM', 'Operations', 'Finance', 'Productivity']

  // Filter features by category and search query
  const filteredFeatures = ALL_FEATURES.filter((feature) => {
    const matchesCategory =
      selectedCategory === 'All' || feature.category === selectedCategory
    const matchesSearch =
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Separate into Pinned (Dock) and Unpinned (Available in Drawer)
  const pinnedFeatures = ALL_FEATURES.filter((f) => pinnedIds.includes(f.id))
  const unpinnedFeatures = filteredFeatures.filter((f) => !pinnedIds.includes(f.id))

  const handleLaunchApp = (to: string) => {
    closeDrawer()
    navigate(to)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeDrawer} />

      {/* Main App Drawer Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <LayoutGrid size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                  App Drawer & Dock Customizer
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                  Smartphone Mode
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                Pin apps to your active sidebar dock or dump unneeded features into this drawer.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeDrawer}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search features, apps, tools (e.g. Talent, Ledger, Invoicing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800/90 text-sm text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? ALL_FEATURES.length
                  : ALL_FEATURES.filter((f) => f.category === cat).length
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable Content: Dock + App Library */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section 1: Active Sidebar Dock */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Active Sidebar Dock ({pinnedFeatures.length} pinned)
                </h4>
              </div>
              <span className="text-[11px] text-gray-400">
                Visible in your left navigation
              </span>
            </div>

            {pinnedFeatures.length === 0 ? (
              <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-dashed border-amber-200 dark:border-amber-800/60 text-center">
                <Info size={24} className="mx-auto text-amber-500 mb-1.5" />
                <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                  Your sidebar dock is empty!
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  Click &quot;+ Pin to Dock&quot; on any app below to add it to your sidebar.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {pinnedFeatures.map((app) => {
                  const Icon = app.icon
                  return (
                    <div
                      key={app.id}
                      className="group relative flex items-center justify-between p-3 rounded-2xl bg-indigo-50/40 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all"
                    >
                      {/* App icon & Name */}
                      <button
                        onClick={() => handleLaunchApp(app.to)}
                        className="flex items-center gap-3 text-left flex-1 min-w-0 pr-2 cursor-pointer"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                            {app.name}
                          </div>
                          <div className="text-[10px] text-primary dark:text-indigo-400 font-semibold truncate">
                            {app.category}
                          </div>
                        </div>
                      </button>

                      {/* Dump / Unpin Button */}
                      <button
                        onClick={() => unpinFeature(app.id)}
                        title="Dump to App Drawer"
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-gray-200 dark:border-slate-600 shadow-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <PinOff size={12} />
                        <span className="hidden sm:inline">Dump</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Section 2: App Drawer / Available Features */}
          <div>
            <div className="flex items-center justify-between mb-3 pt-2 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  App Drawer & Library ({unpinnedFeatures.length} available)
                </h4>
              </div>
              <span className="text-[11px] text-gray-400">
                Stashed features ready to bring into dock
              </span>
            </div>

            {unpinnedFeatures.length === 0 ? (
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/40 text-center border border-gray-100 dark:border-slate-800">
                <Check size={24} className="mx-auto text-emerald-500 mb-1" />
                <p className="text-sm font-bold text-gray-700 dark:text-slate-300">
                  All available tools are currently pinned to your dock!
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  You can dump any unused apps back into this drawer whenever you like.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {unpinnedFeatures.map((app) => {
                  const Icon = app.icon
                  return (
                    <div
                      key={app.id}
                      className="group flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/80 hover:border-gray-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md shrink-0`}
                            >
                              <Icon size={20} />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                                  {app.name}
                                </h5>
                                {app.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                                    {app.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400">
                                {app.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                          {app.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700/60 text-xs">
                        <button
                          onClick={() => handleLaunchApp(app.to)}
                          className="inline-flex items-center gap-1 font-bold text-primary dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer"
                        >
                          <span>Open Tool</span>
                          <ArrowUpRight size={14} />
                        </button>

                        <button
                          onClick={() => pinFeature(app.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white border border-indigo-100 dark:border-indigo-800 transition-all cursor-pointer shadow-xs"
                        >
                          <Plus size={14} />
                          <span>Pin to Dock</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 font-bold transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Default</span>
            </button>

            <button
              onClick={pinAll}
              className="px-3 py-1.5 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 font-bold transition-colors cursor-pointer"
            >
              Pin All
            </button>

            <button
              onClick={clearDock}
              className="px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 font-bold transition-colors cursor-pointer"
            >
              Clear Dock
            </button>
          </div>

          <button
            onClick={closeDrawer}
            className="px-6 py-2 rounded-xl bg-primary hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-slate-900/90 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-xl border border-white/10 dark:border-slate-800 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in">
            <Sparkles size={14} className="text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
