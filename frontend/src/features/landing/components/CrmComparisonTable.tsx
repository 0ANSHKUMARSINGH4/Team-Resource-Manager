import React from 'react'
import { Check, Sparkles } from 'lucide-react'

export const CrmComparisonTable: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Full Employee & Talent Intelligence',
      trm: true,
      salesforce: 'Requires custom objects + plugins',
      hubspot: 'Not supported (Sales-only)',
    },
    {
      feature: 'Smartphone-Style App Drawer & Dock',
      trm: 'Native Drag & Drop',
      salesforce: 'Rigid tabs only',
      hubspot: 'Fixed nav bar only',
    },
    {
      feature: 'Global Command Palette (⌘K / Ctrl+K)',
      trm: 'Sub-8ms Fuzzy Engine',
      salesforce: 'No / Heavy global search',
      hubspot: 'Limited search shortcut',
    },
    {
      feature: '360° Slide-Over Record Drawer & Audit',
      trm: true,
      salesforce: 'Heavy page reload required',
      hubspot: 'Standard side panel only',
    },
    {
      feature: 'Built-in Kanban Delivery & Sprints',
      trm: true,
      salesforce: 'Expensive third-party app',
      hubspot: 'Deals pipeline only',
    },
    {
      feature: 'Real-time Cashflow & Financial Ledger',
      trm: true,
      salesforce: 'Add-on module ($$$)',
      hubspot: 'Basic quote sync only',
    },
    {
      feature: 'Zero-Bloat Setup Time',
      trm: 'Under 2 minutes',
      salesforce: '3–6 months consultant setup',
      hubspot: '2–4 weeks onboarding',
    },
    {
      feature: 'Modern React 19 + TypeScript UX',
      trm: true,
      salesforce: 'Legacy Aura/LWC interface',
      hubspot: 'Proprietary UI builder',
    },
    {
      feature: 'System-wide High-Contrast Dark Mode',
      trm: true,
      salesforce: 'Limited / Third-party',
      hubspot: 'Partial support',
    },
    {
      feature: 'Transparent Pricing & Open Architecture',
      trm: true,
      salesforce: 'Complex enterprise contracts',
      hubspot: 'Price jumps on contact growth',
    },
  ]

  return (
    <section id="comparison" className="py-24 bg-gray-50/70 dark:bg-slate-950/60 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-primary dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-4 border border-indigo-100 dark:border-slate-700">
            <Sparkles size={14} className="text-amber-500" />
            <span>Competitive Showdown</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            How TRM Compares to Legacy CRMs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            See why modern product, engineering, and resource leaders are choosing lightweight, unified velocity over bloated legacy platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/80">
                <th className="py-5 px-6 text-sm font-black text-gray-900 dark:text-white">
                  Capability
                </th>
                <th className="py-5 px-6 text-sm font-black text-primary dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 border-x border-indigo-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>TRM (Team Resource Manager)</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 dark:text-slate-400">
                  Salesforce
                </th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 dark:text-slate-400">
                  HubSpot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
              {comparisonItems.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-slate-200">
                    {item.feature}
                  </td>

                  {/* TRM Column */}
                  <td className="py-4 px-6 bg-indigo-50/30 dark:bg-indigo-950/20 border-x border-indigo-100 dark:border-slate-800 font-bold text-primary dark:text-indigo-400">
                    {item.trm === true ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check size={13} strokeWidth={3} />
                        </div>
                        <span className="text-xs uppercase font-extrabold">Included Native</span>
                      </div>
                    ) : (
                      <span>{item.trm}</span>
                    )}
                  </td>

                  {/* Salesforce */}
                  <td className="py-4 px-6 text-gray-600 dark:text-slate-400">
                    <span>{item.salesforce}</span>
                  </td>

                  {/* HubSpot */}
                  <td className="py-4 px-6 text-gray-600 dark:text-slate-400">
                    <span>{item.hubspot}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
