import React from 'react'
import { Clock, CheckCircle2, Trash2, Calendar, DollarSign } from 'lucide-react'
import type { Project } from '../types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ProjectCardProps {
  project: Project
  onDelete?: (id: number) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const isDone = project.status === 'Done' || project.status === 'DONE'
  const teamSize = project.team ?? 3

  const formattedBudget = project.budget
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(project.budget)
    : null

  return (
    <Card
      hoverEffect
      className="p-6 relative group hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 dark:hover:border-slate-600 transition-all duration-300 flex flex-col justify-between min-h-[250px] h-full"
    >
      {onDelete && (
        <button
          onClick={() => onDelete(project.id)}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
          title="Delete project"
          aria-label={`Delete ${project.title}`}
        >
          <Trash2 size={15} />
        </button>
      )}

      <div>
        {/* Top Header: Clean Uniform Icon Bubble and Status Badge */}
        <div className="flex justify-between items-center mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
              isDone
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60'
                : 'bg-indigo-50 dark:bg-slate-700/80 text-primary dark:text-indigo-400 border border-indigo-100 dark:border-slate-600'
            }`}
          >
            {isDone ? <CheckCircle2 size={20} /> : <Clock size={20} />}
          </div>

          <Badge status={project.status} />
        </div>

        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1 leading-snug line-clamp-1">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Due Date & Budget Row */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-4 pt-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-gray-400" />
            <span>Due: {project.deadline || 'Ongoing'}</span>
          </div>

          {formattedBudget && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
              <DollarSign size={11} /> {formattedBudget}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Clean Avatar Grouping */}
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
        <div className="flex -space-x-1.5">
          {[...Array(Math.min(teamSize, 4))].map((_, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center text-[10px] font-bold shadow-2xs"
            >
              U{i + 1}
            </div>
          ))}
          {teamSize > 4 && (
            <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center text-[10px] font-bold shadow-2xs">
              +{teamSize - 4}
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
          {teamSize} members
        </span>
      </div>
    </Card>
  )
}
