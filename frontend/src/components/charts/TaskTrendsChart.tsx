import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDarkMode } from '@/hooks/useDarkMode'

export interface TaskTrendItem {
  name: string
  tasks: number
  completed: number
}

interface TaskTrendsChartProps {
  data?: TaskTrendItem[]
}

const defaultData: TaskTrendItem[] = [
  { name: 'Jan', tasks: 40, completed: 24 },
  { name: 'Feb', tasks: 50, completed: 30 },
  { name: 'Mar', tasks: 60, completed: 45 },
  { name: 'Apr', tasks: 45, completed: 30 },
]

export const TaskTrendsChart: React.FC<TaskTrendsChartProps> = ({ data = defaultData }) => {
  const { isDark } = useDarkMode()

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={20}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? '#334155' : '#E5E7EB'}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#9CA3AF' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#9CA3AF' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#fff',
              borderColor: isDark ? '#334155' : '#e5e7eb',
              color: isDark ? '#fff' : '#000',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="tasks" stackId="a" fill="#E0E7FF" radius={[0, 0, 4, 4]} />
          <Bar dataKey="completed" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
