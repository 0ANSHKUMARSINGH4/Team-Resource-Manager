import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ProjectRequest } from '../types'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const projectSchema = z.object({
  title: z.string().min(2, 'Title is required (min 2 chars)'),
  description: z.string().optional(),
  deadline: z.string().min(1, 'Deadline is required'),
  team: z
    .number({ invalid_type_error: 'Team size must be a number' })
    .min(1, 'At least 1 team member is required'),
  budget: z
    .number({ invalid_type_error: 'Budget must be a number' })
    .optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'To Do', 'In Progress', 'Done']),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  onSubmit: (data: ProjectRequest) => void
  onCancel: () => void
  isLoading?: boolean
  defaultStatus?: string
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultStatus = 'TODO',
}) => {
  const normalizedDefault =
    defaultStatus === 'In Progress' || defaultStatus === 'IN_PROGRESS'
      ? 'IN_PROGRESS'
      : defaultStatus === 'Done' || defaultStatus === 'DONE'
      ? 'DONE'
      : 'TODO'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      team: 3,
      budget: 50000,
      status: normalizedDefault as 'TODO' | 'IN_PROGRESS' | 'DONE',
    },
  })

  const handleFormSubmit = (data: ProjectFormValues) => {
    // Standardize status format before submitting to backend
    let mappedStatus = data.status
    if (mappedStatus === 'To Do') mappedStatus = 'TODO'
    else if (mappedStatus === 'In Progress') mappedStatus = 'IN_PROGRESS'
    else if (mappedStatus === 'Done') mappedStatus = 'DONE'

    onSubmit({
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      team: data.team,
      budget: data.budget,
      status: mappedStatus,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input
          label="Project Title *"
          placeholder="e.g. Website Redesign & Migration"
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Brief summary of objectives, sprint milestones, and deliverables"
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Deadline *"
            type="date"
            error={errors.deadline?.message}
            {...register('deadline')}
          />
        </div>

        <div>
          <Input
            label="Estimated Budget ($)"
            type="number"
            placeholder="50000"
            error={errors.budget?.message}
            {...register('budget', { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Team Size (devs) *"
            type="number"
            error={errors.team?.message}
            {...register('team', { valueAsNumber: true })}
          />
        </div>

        <div>
          <Select
            label="Initial Stage *"
            options={[
              { value: 'TODO', label: 'To Do (Backlog)' },
              { value: 'IN_PROGRESS', label: 'In Progress (Active)' },
              { value: 'DONE', label: 'Done (Completed)' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          Create Initiative
        </Button>
      </div>
    </form>
  )
}
