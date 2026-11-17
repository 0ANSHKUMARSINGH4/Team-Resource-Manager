import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Settings,
  User,
  Sparkles,
  SlidersHorizontal,
  PinOff,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAppDrawerStore, ALL_FEATURES } from '@/stores/appDrawerStore'
import { useUIStore } from '@/stores/uiStore'
import { AppDrawerLogo } from '@/components/ui'

const bottomNavItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  const { pinnedIds, unpinFeature } = useAppDrawerStore()
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  // Find all pinned features in the user's customized order
  const pinnedFeatures = pinnedIds
    .map((id) => ALL_FEATURES.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))

  const unpinnedCount = ALL_FEATURES.length - pinnedFeatures.length

  return (
    <aside
      className={cn(
        'bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col transition-all duration-300 ease-in-out z-20 shrink-0 select-none relative',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Brand Header */}
      <div
        className={cn(
          'p-4 flex items-center mb-1 transition-all',
          isSidebarOpen ? 'justify-between px-6' : 'justify-center'
        )}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <div
            onClick={toggleSidebar}
            className="w-10 h-10 bg-gradient-to-tr from-primary via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-black shadow-md text-xs shrink-0 cursor-pointer hover:scale-105 transition-transform"
            title={isSidebarOpen ? 'Team Resource Manager' : 'Expand Sidebar'}
          >
            TRM
          </div>
          {isSidebarOpen && (
            <div className="animate-in fade-in duration-200 truncate">
              <span className="text-base font-black text-gray-900 dark:text-white leading-tight block truncate">
                Team Resource
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-indigo-400">
                Enterprise CRM
              </span>
            </div>
          )}
        </div>

        {/* Collapse toggle button in expanded header */}
        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation Label */}
      {isSidebarOpen ? (
        <div className="px-6 py-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 animate-in fade-in duration-200">
          <span>Active Dock</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300">
            {pinnedFeatures.length} pinned
          </span>
        </div>
      ) : (
        <div className="w-8 mx-auto my-1 border-t border-gray-100 dark:border-slate-700" />
      )}

      {/* Main Navigation (Dynamic from App Drawer) */}
      <nav className="flex-1 overflow-y-auto space-y-1.5 py-1 px-2">
        {pinnedFeatures.length === 0 ? (
          isSidebarOpen ? (
            <div className="mx-2 my-4 p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-dashed border-amber-200 dark:border-amber-800/60 text-center animate-in fade-in">
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                Dock is Empty
              </p>
              <NavLink
                to="/apps"
                className="inline-block px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors mt-2"
              >
                Open Drawer
              </NavLink>
            </div>
          ) : (
            <div className="flex justify-center my-4">
              <NavLink
                to="/apps"
                title="Open App Drawer"
                className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center border border-dashed border-amber-300"
              >
                <Sparkles size={16} />
              </NavLink>
            </div>
          )
        ) : (
          pinnedFeatures.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="group relative flex items-center">
                <NavLink
                  to={item.to}
                  title={!isSidebarOpen ? item.name : undefined}
                  className={({ isActive }) =>
                    cn(
                      'flex-1 flex items-center transition-all font-medium text-sm rounded-xl',
                      isSidebarOpen
                        ? 'px-4 py-2.5 space-x-3'
                        : 'justify-center p-2.5 mx-auto w-12 h-12',
                      isActive
                        ? 'bg-indigo-50/80 dark:bg-slate-700/80 text-primary dark:text-indigo-400 font-bold shadow-2xs'
                        : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-white'
                    )
                  }
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shrink-0 bg-gradient-to-tr shadow-xs transition-transform group-hover:scale-105',
                      item.gradient
                    )}
                  >
                    <Icon size={16} />
                  </div>
                  {isSidebarOpen && <span className="truncate">{item.name}</span>}
                </NavLink>

                {/* Quick Dump Button on hover (expanded mode only) */}
                {isSidebarOpen && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      unpinFeature(item.id)
                    }}
                    title="Dump to App Drawer"
                    className="opacity-0 group-hover:opacity-100 mr-2 p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all cursor-pointer"
                    aria-label={`Dump ${item.name} to App Drawer`}
                  >
                    <PinOff size={14} />
                  </button>
                )}
              </div>
            )
          })
        )}

        {/* Smartphone-Style App Drawer Navigation Link */}
        <div className="pt-3 pb-2">
          <NavLink
            to="/apps"
            title={!isSidebarOpen ? 'App Drawer' : undefined}
            className={({ isActive }) =>
              cn(
                'w-full flex items-center transition-all cursor-pointer shadow-xs group rounded-2xl',
                isSidebarOpen ? 'justify-between p-3' : 'justify-center p-2.5 mx-auto w-12 h-12',
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-slate-700 dark:to-slate-700 text-primary dark:text-indigo-300 border border-primary/30'
                  : 'bg-gradient-to-r from-indigo-50/90 to-violet-50/90 dark:from-slate-700/60 dark:to-slate-700/40 hover:from-indigo-100 hover:to-violet-100 dark:hover:from-slate-700 dark:hover:to-slate-700 text-primary dark:text-indigo-300 border border-indigo-100/80 dark:border-slate-600/60'
              )
            }
          >
            <div className="flex items-center gap-3">
              <AppDrawerLogo size="xs" />
              {isSidebarOpen && (
                <div className="text-left animate-in fade-in duration-200">
                  <div className="text-xs font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                    <span>App Drawer</span>
                    <Sparkles size={11} className="text-amber-500" />
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">
                    {unpinnedCount > 0 ? `${unpinnedCount} apps in drawer` : 'Customize Dock'}
                  </div>
                </div>
              )}
            </div>

            {isSidebarOpen && (
              <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-gray-400 group-hover:text-primary shadow-2xs transition-colors">
                <SlidersHorizontal size={13} />
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-gray-100 dark:border-slate-700 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={!isSidebarOpen ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-xl transition-colors font-medium text-sm',
                  isSidebarOpen
                    ? 'space-x-3 px-4 py-2.5'
                    : 'justify-center p-2.5 mx-auto w-12 h-12',
                  isActive
                    ? 'text-primary bg-indigo-50 dark:bg-slate-700/60 dark:text-indigo-400 font-bold'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-slate-200'
                )
              }
            >
              <Icon size={18} />
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          )
        })}

        {/* Expand button when collapsed */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="w-12 h-10 mx-auto flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </aside>
  )
}
