import React, { useState, useEffect, useRef } from 'react'
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
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Download,
  UploadCloud
} from 'lucide-react'
import { useAppDrawerStore, ALL_FEATURES, AppFeature } from '@/stores/appDrawerStore'

interface DragPayload {
  id: string
  from: 'dock' | 'drawer'
  index?: number
}

// Module-level drag tracker ensures payload is never lost due to premature dragend or browser security restrictions
let globalDragPayload: DragPayload | null = null

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

  const [isDragging, setIsDragging] = useState(false)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [dragSource, setDragSource] = useState<'dock' | 'drawer' | null>(null)
  const [isOverDock, setIsOverDock] = useState(false)
  const [isOverDrawer, setIsOverDrawer] = useState(false)
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null)

  // Drag end cleanup timer
  const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-dismiss toast
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

  // ================= DRAG & DROP HANDLERS =================

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string,
    from: 'dock' | 'drawer',
    index?: number
  ) => {
    const payload: DragPayload = { id, from, index }
    globalDragPayload = payload
    setActiveDragId(id)
    setDragSource(from)
    setIsDragging(true)

    // Standard cross-browser text dataTransfer
    try {
      e.dataTransfer.setData('text/plain', JSON.stringify(payload))
      e.dataTransfer.effectAllowed = 'move'
    } catch (err) {
      console.warn('dataTransfer set error', err)
    }
  }

  const handleDragEnd = () => {
    // Keep globalDragPayload alive for 150ms in case onDrop fires slightly after dragend
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current)
    cleanupTimerRef.current = setTimeout(() => {
      globalDragPayload = null
      setActiveDragId(null)
      setDragSource(null)
      setIsDragging(false)
      setIsOverDock(false)
      setIsOverDrawer(false)
      setHoveredDockIndex(null)
    }, 150)
  }

  // --- DOCK DROP ZONE HANDLERS ---
  const handleDockDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    if (!isOverDock) setIsOverDock(true)
    if (isOverDrawer) setIsOverDrawer(false)
    if (typeof index === 'number') {
      setHoveredDockIndex(index)
    }
  }

  const handleDockDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOverDock(true)
    setIsOverDrawer(false)
  }

  const handleDockDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if leaving the dock zone completely
    const related = e.relatedTarget as Node | null
    if (!e.currentTarget.contains(related)) {
      setIsOverDock(false)
      setHoveredDockIndex(null)
    }
  }

  const handleDockDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOverDock(false)
    setHoveredDockIndex(null)

    let payload: DragPayload | null = globalDragPayload
    if (!payload) {
      try {
        const raw = e.dataTransfer.getData('text/plain')
        if (raw) payload = JSON.parse(raw)
      } catch (err) {
        console.warn('Drop parse error', err)
      }
    }

    if (!payload || !payload.id) return

    if (payload.from === 'drawer') {
      // From Drawer -> Dock
      pinFeature(payload.id, targetIndex)
    } else if (payload.from === 'dock' && typeof payload.index === 'number') {
      // Reordering within Dock
      const destination = typeof targetIndex === 'number' ? targetIndex : pinnedIds.length - 1
      if (payload.index !== destination) {
        reorderPinned(payload.index, destination)
      }
    }

    globalDragPayload = null
    setActiveDragId(null)
    setDragSource(null)
    setIsDragging(false)
  }

  // --- DRAWER DROP ZONE HANDLERS ---
  const handleDrawerDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    if (!isOverDrawer) setIsOverDrawer(true)
    if (isOverDock) setIsOverDock(false)
  }

  const handleDrawerDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOverDrawer(true)
    setIsOverDock(false)
  }

  const handleDrawerDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    const related = e.relatedTarget as Node | null
    if (!e.currentTarget.contains(related)) {
      setIsOverDrawer(false)
    }
  }

  const handleDrawerDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOverDrawer(false)

    let payload: DragPayload | null = globalDragPayload
    if (!payload) {
      try {
        const raw = e.dataTransfer.getData('text/plain')
        if (raw) payload = JSON.parse(raw)
      } catch (err) {
        console.warn('Drop parse error', err)
      }
    }

    if (!payload || !payload.id) return

    if (payload.from === 'dock') {
      // From Dock -> Drawer (unpin)
      unpinFeature(payload.id)
    }

    globalDragPayload = null
    setActiveDragId(null)
    setDragSource(null)
    setIsDragging(false)
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
                <span>Interactive Drag &amp; Drop</span>
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
          onDragEnter={handleDockDragEnter}
          onDragLeave={handleDockDragLeave}
          onDrop={(e) => handleDockDrop(e)}
          className={`lg:col-span-5 rounded-3xl border transition-all p-6 bg-white dark:bg-slate-800/90 shadow-sm flex flex-col min-h-[580px] relative ${
            isOverDock && dragSource === 'drawer'
              ? 'border-primary ring-4 ring-primary/20 bg-indigo-50/30 dark:bg-indigo-950/30 scale-[1.01]'
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

          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
            Items in this list appear directly on your navigation dock. Drag to reorder or drag right to the drawer.
          </p>

          {/* Active Drag Helper Drop Target Bar when dragging from Drawer */}
          {isDragging && dragSource === 'drawer' && (
            <div
              onDragOver={(e) => handleDockDragOver(e, 0)}
              onDrop={(e) => handleDockDrop(e, 0)}
              className="mb-3 p-3 rounded-2xl border-2 border-dashed border-primary bg-indigo-50/60 dark:bg-indigo-950/50 text-center animate-pulse flex items-center justify-center gap-2 text-xs font-bold text-primary dark:text-indigo-400"
            >
              <Download size={16} />
              <span>Drop here to pin to top of dock</span>
            </div>
          )}

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
                  Drag any app from the right drawer and drop it anywhere here to pin it.
                </p>
              </div>
            ) : (
              pinnedFeatures.map((app, index) => {
                const Icon = app.icon
                const isThisBeingDragged = activeDragId === app.id
                const isThisTargeted = hoveredDockIndex === index && isOverDock

                return (
                  <div
                    key={app.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, app.id, 'dock', index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDockDragOver(e, index)}
                    onDrop={(e) => handleDockDrop(e, index)}
                    className={`group relative flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 dark:bg-slate-800 border transition-all cursor-grab active:cursor-grabbing hover:shadow-md select-none ${
                      isThisBeingDragged
                        ? 'opacity-40 border-dashed border-primary scale-95'
                        : isThisTargeted
                        ? 'border-primary ring-2 ring-primary/30 scale-[1.02] bg-indigo-50/40 dark:bg-indigo-950/40'
                        : 'border-gray-200/80 dark:border-slate-700/80 hover:border-primary/50'
                    }`}
                  >
                    {/* Left: Drag Handle + Number + Icon + Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-gray-300 dark:text-slate-600 group-hover:text-primary transition-colors cursor-grab">
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

                    {/* Right: Reorder arrows + Quick Launch & Move to Drawer button */}
                    <div className="flex items-center gap-1.5 shrink-0" draggable={false}>
                      {/* Reorder Arrows */}
                      <div className="flex flex-col">
                        <button
                          disabled={index === 0}
                          onClick={() => reorderPinned(index, index - 1)}
                          className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ChevronUp size={12} />
                        </button>
                        <button
                          disabled={index === pinnedFeatures.length - 1}
                          onClick={() => reorderPinned(index, index + 1)}
                          className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ChevronDown size={12} />
                        </button>
                      </div>

                      <Link
                        to={app.to}
                        draggable={false}
                        title="Open this tool"
                        className="p-2 rounded-lg text-gray-400 hover:text-primary dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      >
                        <ArrowUpRight size={15} />
                      </Link>

                      <button
                        onClick={() => unpinFeature(app.id)}
                        draggable={false}
                        title="Move to App Drawer Storage"
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

          {/* Bottom Drop Zone when dragging */}
          {isDragging && dragSource === 'drawer' && (
            <div
              onDragOver={(e) => handleDockDragOver(e, pinnedFeatures.length)}
              onDrop={(e) => handleDockDrop(e, pinnedFeatures.length)}
              className="mt-3 p-3 rounded-2xl border-2 border-dashed border-primary bg-indigo-50/60 dark:bg-indigo-950/50 text-center animate-pulse flex items-center justify-center gap-2 text-xs font-bold text-primary dark:text-indigo-400"
            >
              <Download size={16} />
              <span>Drop here to pin to bottom of dock</span>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-[11px] text-gray-400 flex items-center justify-between">
            <span>💡 Tip: Drag card into left dock or use arrows to reorder</span>
            <span>Auto-synced</span>
          </div>
        </div>

        {/* Right Column: App Drawer Storage (7 cols) */}
        <div
          onDragOver={(e) => handleDrawerDragOver(e)}
          onDragEnter={handleDrawerDragEnter}
          onDragLeave={handleDrawerDragLeave}
          onDrop={(e) => handleDrawerDrop(e)}
          className={`lg:col-span-7 rounded-3xl border transition-all p-6 bg-white dark:bg-slate-800/90 shadow-sm flex flex-col min-h-[580px] relative ${
            isOverDrawer && dragSource === 'dock'
              ? 'border-amber-400 ring-4 ring-amber-400/20 bg-amber-50/20 dark:bg-amber-950/20 scale-[1.01]'
              : 'border-gray-200 dark:border-slate-700'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                App Drawer &amp; Feature Library ({unpinnedFeatures.length} available)
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Drag left to activate in dock
            </span>
          </div>

          {/* Drop Target Banner when dragging from dock */}
          {isDragging && dragSource === 'dock' && (
            <div
              onDragOver={handleDrawerDragOver}
              onDrop={handleDrawerDrop}
              className="mb-4 p-4 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50/70 dark:bg-amber-950/60 text-center animate-pulse flex items-center justify-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200"
            >
              <UploadCloud size={18} className="text-amber-600" />
              <span>Drop card anywhere here to remove from sidebar and store in drawer</span>
            </div>
          )}

          {/* Search Bar & Category Filters */}
          <div className="space-y-3 mb-6" draggable={false}>
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
                  const isThisBeingDragged = activeDragId === app.id

                  return (
                    <div
                      key={app.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, app.id, 'drawer')}
                      onDragEnd={handleDragEnd}
                      className={`group flex flex-col justify-between p-4 rounded-2xl bg-gray-50/60 dark:bg-slate-800/80 border transition-all cursor-grab active:cursor-grabbing select-none ${
                        isThisBeingDragged
                          ? 'opacity-40 border-dashed border-primary scale-95'
                          : 'border-gray-200/80 dark:border-slate-700/80 hover:border-primary/50 shadow-xs hover:shadow-md'
                      }`}
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

                          <div className="text-gray-300 dark:text-slate-600 group-hover:text-primary transition-colors cursor-grab">
                            <GripVertical size={16} />
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                          {app.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 dark:border-slate-700/60 text-xs" draggable={false}>
                        <Link
                          to={app.to}
                          draggable={false}
                          className="inline-flex items-center gap-1 font-bold text-primary dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                        >
                          <span>Launch</span>
                          <ArrowUpRight size={13} />
                        </Link>

                        <button
                          onClick={() => pinFeature(app.id)}
                          draggable={false}
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
