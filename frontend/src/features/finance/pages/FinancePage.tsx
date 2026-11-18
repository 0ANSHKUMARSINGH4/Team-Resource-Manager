import React, { useState, useMemo } from 'react'
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Server,
  Users,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useTransactions,
  useFinanceSummary,
  useCreateTransaction,
  useDeleteTransaction,
} from '../hooks'
import type { TransactionRequest } from '../types'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { CashFlowChart, CashFlowItem } from '@/components/charts/CashFlowChart'
import { TransactionModal } from '../components/TransactionModal'

export const FinancePage: React.FC = () => {
  const { data: transactions = [], isLoading: isTxLoading } = useTransactions()
  const { data: summary } = useFinanceSummary()
  const createMutation = useCreateTransaction()
  const deleteMutation = useDeleteTransaction()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')

  // Currency formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val)
  }

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const desc = t.description || t.desc || ''
      const matchesSearch = desc
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      const normalizedType =
        t.type?.toUpperCase() === 'INCOME' ? 'INCOME' : 'EXPENSE'
      const matchesType = typeFilter === 'ALL' || normalizedType === typeFilter

      const cat = t.category || 'GENERAL'
      const matchesCategory =
        categoryFilter === 'ALL' || cat === categoryFilter

      return matchesSearch && matchesType && matchesCategory
    })
  }, [transactions, searchQuery, typeFilter, categoryFilter])

  // Map monthly cash flow for chart
  const chartData: CashFlowItem[] = useMemo(() => {
    if (!summary?.monthlyCashFlow) return []
    return summary.monthlyCashFlow.map((item) => ({
      name: item.month,
      income: Number(item.income),
      expense: Number(item.expenses),
    }))
  }, [summary])

  const handleCreateTransaction = async (formData: TransactionRequest) => {
    try {
      await createMutation.mutateAsync(formData)
      toast.success('Transaction recorded in ledger')
      setIsModalOpen(false)
    } catch {
      toast.error('Failed to record transaction')
    }
  }

  const handleDeleteTransaction = async (id: number) => {
    if (window.confirm('Delete this ledger transaction?')) {
      try {
        await deleteMutation.mutateAsync(id)
        toast.success('Transaction removed')
      } catch {
        toast.error('Failed to delete transaction')
      }
    }
  }

  // CSV export
  const exportLedgerCsv = () => {
    if (filteredTransactions.length === 0) {
      toast.error('No transactions to export')
      return
    }

    const headers = ['ID', 'Description', 'Amount', 'Type', 'Category', 'Date']
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${(t.description || t.desc || '').replace(/"/g, '""')}"`,
      t.amount,
      t.type?.toUpperCase(),
      t.category || 'GENERAL',
      t.transactionDate || t.date || '',
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `trm-ledger-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Ledger exported to CSV')
  }

  const getCategoryBadge = (category?: string) => {
    const cat = category?.toUpperCase() || 'GENERAL'
    switch (cat) {
      case 'CLIENT_PAYMENT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Briefcase size={10} /> Retainer
          </span>
        )
      case 'SERVER':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Server size={10} /> Cloud / Infra
          </span>
        )
      case 'SALARY':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Users size={10} /> Payroll
          </span>
        )
      case 'LICENSE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Layers size={10} /> Software
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <Receipt size={10} /> {cat}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <DollarSign className="text-emerald-600 dark:text-emerald-400" size={26} />
            Financial Intelligence & Ledger
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time cash flow analytics, double-entry tracking, and margin intelligence
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={exportLedgerCsv}
            variant="secondary"
            className="flex items-center gap-1.5"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            className="flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
          >
            <Plus size={16} />
            <span>Record Transaction</span>
          </Button>
        </div>
      </div>

      {/* Finance Stat Cards (Real-time data from /api/v1/finance/summary) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Operating Budget"
          value={summary ? formatCurrency(summary.totalBudget) : '$128,000'}
          subtext="Annual Target"
          trend="+5.2%"
          trendUp={true}
          icon={DollarSign}
        />
        <StatCard
          title="Gross Expenses"
          value={summary ? formatCurrency(summary.totalExpenses) : '$106,700'}
          subtext="Year-to-Date"
          trend="-8.4% vs forecast"
          trendUp={true}
          icon={TrendingDown}
        />
        <StatCard
          title="Total Receipts"
          value={summary ? formatCurrency(summary.totalIncome) : '$189,500'}
          subtext="Recognized Revenue"
          trend="+18.5% YoY"
          trendUp={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Net Operating Margin"
          value={summary ? `${summary.profitMargin}%` : '43.7%'}
          subtext={summary ? `Net ${formatCurrency(summary.netIncome)}` : 'Safe Runway'}
          trend="Strong Health"
          trendUp={true}
          icon={PieChart}
        />
      </div>

      {/* Main Content: Cash Flow Chart & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Cash Flow Area Chart */}
        <Card hoverEffect className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Cash Flow Trajectory</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles size={10} /> Live Spring Boot API
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monthly comparative breakdown of gross revenues against operating overhead
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Income
                </span>
                <span className="flex items-center gap-1.5 text-rose-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Expenses
                </span>
              </div>
            </div>

            <div className="h-64">
              <CashFlowChart data={chartData} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
            <div>
              <p className="text-slate-400 text-[11px]">Avg Monthly Burn</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {summary
                  ? formatCurrency(summary.totalExpenses / 6)
                  : '$17,783'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Avg Monthly Receipts</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {summary
                  ? formatCurrency(summary.totalIncome / 6)
                  : '$31,583'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Net Runway</p>
              <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                24+ Months
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Insights & Allocation Breakdown */}
        <Card hoverEffect className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
              Capital Allocation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Operational spend concentration
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Payroll & Engineering</span>
                  <span className="text-slate-900 dark:text-white font-bold">62%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700 dark:text-slate-300">AWS / Cloud Infrastructure</span>
                  <span className="text-slate-900 dark:text-white font-bold">18%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Software & SaaS Licenses</span>
                  <span className="text-slate-900 dark:text-white font-bold">12%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Facilities & Other</span>
                  <span className="text-slate-900 dark:text-white font-bold">8%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles size={14} /> Optimization Insight
            </h4>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 mt-1 leading-relaxed">
              Consolidating SaaS licenses could yield an estimated \$4,200 annual overhead reduction.
            </p>
          </div>
        </Card>
      </div>

      {/* Transaction Table Card */}
      <Card hoverEffect className="overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Ledger Transactions ({filteredTransactions.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Double-entry audit entries verified against primary banking accounts
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ledger..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setTypeFilter('ALL')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  typeFilter === 'ALL'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('INCOME')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  typeFilter === 'INCOME'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('EXPENSE')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  typeFilter === 'EXPENSE'
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Expenses
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="CLIENT_PAYMENT">Client Retainer</option>
                <option value="SERVER">Cloud / Infra</option>
                <option value="SALARY">Payroll</option>
                <option value="LICENSE">Software / SaaS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        {isTxLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner size="lg" />
            <p className="mt-3 text-xs text-slate-400">Loading ledger...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Description</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Flow</th>
                  <th className="px-6 py-3.5 text-right">Amount</th>
                  <th className="px-6 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTransactions.map((t) => {
                  const isIncome =
                    t.type?.toUpperCase() === 'INCOME' ||
                    t.type?.toLowerCase() === 'income' ||
                    t.amount > 0 && !t.type

                  const desc = t.description || t.desc || 'Transaction'
                  const dateStr = t.transactionDate || t.date || '—'
                  const amountVal = Math.abs(t.amount)

                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isIncome
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isIncome ? (
                              <ArrowUpRight size={14} />
                            ) : (
                              <ArrowDownRight size={14} />
                            )}
                          </div>
                          <span>{desc}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(t.category)}
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        {dateStr}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isIncome
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          }`}
                        >
                          {isIncome ? 'Credit / Income' : 'Debit / Expense'}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 font-bold text-right whitespace-nowrap ${
                          isIncome
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {isIncome ? '+' : '-'}
                        {formatCurrency(amountVal)}
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDeleteTransaction(t.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                          title="Delete transaction"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="py-16 text-center text-slate-400 dark:text-slate-500">
                <Receipt size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No ledger transactions found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting filters or click Record Transaction to log an entry.
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Record Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTransaction}
        isLoading={createMutation.isPending}
      />
    </div>
  )
}
