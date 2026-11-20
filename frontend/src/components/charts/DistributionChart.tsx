import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export interface DistributionItem {
  name: string
  value: number
  color?: string
}

interface DistributionChartProps {
  data?: DistributionItem[]
  total?: number
}

const defaultColors = ['#10B981', '#6366F1', '#F59E0B', '#EF4444']

export const DistributionChart: React.FC<DistributionChartProps> = ({
  data = [
    { name: 'On-Site', value: 35, color: '#10B981' },
    { name: 'Remote', value: 65, color: '#6366F1' },
  ],
  total,
}) => {
  const calculatedTotal = total ?? data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="w-full flex-1 relative flex items-center justify-center min-h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-800 dark:text-white">{calculatedTotal}</span>
        <span className="text-xs text-gray-400 dark:text-slate-400">Total</span>
      </div>
    </div>
  )
}
