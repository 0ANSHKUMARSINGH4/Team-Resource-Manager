import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutGrid,
  Search,
  GripVertical,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import { useAppDrawerStore, ALL_FEATURES, AppFeature } from '@/stores/appDrawerStore'

interface DragPayload {
  id: string
  from: 'dock' | 'drawer'
  index?: number
}

export const AppDrawerPage: React.FC = () => {
  const {
    pinnedIds,
    searchQuery,
    selectedCategory,
    toastMessage,
    setSearchQuery,
    setSelectedCategory,
    pinFeature,
    unpinFeature,
    reorderPinned,
    resetToDefault,
    pinAll,
    clearDock,
    clearToast,
  } = useAppDrawerStore()

  const [draggedItem, setDraggedItem] = useState<DragPayload | null>(null)
  const [isOverDock, setIsOverDock] = useState(false)
  const [isOverDrawer, setIsOverDrawer] = useState(false)
  const [dropDockIndex, setDropDockIndex] = useState<number | null>(null)

  // Auto-dismiss toast after 3s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, clearToast])

  const categories = ['All', 'Core CRM', 'Operations', 'Finance', 'Productivity']

  // Pinned items in user order
  const pinnedFeatures = pinnedIds
    .map((id) => ALL_FEATURES.find((f) => f.id === id))
    .filter((f): f is AppFeature => Boolean(f))

  // Unpinned features filtered by category & search
  const unpinnedFeatures = ALL_FEATURES.filter((feature) => {
    const isUnpinned = !pinnedIds.includes(feature.id)
    const matchesCategory =
      selectedCategory === 'All' || feature.category === selectedCategory
    const matchesSearch =
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.category.toLowerCase().includes(searchQuery.toLowerCase())
    return isUnpinned && matchesCategory && matchesSearch
  })

  // Drag handlers
  const handleDragStart = (
    e: React.DragEvent,
    id: string,
    from: 'dock' | 'drawer',
    index?: number
  ) => {
    const payload: DragPayload = { id, from, index }
    setDraggedItem(payload)
    e.dataTransfer.setData('application/json', JSON.stringify(payload))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setIsOverDock(false)
    setIsOverDrawer(false)
    setDropDockIndex(null)
  }

  const handleDockDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOverDock(true)
    setIsOverDrawer(false)
    if (typeof index === 'number') {
      setDropDockIndex(index)
    }
  }

  const handleDrawerDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOverDrawer(true)
    setIsOverDock(false)
  }

  const handleDockDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault()
    setIsOverDock(false)
    setDropDockIndex(null)

    try {
      const dataStr = e.dataTransfer.getData('application/json')
      const payload: DragPayload = dataStr ? JSON.parse(dataStr) : draggedItem

      if (!payload) return

      if (payload.from === 'drawer') {
        // Dragged from Drawer to Dock -> Pin it at targetIndex
        pinFeature(payload.id, targetIndex)
      } else if (payload.from === 'dock' && typeof payload.index === 'number') {
        // Dragged from Dock to Dock -> Reorder
        const destination = typeof targetIndex === 'number' ? targetIndex : pinnedIds.length - 1
        if (payload.index !== destination) {
          reorderPinned(payload.index, destination)
        }
      }
    } catch (err) {
      console.warn('Drop error', err)
    } finally {
      setDraggedItem(null)
    }
  }

  const handleDrawerDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOverDrawer(false)

    try {
      const dataStr = e.dataTransfer.getData('application/json')
      const payload: DragPayload = dataStr ? JSON.parse(dataStr) : draggedItem

      if (!payload) return

      if (payload.from === 'dock') {
        // Dragged from Dock to Drawer -> Unpin it
        unpinFeature(payload.id)
      }
    } catch (err) {
      console.warn('Drop error', err)
    } finally {
      setDraggedItem(null)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
            <LayoutGrid size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                App Drawer & Workspace Dock
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-primary dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                <Sparkles size={12} className="text-amber-500" />
                <span>Interactive Drag & Drop</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Drag apps between your active sidebar dock and the app storage drawer. Any changes apply in real time and persist automatically.
            </p>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-slate-700/80 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Default</span>
          </button>
          <button
            onClick={pinAll}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 hover:bg-primary hover:text-white transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800"
          >
            Pin All Apps
          </button>
          <button
            onClick={clearDock}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
          >
            Clear Dock
          </button>
        </div>
      </div>

      {/* Main Drag-and-Drop Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Sidebar Dock (5 cols) */}
        <div
          onDragOver={(e) => handleDockDragOver(e)}
          onDrop={(e) => handleDockDrop(e)}
          className={`lg:col-span-5 rounded-3xl border transition-all p-6 bg-white dark:bg-slate-800/90 shadow-sm flex flex-col min-h-[580px] ${
            isOverDock
              ? 'border-primary ring-4 ring-primary/10 bg-indigo-50/20 dark:bg-indigo-950/20'
              : 'border-gray-200 dark:border-slate-700'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                Sidebar Dock ({pinnedFeatures.length})
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Live in left sidebar
            </span>
          </div>

          <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
            Items in this list appear directly on your navigation dock. Drag to reorder or drag out to the drawer.
          </p>

          {/* Droppable List of Pinned Dock Items */}
          <div className="space-y-2.5 flex-1">
            {pinnedFeatures.length === 0 ? (
              <div
                onDragOver={(e) => handleDockDragOver(e)}
                onDrop={(e) => handleDockDrop(e)}
                className="h-64 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 p-6 text-center bg-gray-50/50 dark:bg-slate-800/40"
              >
                <LayoutGrid size={32} className="text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-700 dark:text-slate-300">
                  Your Dock is Empty
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Drag any app from the right drawer and drop it here to pin it.
                </p>
              </div>
            ) : (
              pinnedFeatures.map((app, index) => {
                const Icon = app.icon
                const isItemTargeted = dropDockIndex === index && isOverDock
                return (
                  <div
                    key={app.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, app.id, 'dock', index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => {
                      e.stopPropagation()
                      handleDockDragOver(e, index)
                    }}
                    onDrop={(e) => {
                      e.stopPropagation()
                      handleDockDrop(e, index)
                    }}
                    className={`group relative flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 dark:bg-slate-800 border transition-all cursor-grab active:cursor-grabbing hover:shadow-md select-none ${
                      isItemTargeted
                        ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                        : 'border-gray-200/80 dark:border-slate-700/80 hover:border-primary/50'
                    }`}
                  >
                    {/* Left: Drag Handle + Number + Icon + Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-gray-300 dark:text-slate-600 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors">
                        <GripVertical size={16} />
                      </div>
                      <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-xs shrink-0`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">
                          {app.name}
                        </span>
                        <span className="text-[10px] font-semibold text-primary dark:text-indigo-400">
                          {app.category}
                        </span>
                      </div>
                    </div>

                    {/* Right: Quick Launch & Move to Drawer button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={app.to}
                        title="Open this tool"
                        className="p-2 rounded-lg text-gray-400 hover:text-primary dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      >
                        <ArrowUpRight size={15} />
                      </Link>

                      <button
                        onClick={() => unpinFeature(app.id)}
                        title="Move to App Drawer"
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-700/80 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-gray-200 dark:border-slate-600 shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span className="hidden sm:inline">Move</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-[11px] text-gray-400 flex items-center justify-between">
            <span>💡 Tip: Drag within dock to reorder</span>
            <span>Auto-synced</span>
          </div>
        </div>

        {/* Right Column: App Drawer Storage (7 cols) */}
        <div
          onDragOver={(e) => handleDrawerDragOver(e)}
          onDrop={(e) => handleDrawerDrop(e)}
          className={`lg:col-span-7 rounded-3xl border transition-all p-6 bg-white dark:bg-slate-800/90 shadow-sm flex flex-col min-h-[580px] ${
            isOverDrawer
              ? 'border-amber-400 ring-4 ring-amber-400/10 bg-amber-50/10 dark:bg-amber-950/10'
              : 'border-gray-200 dark:border-slate-700'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                App Drawer & Feature Library ({unpinnedFeatures.length} available)
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Drag back to dock to activate
            </span>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search tools & apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700/80 text-xs text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? ALL_FEATURES.filter((f) => !pinnedIds.includes(f.id)).length
                    : ALL_FEATURES.filter(
                        (f) => !pinnedIds.includes(f.id) && f.category === cat
                      ).length
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-gray-100 dark:bg-slate-700/80 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Grid of Unpinned Draggable Apps */}
          <div className="flex-1">
            {unpinnedFeatures.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center rounded-2xl border border-gray-100 dark:border-slate-700 p-6 text-center bg-gray-50/50 dark:bg-slate-800/40">
                <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                <p className="text-sm font-bold text-gray-800 dark:text-white">
                  All tools are currently in your dock!
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Drag any item from the left dock onto this area to store it back in the drawer.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {unpinnedFeatures.map((app) => {
                  const Icon = app.icon
                  return (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id, 'drawer')}
                      onDragEnd={handleDragEnd}
                      className="group flex flex-col justify-between p-4 rounded-2xl bg-gray-50/60 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 hover:border-primary/50 shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing select-none"
                    >
                      <div>
                        {/* Top row: Icon + Name + Drag Grip */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
                            >
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                                  {app.name}
                                </h3>
                                {app.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                                    {app.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400">
                                {app.category}
                              </span>
                            </div>
                          </div>

                          <div className="text-gray-300 dark:text-slate-600 group-hover:text-primary transition-colors">
                            <GripVertical size={16} />
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                          {app.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 dark:border-slate-700/60 text-xs">
                        <Link
                          to={app.to}
                          className="inline-flex items-center gap-1 font-bold text-primary dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                        >
                          <span>Launch</span>
                          <ArrowUpRight size={13} />
                        </Link>

                        <button
                          onClick={() => pinFeature(app.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 hover:bg-primary hover:text-white transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800"
                        >
                          <ArrowLeft size={13} />
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
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950 text-xs font-bold shadow-2xl border border-white/10 dark:border-slate-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-4 fade-in">
          <Sparkles size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default AppDrawerPage
