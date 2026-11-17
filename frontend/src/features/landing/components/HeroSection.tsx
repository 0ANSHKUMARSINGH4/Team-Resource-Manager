import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Play,
  Star,
  Activity,
  DollarSign
} from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/20 via-violet-500/20 to-pink-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 shadow-sm text-xs font-bold text-gray-800 dark:text-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 hover:border-primary/50 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-primary dark:text-indigo-400 font-extrabold uppercase tracking-wide">
            Enterprise 2.0
          </span>
          <span className="text-gray-300 dark:text-slate-600">|</span>
          <span className="flex items-center gap-1 text-gray-600 dark:text-slate-300">
            Next-Gen Team CRM & Resource Orchestrator
            <Sparkles size={14} className="text-amber-500 ml-1 inline" />
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 dark:text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
          The Intelligent CRM for{' '}
          <span className="bg-gradient-to-r from-primary via-indigo-600 to-violet-500 bg-clip-text text-transparent">
            High-Velocity
          </span>{' '}
          Resource Teams.
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Stop wrestling with clunky legacy CRMs, fragmented spreadsheets, and guesswork capacity planning.
          TRM unites <strong className="text-gray-900 dark:text-white font-bold">360° Employee Intelligence</strong>,{' '}
          <strong className="text-gray-900 dark:text-white font-bold">Live Kanban Delivery</strong>, and{' '}
          <strong className="text-gray-900 dark:text-white font-bold">Financial Analytics</strong> into one blisteringly fast platform.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
          >
            <span>Start Free Trial</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 text-gray-900 dark:text-white font-bold text-base border border-gray-200 dark:border-slate-700 shadow-sm transition-all"
          >
            <Play size={16} className="text-primary fill-primary" />
            <span>Explore Live Demo</span>
          </Link>
        </div>

        {/* Social Proof Metric Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-800 dark:text-slate-200 font-bold">4.9/5 Rating</span>
            <span>(2,400+ reviews)</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Spring Security 6 & JWT Protected</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span>100% Production Ready</span>
          </div>
        </div>

        {/* Interactive 3D / Glassmorphism Dashboard Preview */}
        <div className="mt-14 relative mx-auto max-w-6xl">
          <div className="relative rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-white/90 via-white/50 to-white/20 dark:from-slate-800/90 dark:via-slate-800/50 dark:to-slate-800/20 border border-gray-200/80 dark:border-slate-700/80 shadow-2xl backdrop-blur-xl">
            {/* Top Mock Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-slate-700/60 px-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs font-bold text-gray-400 dark:text-slate-500 font-mono">
                  https://team-resource-manager.vercel.app/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Backend Live: Render Cloud
              </div>
            </div>

            {/* Dashboard Mock Body */}
            <div className="bg-slate-50 dark:bg-slate-900/90 rounded-xl p-4 sm:p-6 text-left border border-gray-100 dark:border-slate-800">
              {/* Stat Chips Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                    <span>Total Employees</span>
                    <Users size={16} className="text-primary" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">10 Active</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    ↑ 100% Verified in DB
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                    <span>Active Projects</span>
                    <Briefcase size={16} className="text-indigo-500" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">3 Sprints</div>
                  <div className="text-[11px] text-primary font-bold mt-1">
                    Kanban In Progress
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                    <span>Annual Budget</span>
                    <DollarSign size={16} className="text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">$128,000</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    +8.4% Net Margin
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                    <span>Team Discipline</span>
                    <Activity size={16} className="text-violet-500" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">91.6 Avg</div>
                  <div className="text-[11px] text-indigo-500 font-bold mt-1">
                    High Performance
                  </div>
                </div>
              </div>

              {/* Lower Section: Projects Preview & Active Team */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Live Delivery Pipelines (Kanban)
                    </h4>
                    <span className="text-xs text-primary font-bold cursor-pointer hover:underline">
                      View Board →
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        <span className="text-xs font-bold text-gray-800 dark:text-slate-100">
                          CRM Modernization & Architecture
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        IN PROGRESS
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-bold text-gray-800 dark:text-slate-100">
                          Cloud Migration Phase 2 (RDS PostgreSQL)
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        DONE
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="text-xs font-bold text-gray-800 dark:text-slate-100">
                          Mobile App Redesign
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        TODO
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Talent Allocation
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-slate-300">Engineering</span>
                        <span className="font-extrabold text-primary">5 members (50%)</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full w-1/2" />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-gray-600 dark:text-slate-300">Design & Product</span>
                        <span className="font-extrabold text-emerald-500">2 members (20%)</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full w-1/5" />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-gray-600 dark:text-slate-300">Marketing & Sales</span>
                        <span className="font-extrabold text-violet-500">2 members (20%)</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-violet-500 h-full rounded-full w-1/5" />
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="mt-4 block text-center py-2 text-xs font-bold text-white bg-primary hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Open Live Console →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
