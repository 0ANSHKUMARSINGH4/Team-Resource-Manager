import React from 'react'
import { Trash2, Pencil, AlertCircle } from 'lucide-react'
import type { Employee } from '../types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'

interface EmployeeTableProps {
  employees?: Employee[]
  isLoading?: boolean
  onDelete?: (id: number) => void
  onEdit?: (employee: Employee) => void
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees = [],
  isLoading = false,
  onDelete,
  onEdit,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div className="py-8">
        <EmptyState
          icon={AlertCircle}
          title="No employees found"
          description="Try adjusting your search criteria or add a new employee."
        />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
        <thead className="bg-gray-50 dark:bg-slate-700/70 text-gray-500 dark:text-slate-400 font-semibold border-b border-gray-100 dark:border-slate-700">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Designation</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors"
            >
              <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <Avatar name={emp.name} src={emp.avatarUrl} size="md" />
                <div>
                  <div className="font-semibold">{emp.name}</div>
                  {emp.email && (
                    <div className="text-xs text-gray-400 dark:text-slate-400 font-normal">
                      {emp.email}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.department}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">
                {emp.designation || 'Specialist'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge status={emp.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="inline-flex items-center gap-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-1.5 text-gray-400 hover:text-primary hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit employee"
                      aria-label={`Edit ${emp.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(emp.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove employee"
                      aria-label={`Remove ${emp.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
