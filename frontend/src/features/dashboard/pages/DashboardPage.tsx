import React, { useState } from 'react'
import { Plus, Users, UserCheck, Briefcase, Award } from 'lucide-react'
import { toast } from 'sonner'
import { useDashboardStats } from '../hooks'
import { useEmployees, useCreateEmployee, useDeleteEmployee } from '@/features/employees/hooks'
import type { EmployeeRequest } from '@/features/employees/types'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TaskTrendsChart } from '@/components/charts/TaskTrendsChart'
import { DistributionChart } from '@/components/charts/DistributionChart'
import { EmployeeTable } from '@/features/employees/components/EmployeeTable'
import { EmployeeForm } from '@/features/employees/components/EmployeeForm'

export const DashboardPage: React.FC = () => {
  const { data: stats } = useDashboardStats()
  const { data: pagedEmployees, isLoading: isEmployeesLoading } = useEmployees({ size: 5 })
  const createMutation = useCreateEmployee()
  const deleteMutation = useDeleteEmployee()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateEmployee = async (formData: EmployeeRequest) => {
    try {
      await createMutation.mutateAsync(formData)
      toast.success('Employee added successfully')
      setIsModalOpen(false)
    } catch {
      toast.error('Failed to add employee')
    }
  }

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Remove employee?')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast.success('Employee removed')
      } catch {
        toast.error('Failed to remove employee')
      }
    }
  }

  const employees = pagedEmployees?.content || []
  const totalEmployees = stats?.totalEmployees ?? pagedEmployees?.totalElements ?? employees.length
  const permanentCount = stats?.byStatus?.PERMANENT ?? 0
  const contractAndInternCount =
    (stats?.byStatus?.CONTRACT ?? 0) + (stats?.byStatus?.INTERN ?? 0)
  const permanentRate = stats?.permanentRate ?? 0
  const avgDiscipline = stats?.averageDisciplineScore ?? 0

  const onSiteCount = stats?.byWorkMode?.ON_SITE ?? 0
  const remoteCount = stats?.byWorkMode?.REMOTE ?? 0
  const hybridCount = stats?.byWorkMode?.HYBRID ?? 0
  const hasWorkModeData = onSiteCount + remoteCount + hybridCount > 0

  const distributionData = hasWorkModeData
    ? [
        { name: 'On-Site', value: onSiteCount, color: '#10B981' },
        { name: 'Remote', value: remoteCount, color: '#6366F1' },
        { name: 'Hybrid', value: hybridCount, color: '#F59E0B' },
      ].filter((item) => item.value > 0)
    : undefined

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          subtext="Active Members"
          icon={Users}
        />
        <StatCard
          title="Permanent Staff"
          value={permanentCount}
          subtext="Full-time workforce"
          trend={`${permanentRate}%`}
          trendUp={permanentRate >= 50}
          icon={UserCheck}
        />
        <StatCard
          title="Contract & Intern"
          value={contractAndInternCount}
          subtext="Flexible capacity"
          icon={Briefcase}
        />
        <StatCard
          title="Avg. Discipline"
          value={`${avgDiscipline}%`}
          subtext="Team performance score"
          trendUp={avgDiscipline >= 80}
          icon={Award}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4 md:p-6 h-80 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Task Trends</h3>
          <div className="flex-1 min-h-0">
            <TaskTrendsChart />
          </div>
        </Card>

        {/* Distribution Card with Legend */}
        <Card className="p-6 flex flex-col items-start h-80">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Distribution</h3>
          <DistributionChart data={distributionData} total={totalEmployees} />

          {/* Chart Legend */}
          <div className="w-full flex justify-center gap-4 mt-4 pt-2 border-t border-gray-50 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">On-Site</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Remote</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Hybrid</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Resources / Employees Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">Recent Resources</h3>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm">
            <Plus size={16} /> Add
          </Button>
        </div>

        <EmployeeTable
          employees={employees}
          isLoading={isEmployeesLoading}
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
