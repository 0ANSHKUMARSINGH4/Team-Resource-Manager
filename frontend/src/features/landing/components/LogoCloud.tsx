import React from 'react'

export const LogoCloud: React.FC = () => {
  const logos = [
    { name: 'Acme Systems', symbol: '▲ ACME' },
    { name: 'LinearTech', symbol: '◈ LINEAR' },
    { name: 'CloudScale', symbol: '☁ CLOUDSCALE' },
    { name: 'NextGen AI', symbol: '❖ NEXTGEN' },
    { name: 'DataPulse', symbol: '● DATAPULSE' },
    { name: 'Vercel Partner', symbol: '▲ VERCEL' },
  ]

  return (
    <section className="py-12 border-y border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-8">
          Trusted by operations and engineering teams at modern enterprises
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center opacity-70 dark:opacity-60 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center font-black tracking-wider text-sm sm:text-base text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-default"
            >
              {logo.symbol}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
