import React, { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { toast } from 'sonner'
import {
  useEmployees,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from '../hooks'
import type { Employee, EmployeeRequest } from '../types'
import { EmployeeTable } from '../components/EmployeeTable'
import { EmployeeForm } from '../components/EmployeeForm'
import { EmployeeFilters } from '../components/EmployeeFilters'
import { EmployeeDetailDrawer } from '../components/EmployeeDetailDrawer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useDebounce } from '@/hooks/useDebounce'

export const EmployeesPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] = useState<Employee | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const { data: pagedData, isLoading } = useEmployees({
    search: debouncedSearch || undefined,
    department: department || undefined,
    status: status || undefined,
    page,
    size: 10,
  })

  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()
  const deleteMutation = useDeleteEmployee()

  const handleOpenCreate = () => {
    setEditingEmployee(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsModalOpen(true)
  }

  const handleSaveEmployee = async (formData: EmployeeRequest) => {
    try {
      if (editingEmployee) {
        await updateMutation.mutateAsync({ id: editingEmployee.id, data: formData })
        toast.success('Employee updated successfully')
      } else {
        await createMutation.mutateAsync(formData)
        toast.success('Employee added successfully')
      }
      setIsModalOpen(false)
      setEditingEmployee(null)
    } catch {
      toast.error(editingEmployee ? 'Failed to update employee' : 'Failed to create employee')
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
  const totalElements = pagedData?.totalElements ?? employees.length
  const totalPages = pagedData?.totalPages ?? 1

  const handleExportCsv = () => {
    if (employees.length === 0) {
      toast.info('No employees available to export.')
      return
    }

    const headers = ['ID', 'Name', 'Email', 'Department', 'Designation', 'Status', 'Work Mode', 'Discipline Score']
    const rows = employees.map((emp) => [
      emp.id,
      `"${emp.name.replace(/"/g, '""')}"`,
      `"${(emp.email || '').replace(/"/g, '""')}"`,
      `"${emp.department.replace(/"/g, '""')}"`,
      `"${(emp.designation || '').replace(/"/g, '""')}"`,
      emp.status,
      emp.workMode || 'REMOTE',
      emp.disciplineScore ?? 85,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `trm-talent-export-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${employees.length} employees to CSV`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Talent Directory</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Manage your company workforce, 360° talent profiles & capacity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExportCsv} variant="secondary" size="md">
            <Download size={16} /> <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button onClick={handleOpenCreate} variant="primary" size="md">
            <Plus size={16} /> Add Employee
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <EmployeeFilters
          search={search}
          onSearchChange={(val) => {
            setSearch(val)
            setPage(0)
          }}
          department={department}
          onDepartmentChange={(val) => {
            setDepartment(val)
            setPage(0)
          }}
          status={status}
          onStatusChange={(val) => {
            setStatus(val)
            setPage(0)
          }}
        />
      </Card>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              Employees ({totalElements})
            </h3>
            <span className="text-xs text-gray-400 dark:text-slate-500 font-normal hidden sm:inline">
              (Click any row to view 360° profile drawer)
            </span>
          </div>
        </div>

        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          onSelect={(emp) => setSelectedEmployeeForDetail(emp)}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteEmployee}
        />

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={pagedData?.last || page + 1 >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* 360° Slide-Over Detail Drawer */}
      <EmployeeDetailDrawer
        employee={selectedEmployeeForDetail}
        isOpen={Boolean(selectedEmployeeForDetail)}
        onClose={() => setSelectedEmployeeForDetail(null)}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteEmployee}
      />

      {/* Add / Edit Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingEmployee(null)
        }}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <EmployeeForm
          key={editingEmployee?.id ?? 'new'}
          initialValues={editingEmployee ?? undefined}
          onSubmit={handleSaveEmployee}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingEmployee(null)
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>
    </div>
  )
}
