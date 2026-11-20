import React, { useState, useMemo } from 'react'
import {
  Plus,
  Search,
  Kanban,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Layers,
  DollarSign,
  Filter
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useProjects,
  useCreateProject,
  useUpdateProjectStatus,
  useDeleteProject,
} from '../hooks'
import type { ProjectRequest } from '../types'
import { KanbanBoard } from '../components/KanbanBoard'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectForm } from '../components/ProjectForm'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { StatCard } from '@/components/ui/StatCard'

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects()
  const createMutation = useCreateProject()
  const updateStatusMutation = useUpdateProjectStatus()
  const deleteMutation = useDeleteProject()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDefaultStatus, setModalDefaultStatus] = useState<string>('TODO')
  const [viewMode, setViewMode] = useState<'kanban' | 'grid'>('kanban')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description &&
          project.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const normalizedStatus =
        project.status === 'To Do' || project.status === 'TODO'
          ? 'TODO'
          : project.status === 'In Progress' || project.status === 'IN_PROGRESS'
          ? 'IN_PROGRESS'
          : 'DONE'

      const matchesStatus =
        statusFilter === 'ALL' || normalizedStatus === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [projects, searchQuery, statusFilter])

  // Summary KPIs
  const stats = useMemo(() => {
    const total = projects.length
    const inProgress = projects.filter(
      (p) => p.status === 'IN_PROGRESS' || p.status === 'In Progress'
    ).length
    const done = projects.filter(
      (p) => p.status === 'DONE' || p.status === 'Done'
    ).length
    const totalBudget = projects.reduce((acc, p) => acc + (p.budget ?? 0), 0)

    const formattedBudget = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(totalBudget)

    return { total, inProgress, done, formattedBudget }
  }, [projects])

  const handleStatusChange = async (projectId: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: projectId,
        status: newStatus as any,
      })
      toast.success(
        `Project moved to ${
          newStatus === 'DONE'
            ? 'Completed'
            : newStatus === 'IN_PROGRESS'
            ? 'In Progress'
            : 'To Do'
        }`
      )
    } catch {
      toast.error('Failed to update project status')
    }
  }

  const handleCreateProject = async (formData: ProjectRequest) => {
    try {
      await createMutation.mutateAsync(formData)
      toast.success('Project created successfully')
      setIsModalOpen(false)
    } catch {
      toast.error('Failed to create project')
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast.success('Project deleted successfully')
      } catch {
        toast.error('Failed to delete project')
      }
    }
  }

  const handleOpenCreateModal = (columnStatus?: string) => {
    if (columnStatus) {
      setModalDefaultStatus(columnStatus)
    } else {
      setModalDefaultStatus('TODO')
    }
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Kanban className="text-indigo-600 dark:text-indigo-400" size={26} />
            Kanban Delivery Board
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Drag-and-drop initiatives across agile sprint stages with real-time sync
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Kanban size={14} />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          <Button
            onClick={() => handleOpenCreateModal('TODO')}
            variant="primary"
            className="flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
          >
            <Plus size={16} />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Initiatives"
          value={stats.total}
          subtext="Active in roadmap"
          icon={Layers}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtext="Under active development"
          trend="+2 this week"
          trendUp={true}
          icon={Clock}
        />
        <StatCard
          title="Completed"
          value={stats.done}
          subtext="Shipped to production"
          trend="85% on-time"
          trendUp={true}
          icon={CheckCircle2}
        />
        <StatCard
          title="Committed Budget"
          value={stats.formattedBudget}
          subtext="Across all teams"
          icon={DollarSign}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, milestones..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter size={14} className="text-slate-400" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Stage:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Stages ({projects.length})</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
          </select>
        </div>
      </div>

      {/* Main Board / Grid Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 animate-pulse">
            Loading Kanban delivery board...
          </p>
        </div>
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          projects={filteredProjects}
          onStatusChange={handleStatusChange}
          onDeleteProject={handleDeleteProject}
          onAddNewToColumn={handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              No initiatives match your filters.
            </div>
          )}
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Agile Initiative"
        size="md"
      >
        <ProjectForm
          defaultStatus={modalDefaultStatus}
          onSubmit={handleCreateProject}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  )
}
