import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50',
        className
      )}
    >
      {Icon && (
        <div className="mb-4 p-3 rounded-full bg-indigo-50 dark:bg-slate-700 text-primary dark:text-indigo-400">
          <Icon size={28} />
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
