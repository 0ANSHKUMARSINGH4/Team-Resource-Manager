import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  Calendar,
  Users,
  DollarSign,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CircleDot
} from 'lucide-react'
import type { Project } from '../types'

interface KanbanCardProps {
  project: Project
  onDelete?: (id: number) => void
  onMoveStatus?: (id: number, targetStatus: string) => void
  isOverlay?: boolean
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  project,
  onDelete,
  onMoveStatus,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  // Normalize status for comparisons
  const normalizedStatus =
    project.status === 'To Do' || project.status === 'TODO'
      ? 'TODO'
      : project.status === 'In Progress' || project.status === 'IN_PROGRESS'
      ? 'IN_PROGRESS'
      : 'DONE'

  // Format currency
  const formattedBudget = project.budget
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(project.budget)
    : null

  // Priority badge based on budget / status - uniform short labels
  const priority =
    (project.budget ?? 0) >= 90000
      ? { label: 'High', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40' }
      : (project.budget ?? 0) >= 50000
      ? { label: 'Medium', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40' }
      : { label: 'Normal', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40' }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-xl border p-4 transition-all duration-200 select-none min-h-[168px] flex flex-col justify-between ${
        isOverlay
          ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-2xl scale-105 rotate-1 cursor-grabbing z-50 ring-2 ring-indigo-500/50'
          : isDragging
          ? 'opacity-30 border-dashed border-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/20'
          : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div>
        {/* Header: Drag Handle, Title & Priority */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <button
              {...attributes}
              {...listeners}
              type="button"
              className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-grab active:cursor-grabbing p-0.5 rounded transition-colors touch-none shrink-0"
              aria-label="Drag project card"
            >
              <GripVertical size={16} />
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight truncate">
                {project.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`h-5 px-2 text-[10px] font-semibold rounded-full border inline-flex items-center ${priority.color}`}
            >
              {priority.label}
            </span>
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(project.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 rounded transition-opacity"
                title="Delete project"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Description Snippet: Guaranteed uniform slot height */}
        <div className="min-h-[32px] mb-2.5">
          {project.description ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          ) : (
            <p className="text-xs text-slate-400/60 dark:text-slate-600 italic">
              Sprint milestone deliverable
            </p>
          )}
        </div>
      </div>

      <div>
        {/* Metadata Badges: Deadline, Uniform Green Budget Bubble, Team */}
        <div className="flex items-center justify-between gap-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          {/* Due date */}
          <div className="h-6 px-2 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-[11px] inline-flex items-center gap-1 shrink-0">
            <Calendar size={11} className="text-slate-400" />
            <span>{project.deadline || 'No date'}</span>
          </div>

          {/* Clean & Uniform Green Budget Bubble */}
          <div
            className={`h-6 px-2.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1 shrink-0 transition-colors ${
              formattedBudget
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-700/40 text-slate-500 dark:text-slate-400 border border-transparent'
            }`}
          >
            <DollarSign size={11} className={formattedBudget ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} />
            <span>{formattedBudget || 'Standard'}</span>
          </div>

          {/* Team count */}
          <div className="h-6 px-2 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-[11px] inline-flex items-center gap-1 shrink-0">
            <Users size={11} className="text-slate-400" />
            <span>{project.team ?? 3} devs</span>
          </div>
        </div>

        {/* Quick Move Buttons (Accessibility & Keyboard/Mobile Support) */}
        {onMoveStatus && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400 h-6">
            {normalizedStatus !== 'TODO' ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveStatus(
                    project.id,
                    normalizedStatus === 'DONE' ? 'IN_PROGRESS' : 'TODO'
                  )
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <ArrowLeft size={11} />
                <span>{normalizedStatus === 'DONE' ? 'In Progress' : 'To Do'}</span>
              </button>
            ) : (
              <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                <CircleDot size={10} /> Backlog
              </span>
            )}

            {normalizedStatus !== 'DONE' ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveStatus(
                    project.id,
                    normalizedStatus === 'TODO' ? 'IN_PROGRESS' : 'DONE'
                  )
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 ml-auto transition-colors cursor-pointer"
              >
                <span>{normalizedStatus === 'TODO' ? 'In Progress' : 'Done'}</span>
                <ArrowRight size={11} />
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs ml-auto">
                <CheckCircle2 size={10} /> Complete
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
