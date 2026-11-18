import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useProjects } from '@/features/projects/hooks'

export const CalendarPage: React.FC = () => {
  const { data: projects = [] } = useProjects()
  // Default to today's actual date
  const [currentDate, setCurrentDate] = useState(() => new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <Card className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400">
            <CalendarIcon size={20} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-1 border border-gray-200 dark:border-slate-700 rounded-lg p-0.5">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Previous Month"
              title="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Next Month"
              title="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 transition-colors cursor-pointer"
            title="Jump to today"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full ring-2 ring-indigo-500 bg-indigo-500" />
            <span>Today</span>
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span>Project Deadline</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-4 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-bold text-gray-400 text-xs md:text-sm mb-4">
            {d}
          </div>
        ))}

        {/* Empty cells before month start */}
        {[...Array(firstDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} className="h-20 md:h-28 rounded-xl opacity-20 p-1 md:p-2" />
        ))}

        {/* Month days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`

          const isToday = isCurrentMonth && day === today.getDate()
          const matchingProjects = projects.filter((p) => p.deadline === dateStr)
          const hasDeadline = matchingProjects.length > 0

          return (
            <div
              key={day}
              className={`h-20 md:h-28 rounded-xl border p-1 md:p-2 flex flex-col justify-between transition-all ${
                isToday
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50/50 dark:bg-slate-700/80 shadow-sm'
                  : hasDeadline
                  ? 'border-indigo-200 dark:border-slate-600 bg-indigo-50/30 dark:bg-slate-800'
                  : 'border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800'
              } hover:border-indigo-300 dark:hover:border-slate-500`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs md:text-sm font-bold flex items-center justify-center ${
                    isToday
                      ? 'w-6 h-6 rounded-full bg-indigo-600 text-white shadow-xs'
                      : hasDeadline
                      ? 'text-primary font-black'
                      : 'text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {day}
                </span>

                {isToday && (
                  <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    Today
                  </span>
                )}
              </div>

              {hasDeadline && (
                <div className="space-y-1 overflow-hidden mt-1">
                  {matchingProjects.slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="bg-primary text-white text-[8px] md:text-[10px] rounded px-1.5 py-0.5 truncate hidden sm:block text-left shadow-2xs font-medium"
                      title={p.title}
                    >
                      {p.title}
                    </div>
                  ))}
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto sm:hidden" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
