import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import type { TransactionRequest } from '../types'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

const transactionSchema = z.object({
  description: z.string().min(2, 'Description is required (min 2 characters)'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a valid number' })
    .positive('Amount must be greater than 0'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Category is required'),
  transactionDate: z.string().min(1, 'Transaction date is required'),
})

type TransactionFormValues = z.infer<typeof transactionSchema>

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TransactionRequest) => void
  isLoading?: boolean
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      amount: 1500,
      type: 'EXPENSE',
      category: 'SERVER',
      transactionDate: new Date().toISOString().split('T')[0],
    },
  })

  const currentType = watch('type')

  const handleFormSubmit = (data: TransactionFormValues) => {
    onSubmit({
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      transactionDate: data.transactionDate,
    })
    reset()
  }

  const categoryOptions = [
    { value: 'CLIENT_PAYMENT', label: 'Client Retainer / Revenue' },
    { value: 'SERVER', label: 'Cloud & Infrastructure (AWS/GCP)' },
    { value: 'LICENSE', label: 'Software Licenses & SaaS' },
    { value: 'SALARY', label: 'Payroll & Compensation' },
    { value: 'MARKETING', label: 'Advertising & Marketing' },
    { value: 'OFFICE', label: 'Office & Equipment' },
    { value: 'CONSULTING', label: 'Legal & Professional Services' },
    { value: 'OTHER', label: 'Other / Miscellaneous' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Financial Transaction"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Transaction Type Segmented Switch */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Transaction Direction *
          </label>
          <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setValue('type', 'INCOME')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentType === 'INCOME'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp size={16} />
              <span>Income / Revenue</span>
            </button>
            <button
              type="button"
              onClick={() => setValue('type', 'EXPENSE')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentType === 'EXPENSE'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingDown size={16} />
              <span>Operating Expense</span>
            </button>
          </div>
        </div>

        <div>
          <Input
            label="Transaction Description *"
            placeholder="e.g. AWS Cloud Infrastructure or Enterprise Retainer"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Amount ($) *"
              type="number"
              step="0.01"
              placeholder="2500.00"
              error={errors.amount?.message}
              {...register('amount', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Input
              label="Transaction Date *"
              type="date"
              error={errors.transactionDate?.message}
              {...register('transactionDate')}
            />
          </div>
        </div>

        <div>
          <Select
            label="Category *"
            options={categoryOptions}
            error={errors.category?.message}
            {...register('category')}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="flex items-center gap-1.5"
          >
            <DollarSign size={16} />
            <span>Record Transaction</span>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
