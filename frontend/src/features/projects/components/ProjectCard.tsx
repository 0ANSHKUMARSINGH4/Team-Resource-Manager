import React from 'react'
import { Clock, CheckCircle, Trash2 } from 'lucide-react'
import type { Project } from '../types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ProjectCardProps {
  project: Project
  onDelete?: (id: number) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const isDone = project.status === 'Done' || project.status === 'DONE'

  return (
    <Card
      hoverEffect
      className="p-6 relative group hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 dark:hover:border-slate-600 transition-all duration-300 flex flex-col justify-between"
    >
      {onDelete && (
        <button
          onClick={() => onDelete(project.id)}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          title="Delete project"
          aria-label={`Delete ${project.title}`}
        >
          <Trash2 size={16} />
        </button>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-3 rounded-lg ${
              isDone
                ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300'
                : 'bg-indigo-50 text-primary dark:bg-slate-700 dark:text-indigo-400'
            }`}
          >
            {isDone ? <CheckCircle size={24} /> : <Clock size={24} />}
          </div>
        </div>

        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">
          {project.title}
        </h3>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-400 mb-6">
          <span>Due: {project.deadline}</span>
          <Badge status={project.status} />
        </div>
      </div>

      {/* Avatar Overlap Logic */}
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
        <div className="flex -space-x-2">
          {[...Array(Math.min(project.team, 4))].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-slate-300"
            >
              U{i + 1}
            </div>
          ))}
          {project.team > 4 && (
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-primary dark:text-indigo-300">
              +{project.team - 4}
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
          {project.team} members
        </span>
      </div>
    </Card>
  )
}
