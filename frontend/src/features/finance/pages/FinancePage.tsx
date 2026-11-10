import React, { useState } from 'react'
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import type { Transaction } from '../types'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { CashFlowChart } from '@/components/charts/CashFlowChart'

const initialTransactions: Transaction[] = [
  { id: 1, desc: 'AWS Server Costs', amount: -1200, date: '2026-02-01', type: 'expense' },
  { id: 2, desc: 'Client Payment #102', amount: 8500, date: '2026-02-03', type: 'income' },
  { id: 3, desc: 'SaaS Licenses', amount: -450, date: '2026-02-05', type: 'expense' },
  { id: 4, desc: 'Q1 Bonus Payout', amount: -3200, date: '2026-02-06', type: 'expense' },
]

export const FinancePage: React.FC = () => {
  const [transactions] = useState<Transaction[]>(initialTransactions)

  return (
    <div className="space-y-6">
      {/* Finance Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Budget"
          value="$128k"
          subtext="Annual"
          trend="+5%"
          trendUp={true}
          icon={DollarSign}
        />
        <StatCard
          title="Expenses"
          value="$45.2k"
          subtext="YTD"
          trend="+12%"
          trendUp={false}
          icon={TrendingDown}
        />
        <StatCard
          title="Net Income"
          value="$82.8k"
          subtext="Safe"
          trend="+8%"
          trendUp={true}
          icon={TrendingUp}
        />
      </div>

      {/* Main Content: Table & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Table */}
        <Card className="overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-gray-100 dark:border-slate-700">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                Recent Transactions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
                <tbody className="divide-y divide-gray-100 dark:border-slate-700">
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{t.desc}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {t.date}
                      </td>
                      <td
                        className={`px-6 py-4 font-bold whitespace-nowrap ${
                          t.amount > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-800 dark:text-slate-200'
                        }`}
                      >
                        {t.amount > 0 ? '+' : ''}
                        {t.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Finance Chart */}
        <Card className="p-6 h-80 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
            Cash Flow Analysis
          </h3>
          <div className="flex-1 min-h-0">
            <CashFlowChart />
          </div>
        </Card>
      </div>
    </div>
  )
}
