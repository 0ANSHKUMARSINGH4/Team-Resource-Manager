import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus, CircleDot, Clock, CheckCircle2 } from 'lucide-react'
import type { Project } from '../types'
import { KanbanCard } from './KanbanCard'

interface KanbanColumnProps {
  id: string
  title: string
  projects: Project[]
  onAddNew?: (status: string) => void
  onDeleteProject?: (id: number) => void
  onMoveStatus?: (id: number, targetStatus: string) => void
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  projects,
  onAddNew,
  onDeleteProject,
  onMoveStatus,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  // Theme accents per column
  const columnConfig = {
    TODO: {
      icon: CircleDot,
      color: 'text-slate-600 dark:text-slate-400',
      badge: 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
      borderAccent: 'border-t-slate-400 dark:border-t-slate-500',
      overBg: 'bg-slate-100/70 dark:bg-slate-800/60 ring-2 ring-slate-400/50',
    },
    IN_PROGRESS: {
      icon: Clock,
      color: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300',
      borderAccent: 'border-t-indigo-500 dark:border-t-indigo-400',
      overBg: 'bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/50',
    },
    DONE: {
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
      borderAccent: 'border-t-emerald-500 dark:border-t-emerald-400',
      overBg: 'bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/50',
    },
  }[id as 'TODO' | 'IN_PROGRESS' | 'DONE'] || {
    icon: CircleDot,
    color: 'text-slate-600',
    badge: 'bg-slate-200 text-slate-700',
    borderAccent: 'border-t-slate-400',
    overBg: 'bg-slate-50 ring-2 ring-slate-400',
  }

  const Icon = columnConfig.icon
  const projectIds = projects.map((p) => p.id)

  return (
    <div className="flex flex-col flex-1 min-w-[300px] max-w-full rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 shadow-xs">
      {/* Column Header */}
      <div
        className={`p-4 border-b border-slate-200/60 dark:border-slate-800/80 border-t-4 ${columnConfig.borderAccent} rounded-t-2xl flex items-center justify-between`}
      >
        <div className="flex items-center gap-2.5">
          <Icon size={18} className={columnConfig.color} />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {title}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${columnConfig.badge}`}
          >
            {projects.length}
          </span>
        </div>

        {onAddNew && (
          <button
            type="button"
            onClick={() => onAddNew(id)}
            className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={`Add task to ${title}`}
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Droppable Content Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-3 space-y-3 min-h-[450px] transition-all rounded-b-2xl ${
          isOver ? columnConfig.overBg : ''
        }`}
      >
        <SortableContext
          items={projectIds}
          strategy={verticalListSortingStrategy}
        >
          {projects.map((project) => (
            <KanbanCard
              key={project.id}
              project={project}
              onDelete={onDeleteProject}
              onMoveStatus={onMoveStatus}
            />
          ))}
        </SortableContext>

        {projects.length === 0 && (
          <div className="h-36 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center p-4">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              No tasks in {title.toLowerCase()}
            </p>
            <p className="text-[11px] text-slate-400/80 dark:text-slate-600 mt-1">
              Drag cards here or click + to add
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
