import React, { useState } from 'react'
import {
  Mail,
  Building,
  Briefcase,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  Sparkles,
  Tag,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Employee } from '../types'
import { SlideOver } from '@/components/ui/SlideOver'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface EmployeeDetailDrawerProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (employee: Employee) => void
  onDelete?: (id: number) => void
}

type TabType = 'overview' | 'timeline' | 'notes'

export const EmployeeDetailDrawer: React.FC<EmployeeDetailDrawerProps> = ({
  employee,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [notes, setNotes] = useState('')
  const [isSavingNotes, setIsSavingNotes] = useState(false)

  if (!employee) return null

  const disciplineScore = employee.disciplineScore ?? 88

  const handleSaveNotes = () => {
    setIsSavingNotes(true)
    setTimeout(() => {
      setIsSavingNotes(false)
      toast.success('Manager note saved for ' + employee.name)
    }, 300)
  }

  // Pre-built realistic CRM audit events
  const auditTimeline = [
    {
      id: 1,
      title: 'Discipline Score Updated',
      description: `Performance score evaluated at ${disciplineScore}% by Engineering Lead.`,
      date: '2 hours ago',
      icon: Award,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      id: 2,
      title: 'Work Mode Synchronized',
      description: `Allocated to ${employee.workMode || 'REMOTE'} operational mode.`,
      date: '3 days ago',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 3,
      title: 'Talent Record Created',
      description: `Profile onboarded with ${employee.status} contract classification.`,
      date: '1 week ago',
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    },
  ]

  const tags = [
    employee.department,
    employee.status,
    employee.workMode || 'Remote',
    disciplineScore >= 80 ? 'High Performer' : 'Core Contributor',
    'Enterprise CRM',
  ]

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} width="lg">
      {/* Top Banner / Hero */}
      <div className="p-6 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-start gap-4">
          <Avatar
            name={employee.name}
            src={employee.avatarUrl}
            size="lg"
            className="ring-4 ring-white dark:ring-slate-700 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 dark:text-white truncate">
                {employee.name}
              </h2>
              <Badge status={employee.status} />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-slate-300 mt-0.5">
              {employee.designation || 'Specialist'} • {employee.department}
            </p>
            {employee.email && (
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Mail size={13} /> {employee.email}
              </p>
            )}
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-slate-700/60">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose()
                onEdit(employee)
              }}
              className="flex-1"
            >
              <Pencil size={14} /> Edit Record
            </Button>
          )}
          {employee.email && (
            <a
              href={`mailto:${employee.email}`}
              className="inline-flex items-center justify-center font-medium transition-colors border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-xs px-3 py-1.5 text-xs rounded-md gap-1.5"
            >
              <Mail size={14} /> Send Email
            </a>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onClose()
                onDelete(employee.id)
              }}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              title="Delete employee"
              aria-label="Delete employee"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-slate-700 px-6 bg-gray-50/50 dark:bg-slate-800/50">
        {(['overview', 'timeline', 'notes'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === tab
                ? 'border-primary text-primary dark:text-indigo-400'
                : 'border-transparent text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300'
            }`}
          >
            {tab === 'overview' && '360° Overview'}
            {tab === 'timeline' && 'Audit Timeline'}
            {tab === 'notes' && 'Manager Notes'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Discipline / Performance KPI */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-700/30 border border-indigo-100/60 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <Award size={15} /> Discipline & Reliability
                </span>
                <span className="text-sm font-black text-primary dark:text-indigo-400">
                  {disciplineScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-violet-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, disciplineScore)}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">
                Evaluated from sprint adherence, attendance records, and peer reviews.
              </p>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/80">
                <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  Department
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-white">
                  <Building size={15} className="text-primary" />
                  <span>{employee.department}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/80">
                <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  Designation
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-white">
                  <Briefcase size={15} className="text-primary" />
                  <span>{employee.designation || 'Staff Member'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/80">
                <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  Work Mode
                </span>
                <div className="text-sm font-bold text-gray-800 dark:text-white capitalize">
                  {employee.workMode ? employee.workMode.toLowerCase().replace('_', ' ') : 'Remote'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/80">
                <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  System ID
                </span>
                <div className="text-sm font-mono font-bold text-gray-800 dark:text-white">
                  TRM-{employee.id.toString().padStart(4, '0')}
                </div>
              </div>
            </div>

            {/* Tags / Labels */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                <Tag size={13} /> Tags & Badges
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-300"
                  >
                    <Sparkles size={11} className="text-primary" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                CRM Activity Stream
              </span>
              <span className="text-[11px] text-primary dark:text-indigo-400 font-semibold">
                Live Audit
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-700">
              {auditTimeline.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="relative">
                    <div
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${item.color} ring-4 ring-white dark:ring-slate-800`}
                    >
                      <Icon size={12} />
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                      <Calendar size={10} /> {item.date}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <FileText size={14} /> Private Manager Log
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add private 1-on-1 notes, performance observations, or milestone targets..."
              rows={6}
              className="w-full p-3.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              variant="primary"
              size="sm"
              loading={isSavingNotes}
              onClick={handleSaveNotes}
              className="w-full"
            >
              Save Internal Note
            </Button>
          </div>
        )}
      </div>
    </SlideOver>
  )
}
