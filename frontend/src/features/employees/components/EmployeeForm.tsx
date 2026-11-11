import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { EmployeeRequest } from '../types'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  department: z.string().min(1, 'Please select a department'),
  designation: z.string().optional(),
  age: z.number({ invalid_type_error: 'Age must be a number' }).min(16, 'Age must be at least 16').max(100, 'Age must be at most 100'),
  status: z.enum(['PERMANENT', 'CONTRACT', 'INTERN']),
  workMode: z.enum(['ON_SITE', 'REMOTE', 'HYBRID']),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
  initialValues?: Partial<EmployeeRequest>
  onSubmit: (data: EmployeeRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

const DEPARTMENTS = [
  { value: '', label: 'Select Department' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Sales', label: 'Sales' },
]

const STATUSES = [
  { value: 'PERMANENT', label: 'Permanent' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERN', label: 'Intern' },
]

const WORK_MODES = [
  { value: 'ON_SITE', label: 'On-Site' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'HYBRID', label: 'Hybrid' },
]

function normalizeEnum<T extends string>(val: string | undefined, valid: readonly T[], fallback: T): T {
  const upper = val?.toUpperCase().replace('-', '_') as T | undefined
  return upper && valid.includes(upper) ? upper : fallback
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: initialValues?.name || '',
      email: initialValues?.email || '',
      department: initialValues?.department || '',
      designation: initialValues?.designation || '',
      age: initialValues?.age || 28,
      status: normalizeEnum(initialValues?.status, ['PERMANENT', 'CONTRACT', 'INTERN'] as const, 'PERMANENT'),
      workMode: normalizeEnum(initialValues?.workMode, ['ON_SITE', 'REMOTE', 'HYBRID'] as const, 'ON_SITE'),
    },
  })

  const handleFormSubmit = (data: EmployeeFormValues) => {
    onSubmit({
      ...data,
      disciplineScore: initialValues?.disciplineScore ?? 90,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div>
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. alex@trm.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Select
            label="Department *"
            options={DEPARTMENTS}
            error={errors.department?.message}
            {...register('department')}
          />
        </div>

        <div>
          <Input
            label="Designation"
            placeholder="e.g. Frontend Engineer"
            error={errors.designation?.message}
            {...register('designation')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Input
            label="Age *"
            type="number"
            placeholder="28"
            error={errors.age?.message}
            {...register('age', { valueAsNumber: true })}
          />
        </div>

        <div>
          <Select
            label="Status *"
            options={STATUSES}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div>
          <Select
            label="Work Mode *"
            options={WORK_MODES}
            error={errors.workMode?.message}
            {...register('workMode')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          Save Employee
        </Button>
      </div>
    </form>
  )
}
