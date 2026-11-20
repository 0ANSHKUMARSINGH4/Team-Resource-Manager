import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<SelectOption | string>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      id,
      className,
      disabled,
      required,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || (label ? `select-${generatedId}` : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-slate-300"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={cn(
              'w-full appearance-none px-3.5 py-2 pr-10 text-sm rounded-lg border bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-slate-600 focus:ring-primary/20 focus:border-primary',
              disabled && 'opacity-60 bg-gray-50 dark:bg-slate-800 cursor-not-allowed',
              className
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-gray-400">
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => {
                  if (typeof opt === 'string') {
                    return (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    );
                  }
                  return (
                    <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </option>
                  );
                })
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-slate-400">
            <ChevronDown size={16} />
          </div>
        </div>
        {error ? (
          <p id={`${selectId}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
