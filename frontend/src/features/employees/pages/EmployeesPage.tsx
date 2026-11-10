import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  useEmployees,
  useCreateEmployee,
  useDeleteEmployee,
} from '../hooks'
import type { EmployeeRequest } from '../types'
import { EmployeeTable } from '../components/EmployeeTable'
import { EmployeeForm } from '../components/EmployeeForm'
import { EmployeeFilters } from '../components/EmployeeFilters'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useDebounce } from '@/hooks/useDebounce'

export const EmployeesPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

  const { data: pagedData, isLoading } = useEmployees({
    search: debouncedSearch || undefined,
    department: department || undefined,
    status: status || undefined,
  })

  const createMutation = useCreateEmployee()
  const deleteMutation = useDeleteEmployee()

  const handleCreateEmployee = async (formData: EmployeeRequest) => {
    try {
      await createMutation.mutateAsync(formData)
      toast.success('Employee added successfully')
      setIsModalOpen(false)
    } catch {
      toast.error('Failed to create employee')
    }
  }

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast.success('Employee removed successfully')
      } catch {
        toast.error('Failed to remove employee')
      }
    }
  }

  const employees = pagedData?.content || []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Team Members</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Manage your company workforce and contractor profiles
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus size={16} /> Add Employee
        </Button>
      </div>

      <Card className="p-4">
        <EmployeeFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
        />
      </Card>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            Employees ({employees.length})
          </h3>
        </div>

        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          onDelete={handleDeleteEmployee}
        />
      </Card>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Employee"
        size="lg"
      >
        <EmployeeForm
          onSubmit={handleCreateEmployee}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  )
}
