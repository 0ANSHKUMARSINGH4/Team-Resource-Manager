import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useProjects, useCreateProject, useDeleteProject } from '../hooks'
import type { ProjectRequest } from '../types'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectForm } from '../components/ProjectForm'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects()
  const createMutation = useCreateProject()
  const deleteMutation = useDeleteProject()

  const [isModalOpen, setIsModalOpen] = useState(false)

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
    if (window.confirm('Delete this project?')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast.success('Project deleted')
      } catch {
        toast.error('Failed to delete project')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Kanban Board</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Track active initiatives, milestones, and deliverables
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus size={16} /> <span className="hidden sm:inline">New Project</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        size="md"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  )
}
