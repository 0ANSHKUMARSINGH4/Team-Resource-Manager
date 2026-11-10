import React from 'react'
import { Search } from 'lucide-react'
import { Select } from '@/components/ui/Select'

interface EmployeeFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  department: string
  onDepartmentChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

const DEPARTMENTS = [
  { value: '', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'HR', label: 'HR' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Sales', label: 'Sales' },
]

const STATUSES = [
  { value: '', label: 'All Statuses' },
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Intern', label: 'Intern' },
]

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by employee name or email..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white dark:bg-slate-700/60 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
        />
      </div>

      <div className="flex gap-3">
        <div className="w-40">
          <Select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            options={DEPARTMENTS}
          />
        </div>
        <div className="w-36">
          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={STATUSES}
          />
        </div>
      </div>
    </div>
  )
}
