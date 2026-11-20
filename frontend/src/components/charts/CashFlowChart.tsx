import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDarkMode } from '@/hooks/useDarkMode'

export interface CashFlowItem {
  name: string
  income: number
  expense: number
}

interface CashFlowChartProps {
  data?: CashFlowItem[]
}

const defaultData: CashFlowItem[] = [
  { name: 'Week 1', income: 4000, expense: 2400 },
  { name: 'Week 2', income: 3000, expense: 1398 },
  { name: 'Week 3', income: 2000, expense: 9800 },
  { name: 'Week 4', income: 2780, expense: 3908 },
]

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data = defaultData }) => {
  const { isDark } = useDarkMode()

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
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
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
