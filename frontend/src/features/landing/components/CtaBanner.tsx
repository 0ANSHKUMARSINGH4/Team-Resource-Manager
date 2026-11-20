import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-indigo-600 to-violet-700 p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Ambient circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-extrabold text-xs uppercase tracking-wider mb-6 border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              <span>Get Started in Under 2 Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Upgrade Your Team Resource Management?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-indigo-100 font-normal">
              Join forward-thinking engineering and product teams eliminating guesswork and delivering with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-black text-base shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-100 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-300" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-300" />
                Seeded demo database included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-300" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
