import React from 'react'
import { Star, Quote } from 'lucide-react'

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'TRM replaced our messy mix of Jira, Excel, and BambooHR. We can now see employee availability, sprint delivery, and budget burn in one tab.',
      author: 'Alex Rivera',
      role: 'VP of Engineering',
      company: 'DataPulse Cloud',
      rating: 5,
      metric: 'Saved 14 hrs/week on staffing',
    },
    {
      quote:
        'The speed and responsiveness of TRM is unbelievable compared to Salesforce. Clean, high-contrast dark mode and instant search make daily planning effortless.',
      author: 'Maya Lin',
      role: 'Head of Operations',
      company: 'ScaleVelocity',
      rating: 5,
      metric: '3.4x faster delivery planning',
    },
    {
      quote:
        'Having financial analytics directly tied to employee projects gives our executive team clear revenue visibility without waiting for monthly accountant reports.',
      author: 'David Chen',
      role: 'Chief Technology Officer',
      company: 'Nexus Mobility',
      rating: 5,
      metric: '100% budget forecast accuracy',
    },
  ]

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400 mb-3">
            Real Customer Results
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Loved by Engineering & Resource Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 bg-gray-50/80 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <Quote size={28} className="text-primary/30 mb-3" />

                <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 dark:border-slate-700">
                <div className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-xs mb-3">
                  {t.metric}
                </div>
                <div className="font-bold text-gray-950 dark:text-white text-sm">{t.author}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">
                  {t.role} · <span className="font-semibold">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
