import React, { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'success' | 'warning' | 'default' | 'info' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
  danger: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800',
  default: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600',
};

function resolveVariant(variant?: BadgeVariant, status?: string): BadgeVariant {
  if (variant) return variant;
  if (!status) return 'default';

  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case 'permanent':
    case 'active':
    case 'done':
    case 'completed':
    case 'success':
      return 'success';
    case 'contract':
    case 'in progress':
    case 'pending':
    case 'warning':
      return 'warning';
    case 'intern':
      return 'default';
    case 'on-site':
    case 'remote':
    case 'hybrid':
    case 'info':
      return 'info';
    case 'failed':
    case 'resigned':
    case 'inactive':
    case 'danger':
      return 'danger';
    default:
      return 'default';
  }
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, status, className, children, ...props }, ref) => {
    const resolvedVariant = resolveVariant(variant, status);
    const content = children ?? status;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors',
          variantStyles[resolvedVariant],
          className
        )}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
