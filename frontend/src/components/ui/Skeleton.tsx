import React from 'react'
import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => (
  <div
    className={cn(
      'animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700',
      className
    )}
    style={style}
  />
)

/* ── Pre-built skeleton layouts ── */

export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-9 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-20 mb-2" />
    <Skeleton className="h-3 w-28" />
  </div>
)

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-gray-100 dark:border-slate-700">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
    <td className="px-6 py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
    <td className="px-6 py-4 text-right"><Skeleton className="h-7 w-16 ml-auto" /></td>
  </tr>
)

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 dark:bg-slate-700/70 border-b border-gray-100 dark:border-slate-700">
        <tr>
          {['Name', 'Department', 'Designation', 'Status', 'Action'].map((h) => (
            <th key={h} className="px-6 py-4">
              <Skeleton className="h-4 w-16" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </tbody>
    </table>
  </div>
)

export const ChartSkeleton: React.FC = () => (
  <div className="flex items-end justify-between gap-2 h-full px-4 pb-4">
    {[60, 80, 45, 70, 55, 90, 65, 75, 50, 85, 40, 68].map((h, i) => (
      <Skeleton
        key={i}
        className="flex-1 rounded-t-md"
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
)

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 md:space-y-8">
    {/* Stat cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 h-80 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
        <Skeleton className="h-5 w-28 mb-4" />
        <div className="flex-1 min-h-0">
          <ChartSkeleton />
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 h-80 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-5 w-24 self-start" />
        <Skeleton className="h-36 w-36 rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      <TableSkeleton rows={5} />
    </div>
  </div>
)

Skeleton.displayName = 'Skeleton'
