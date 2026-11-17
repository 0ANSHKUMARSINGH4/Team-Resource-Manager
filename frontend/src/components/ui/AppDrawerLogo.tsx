import React from 'react'

interface AppDrawerLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export const AppDrawerLogo: React.FC<AppDrawerLogoProps> = ({
  size = 'sm',
  className = '',
  animated = true,
}) => {
  // Dimension and padding scales
  const sizeClasses = {
    xs: 'w-6 h-6 rounded-lg p-1',
    sm: 'w-7 h-7 rounded-lg p-1.5',
    md: 'w-9 h-9 rounded-xl p-1.5',
    lg: 'w-12 h-12 rounded-2xl p-2.5',
    xl: 'w-14 h-14 rounded-2xl p-3',
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 shadow-sm shadow-indigo-500/30 text-white ${sizeClasses[size]} ${className} ${
        animated ? 'group-hover:scale-105 group-hover:shadow-md group-hover:shadow-indigo-500/50 transition-all duration-300' : ''
      }`}
    >
      {/* Smartphone-style 2x2 App Drawer Grid */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Top-Left Tile: Core CRM / Talent (Indigo accent) */}
        <rect
          x="2.5"
          y="2.5"
          width="8"
          height="8"
          rx="2.5"
          fill="white"
          fillOpacity="0.95"
        />
        <circle cx="6.5" cy="6.5" r="1.5" fill="#4F46E5" />

        {/* Top-Right Tile: Delivery Kanban (Cyan / Teal accent) */}
        <rect
          x="13.5"
          y="2.5"
          width="8"
          height="8"
          rx="2.5"
          fill="white"
          fillOpacity="0.85"
        />
        <circle cx="17.5" cy="6.5" r="1.5" fill="#06B6D4" />

        {/* Bottom-Left Tile: Cashflow & Ledger (Amber / Gold accent) */}
        <rect
          x="2.5"
          y="13.5"
          width="8"
          height="8"
          rx="2.5"
          fill="white"
          fillOpacity="0.85"
        />
        <circle cx="6.5" cy="17.5" r="1.5" fill="#F59E0B" />

        {/* Bottom-Right Tile: Productivity & Custom Apps (Pink / Sparkle accent) */}
        <rect
          x="13.5"
          y="13.5"
          width="8"
          height="8"
          rx="2.5"
          fill="white"
          fillOpacity="0.95"
        />
        <path
          d="M17.5 15.5V19.5M15.5 17.5H19.5"
          stroke="#EC4899"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Tiny live pulsing notification pip on top right */}
      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-400 border border-white dark:border-slate-800 animate-pulse shadow-xs" />
    </div>
  )
}

export default AppDrawerLogo
