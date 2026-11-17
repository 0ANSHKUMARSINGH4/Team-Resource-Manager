import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

export const PricingSection: React.FC = () => {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for small startups and teams getting started with resource management.',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 15 team members',
        'Interactive Kanban delivery boards',
        'Basic financial analytics',
        'Community support',
        'Export to CSV',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Growth & Pro',
      description: 'The complete engine for scaling organizations needing full visibility.',
      price: annual ? '$24' : '$29',
      period: '/ user / month',
      features: [
        'Unlimited team members',
        'Full 360° employee performance metrics',
        'Real-time cashflow & financial ledgers',
        'Visual sprint & milestone calendar',
        'Role-based permissions (RBAC)',
        'Priority email & Slack support',
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Dedicated infrastructure, custom integrations, and SLA guarantees.',
      price: 'Custom',
      period: 'tailored to your scale',
      features: [
        'Everything in Growth & Pro',
        'Dedicated PostgreSQL database',
        'Custom SSO / SAML integration',
        'SOC2 audit compliance logs',
        '99.99% guaranteed SLA',
        'Dedicated customer success architect',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-50/70 dark:bg-slate-950/70 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400 mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Predictable Plans for Every Stage
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            No hidden seat fees, no surprise consultant add-ons. Cancel anytime.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-bold ${!annual ? 'text-gray-950 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 flex items-center bg-gray-200 dark:bg-slate-700 rounded-full p-1 transition-colors"
            >
              <div
                className={`bg-primary w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  annual ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-bold ${annual ? 'text-gray-950 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
                Annual
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                p.popular
                  ? 'bg-white dark:bg-slate-800 border-2 border-primary shadow-2xl relative scale-105 z-10 hover:border-violet-500'
                  : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:border-primary/50'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-violet-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-black text-gray-950 dark:text-white">{p.name}</h3>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400 min-h-[32px]">
                  {p.description}
                </p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-gray-950 dark:text-white">
                    {p.price}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 ml-1.5">
                    {p.period}
                  </span>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-slate-800 text-xs">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-gray-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/login"
                className={`mt-8 w-full py-3.5 rounded-xl font-extrabold text-sm text-center transition-all flex items-center justify-center gap-2 ${
                  p.popular
                    ? 'bg-primary hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white'
                }`}
              >
                <span>{p.cta}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
