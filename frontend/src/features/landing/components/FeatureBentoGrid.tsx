import React from 'react'
import {
  Users,
  Briefcase,
  Wallet,
  Calendar,
  ShieldCheck,
  Layers
} from 'lucide-react'

export const FeatureBentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-primary dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-4 border border-indigo-100 dark:border-slate-700">
            <Layers size={14} />
            <span>Complete CRM Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Engineered to Replace 5 Disconnected Tools
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            Traditional CRMs only track contacts. Modern organizations need total resource visibility — from who builds the product to how budgets and deadlines are met.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 360 Talent Directory (2 cols) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/60 via-white to-white dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/30 p-8 border border-gray-200 dark:border-slate-700 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary text-white shadow-md shadow-indigo-500/30">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-indigo-400">
                Talent Intelligence
              </span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              360° Employee & Team Directory
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-300 max-w-xl mb-6">
              Track talent capacity, department assignments, performance discipline scoring, and employment status (Permanent, Contract, Intern) with instant search and pagination.
            </p>

            {/* Visual Talent Matrix Mock */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100 dark:border-slate-800 font-bold text-gray-400 dark:text-slate-500">
                <span>Employee</span>
                <span>Department</span>
                <span>Work Mode</span>
                <span>Performance</span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-primary dark:bg-indigo-950 font-bold flex items-center justify-center text-[11px]">
                    SC
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">Sarah Connor</span>
                </div>
                <span className="text-gray-500 dark:text-slate-400">Engineering</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Remote
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">98% (+100%)</span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 font-bold flex items-center justify-center text-[11px]">
                    JD
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">John Doe</span>
                </div>
                <span className="text-gray-500 dark:text-slate-400">Engineering</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  Hybrid
                </span>
                <span className="font-extrabold text-primary">92%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Kanban (1 col) */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50/60 via-white to-white dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/30 p-8 border border-gray-200 dark:border-slate-700 hover:border-violet-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/30">
                  <Briefcase size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Delivery Pipelines
                </span>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                Interactive Kanban Boards
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 mb-6">
                Deliver sprints with drag-and-drop workflows across To Do, In Progress, and Done. Allocate cross-functional team members with visual capacity markers.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="text-gray-800 dark:text-slate-200">CRM Modernization</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  Sprint 3
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Due: June 30</span>
                <span>Team: 5 engineers</span>
              </div>
            </div>
          </div>

          {/* Card 3: Real-Time Financial Ledger (1 col) */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-white dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/30 p-8 border border-gray-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30">
                  <Wallet size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Financial Analytics
                </span>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                Cashflow & Budget Engine
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 mb-6">
                Real-time income vs. expense transactions, burn rate analysis, and annual budget margin metrics powered by Recharts.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-500 dark:text-slate-400">Net Profit</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-base font-black">+$82.8k</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400">
                <span>Expenses YTD</span>
                <span>$45.2k</span>
              </div>
            </div>
          </div>

          {/* Card 4: Visual Milestone Calendar (2 cols) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/60 via-white to-white dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/30 p-8 border border-gray-200 dark:border-slate-700 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
                <Calendar size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Schedule & Capacity
              </span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              Dynamic Milestone & Deadline Calendar
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-300 max-w-xl mb-6">
              Visual deadline heatmaps, interactive month navigation, and sprint milestones ensure your team never drops a delivery commitment.
            </p>

            <div className="grid grid-cols-7 gap-2 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="font-extrabold text-gray-400 dark:text-slate-500 py-1">
                  {day}
                </div>
              ))}
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg font-bold border transition-colors ${
                    i === 4
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : i === 11
                      ? 'bg-indigo-50 text-primary border-indigo-200 dark:bg-slate-800 dark:border-slate-700'
                      : 'bg-gray-50/50 dark:bg-slate-800/40 text-gray-600 dark:text-slate-400 border-transparent'
                  }`}
                >
                  {i + 15}
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Enterprise Security & Stack (3 cols) */}
          <div className="md:col-span-3 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-8 md:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3 border border-indigo-500/30">
                  <ShieldCheck size={14} />
                  <span>Enterprise Ready</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                  Built on Enterprise Java 21, Spring Security 6 & React 19
                </h3>
                <p className="text-sm sm:text-base text-slate-300">
                  Stateless JWT authentication, automated Flyway schema migrations, PostgreSQL production persistence, and type-safe TypeScript interfaces. Zero vendor lock-in.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-indigo-300">
                  Spring Boot 4.0
                </span>
                <span className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-indigo-300">
                  PostgreSQL 16
                </span>
                <span className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-indigo-300">
                  React 19 + Vite
                </span>
                <span className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-indigo-300">
                  Tailwind CSS v3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
