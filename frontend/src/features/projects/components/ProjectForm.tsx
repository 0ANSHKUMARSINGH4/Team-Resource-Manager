import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ProjectRequest } from '../types'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  team: z.number({ invalid_type_error: 'Team size must be a number' }).min(1, 'At least 1 team member is required'),
  status: z.enum(['To Do', 'In Progress', 'Done']),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  onSubmit: (data: ProjectRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      team: 3,
      status: 'To Do',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          label="Project Title *"
          placeholder="e.g. Website Redesign"
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      <div>
        <Input
          label="Deadline *"
          type="date"
          error={errors.deadline?.message}
          {...register('deadline')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Team Size *"
            type="number"
            error={errors.team?.message}
            {...register('team', { valueAsNumber: true })}
          />
        </div>

        <div>
          <Select
            label="Initial Status *"
            options={[
              { value: 'To Do', label: 'To Do' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Done', label: 'Done' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          Create Project
        </Button>
      </div>
    </form>
  )
}
