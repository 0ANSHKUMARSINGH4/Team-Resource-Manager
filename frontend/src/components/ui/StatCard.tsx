import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from './Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  trendUp,
  icon: Icon,
  className,
}) => {
  return (
    <Card className={cn('p-6 flex flex-col justify-between', className)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg text-primary dark:text-indigo-400">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-gray-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-full',
              trendUp
                ? 'bg-green-100 text-green-600 dark:bg-green-900/60 dark:text-green-300'
                : 'bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{value}</div>
      {subtext && <div className="text-xs text-gray-400 dark:text-slate-500">{subtext}</div>}
    </Card>
  );
};
