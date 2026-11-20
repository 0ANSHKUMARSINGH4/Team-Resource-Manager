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
    <Card
      hoverEffect
      className={cn(
        'p-6 flex flex-col justify-between transition-all duration-300 hover:border-indigo-200 dark:hover:border-slate-600 group',
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2.5 bg-indigo-50 dark:bg-slate-700/80 rounded-xl text-primary dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200 shadow-2xs">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-gray-500 dark:text-slate-400 text-sm font-semibold">{title}</h3>
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-bold px-2.5 py-0.5 rounded-full shadow-2xs',
              trendUp
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white mb-1 tracking-tight">
        {value}
      </div>
      {subtext && <div className="text-xs text-gray-400 dark:text-slate-500 font-medium">{subtext}</div>}
    </Card>
  );
};
