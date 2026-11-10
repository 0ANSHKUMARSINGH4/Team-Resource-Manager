import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useProjects } from '@/features/projects/hooks'

export const CalendarPage: React.FC = () => {
  const { data: projects = [] } = useProjects()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)) // February 2026

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

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

  return (
    <Card className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-1 border border-gray-200 dark:border-slate-700 rounded-lg p-0.5">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-600 dark:text-slate-300"
              aria-label="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-600 dark:text-slate-300"
              aria-label="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400">
            <div className="w-3 h-3 rounded-full bg-primary" /> Project Deadline
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
          <div key={`empty-${i}`} className="h-16 md:h-24 rounded-xl opacity-20 p-1 md:p-2" />
        ))}

        {/* Month days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`

          const matchingProjects = projects.filter((p) => p.deadline === dateStr)
          const hasDeadline = matchingProjects.length > 0

          return (
            <div
              key={day}
              className={`h-16 md:h-24 rounded-xl border ${
                hasDeadline
                  ? 'border-primary bg-indigo-50/80 dark:bg-slate-700/60 shadow-sm'
                  : 'border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800'
              } p-1 md:p-2 flex flex-col justify-between hover:border-indigo-300 transition-colors`}
            >
              <span
                className={`text-xs md:text-sm font-bold text-left ${
                  hasDeadline ? 'text-primary' : 'text-gray-500 dark:text-slate-400'
                }`}
              >
                {day}
              </span>

              {hasDeadline && (
                <div className="space-y-1 overflow-hidden">
                  {matchingProjects.slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="bg-primary text-white text-[8px] md:text-[10px] rounded px-1.5 py-0.5 truncate hidden sm:block text-left"
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
