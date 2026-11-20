import React, { useState } from 'react';
import { cn } from '@/lib/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
}

export const getAvatarColor = (name?: string): string => {
  if (!name) return 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300';

  const colors = [
    'bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300',
    'bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-300',
    'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300',
    'bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-300',
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300',
    'bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300',
    'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300',
    'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300',
    'bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export const Avatar: React.FC<AvatarProps> = ({
  name = '',
  src,
  alt,
  size = 'md',
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(src && !imageError);
  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold select-none shrink-0 overflow-hidden',
        sizeClasses[size],
        !showImage && colorClass,
        className
      )}
      title={name}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
