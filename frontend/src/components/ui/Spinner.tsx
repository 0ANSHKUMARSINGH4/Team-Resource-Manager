import React from 'react';
import { cn } from '@/lib/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className, ...props }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
