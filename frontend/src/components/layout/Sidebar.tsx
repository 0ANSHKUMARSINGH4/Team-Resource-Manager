import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Settings,
  User,
  LayoutGrid,
  Sparkles,
  SlidersHorizontal,
  PinOff
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAppDrawerStore, ALL_FEATURES } from '@/stores/appDrawerStore'

const bottomNavItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  const { pinnedIds, openDrawer, unpinFeature } = useAppDrawerStore()

  // Find all pinned features in the user's customized order
  const pinnedFeatures = pinnedIds
    .map((id) => ALL_FEATURES.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))

  const unpinnedCount = ALL_FEATURES.length - pinnedFeatures.length

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col transition-colors z-20 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-primary via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-black shadow-md text-xs">
            TRM
          </div>
          <div>
            <span className="text-base font-black text-gray-900 dark:text-white leading-tight block">
              Team Resource
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-indigo-400">
              Enterprise CRM
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Label */}
      <div className="px-6 py-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400">
        <span>Active Dock</span>
        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300">
          {pinnedFeatures.length} pinned
        </span>
      </div>

      {/* Main Navigation (Dynamic from App Drawer) */}
      <nav className="flex-1 overflow-y-auto space-y-1 py-1">
        {pinnedFeatures.length === 0 ? (
          <div className="mx-4 my-6 p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-dashed border-amber-200 dark:border-amber-800/60 text-center">
            <p className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
              Sidebar Dock is Empty
            </p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 mb-3">
              Open App Drawer to pin tools.
            </p>
            <button
              onClick={openDrawer}
              className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
            >
              Open Drawer
            </button>
          </div>
        ) : (
          pinnedFeatures.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="group relative flex items-center">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex-1 flex items-center space-x-3 px-6 py-2.5 transition-colors border-l-4 font-medium text-sm',
                      isActive
                        ? 'border-primary text-primary bg-indigo-50/80 dark:bg-slate-700/60 dark:text-indigo-400 font-bold'
                        : 'border-transparent text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-white'
                    )
                  }
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs shrink-0 bg-gradient-to-tr shadow-xs transition-transform group-hover:scale-105',
                      item.gradient
                    )}
                  >
                    <Icon size={15} />
                  </div>
                  <span className="truncate">{item.name}</span>
                </NavLink>

                {/* Quick Dump Button on hover */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    unpinFeature(item.id)
                  }}
                  title="Dump to App Drawer"
                  className="opacity-0 group-hover:opacity-100 mr-4 p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all cursor-pointer"
                  aria-label={`Dump ${item.name} to App Drawer`}
                >
                  <PinOff size={14} />
                </button>
              </div>
            )
          })
        )}

        {/* Smartphone-Style App Drawer Trigger Button */}
        <div className="px-4 pt-3 pb-2">
          <button
            onClick={openDrawer}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-violet-50/90 dark:from-slate-700/60 dark:to-slate-700/40 hover:from-indigo-100 hover:to-violet-100 dark:hover:from-slate-700 dark:hover:to-slate-700 text-primary dark:text-indigo-300 border border-indigo-100/80 dark:border-slate-600/60 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <LayoutGrid size={15} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                  <span>App Drawer</span>
                  <Sparkles size={11} className="text-amber-500" />
                </div>
                <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">
                  {unpinnedCount > 0 ? `${unpinnedCount} apps stashed` : 'All tools docked'}
                </div>
              </div>
            </div>

            <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-gray-400 group-hover:text-primary shadow-2xs transition-colors">
              <SlidersHorizontal size={13} />
            </span>
          </button>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium text-sm',
                  isActive
                    ? 'text-primary bg-indigo-50 dark:bg-slate-700/60 dark:text-indigo-400 font-bold'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:text-gray-900 dark:hover:text-slate-200'
                )
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}
