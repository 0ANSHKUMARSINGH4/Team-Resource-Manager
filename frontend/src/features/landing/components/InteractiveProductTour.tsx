import React, { useState } from 'react'
import {
  Users,
  Briefcase,
  Wallet,
  Command,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface TourTab {
  id: string
  name: string
  subtitle: string
  icon: React.ReactNode
  tagline: string
  bulletPoints: string[]
  stats: { label: string; value: string; delta: string }[]
}

export const InteractiveProductTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('talent')

  const tabs: TourTab[] = [
    {
      id: 'talent',
      name: 'Talent 360 Hub',
      subtitle: 'Employee & Resource Intelligence',
      icon: <Users size={18} />,
      tagline: 'Complete Visibility Over Team Capacity & Performance',
      bulletPoints: [
        'Instant search by name, role, department, and employment type',
        'Performance discipline index (0–100%) tracking consistency over quarters',
        'Work mode tracking (Remote, Hybrid, On-site) for distributed teams',
        'Departmental headcount distribution & capacity allocation',
      ],
      stats: [
        { label: 'Active Talent', value: '142 Members', delta: '+12% this quarter' },
        { label: 'Avg Discipline', value: '94.8%', delta: '+3.2 pts' },
        { label: 'Capacity Utilization', value: '88%', delta: 'Optimal zone' },
      ],
    },
    {
      id: 'kanban',
      name: 'Agile Delivery',
      subtitle: 'Interactive Kanban & Sprints',
      icon: <Briefcase size={18} />,
      tagline: 'Move from Backlog to Shipped with Zero Friction',
      bulletPoints: [
        'Drag-and-drop workflow across Todo, In Progress, Review, and Done',
        'Visual priority indicators (Urgent, High, Medium, Low) and deadline badges',
        'Direct employee allocation with avatar badges and workload caps',
        'Milestone link to sprint deliverables and client commitments',
      ],
      stats: [
        { label: 'Sprint Velocity', value: '48 Pts/wk', delta: '+18% vs last sprint' },
        { label: 'On-Time Delivery', value: '96.4%', delta: 'Top 5% quartile' },
        { label: 'Blockers Resolved', value: '< 2.4 hrs', delta: '-40% wait time' },
      ],
    },
    {
      id: 'finance',
      name: 'Financial Ledger',
      subtitle: 'Real-time Cashflow & Margins',
      icon: <Wallet size={18} />,
      tagline: 'Connect Project Progress Directly to the Balance Sheet',
      bulletPoints: [
        'Double-entry transaction logging for revenue and operational burn',
        'Live gross margin and net runway calculations updated per entry',
        'Expense categorization (Payroll, Infrastructure, Software, Client Travel)',
        'Visual cashflow trend line predicting month-end runway',
      ],
      stats: [
        { label: 'Monthly Revenue', value: '$84,200', delta: '+22.4% MoM' },
        { label: 'Gross Margin', value: '73.5%', delta: '+4.1% efficiency' },
        { label: 'Current Runway', value: '18.4 Mos', delta: 'Healthy balance' },
      ],
    },
    {
      id: 'command',
      name: 'Command Menu (⌘K)',
      subtitle: 'Zero-Latency Keyboard UX',
      icon: <Command size={18} />,
      tagline: 'Navigate Everything at the Speed of Thought',
      bulletPoints: [
        'Global shortcut Cmd/Ctrl + K accessible anywhere in the app',
        'Fuzzy search across employees, sprint items, client projects, and invoices',
        'Quick actions: Add Employee, Create Project Card, Log Expense in 2 keystrokes',
        'Recent items history and smart recommendations based on role',
      ],
      stats: [
        { label: 'Nav Speed', value: '< 8ms', delta: 'Instant client cache' },
        { label: 'Clicks Saved', value: '72%', delta: 'Keyboard-first workflow' },
        { label: 'Adoption Rate', value: '89%', delta: 'Team-wide preference' },
      ],
    },
  ]

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <section id="tour" className="py-24 bg-gradient-to-b from-white via-indigo-50/20 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-primary dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-4 border border-indigo-100 dark:border-slate-700">
            <Sparkles size={14} className="text-amber-500" />
            <span>Interactive Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Explore the Core Engines of TRM
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            Click through our unified modules inspired by the world&apos;s best enterprise tools — streamlined for clarity, velocity, and zero clutter.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-2xl mx-auto bg-gray-100/80 dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 mb-12 shadow-inner">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-primary dark:text-indigo-400 shadow-md border border-gray-200/50 dark:border-slate-700 scale-100'
                    : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-primary dark:text-indigo-400' : 'text-gray-400'}>
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Tour Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl">
          {/* Left Feature Walkthrough (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 text-xs font-bold border border-indigo-100 dark:border-indigo-800">
              {currentTab.icon}
              <span>{currentTab.subtitle}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-snug">
              {currentTab.tagline}
            </h3>

            {/* Bullet Points */}
            <ul className="space-y-3.5 pt-2">
              {currentTab.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-300">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              {currentTab.stats.map((s, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                  <div className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 truncate">
                    {s.label}
                  </div>
                  <div className="text-sm font-black text-gray-900 dark:text-white mt-0.5">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {s.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-primary dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 group"
              >
                <span>Try this workflow live</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Live Interactive Mock (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-gray-200 dark:border-slate-800 shadow-inner overflow-hidden">
            {/* Mock Top Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-gray-400 dark:text-slate-500 text-[11px] ml-2">
                  app.trm.io/{activeTab}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud Sync
              </div>
            </div>

            {/* Render Contextual Mock Based on Selected Tab */}
            {activeTab === 'talent' && (
              <div className="space-y-3">
                {/* Search & Filter Mock Bar */}
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-gray-200 dark:border-slate-800">
                  <Search size={14} className="text-gray-400" />
                  <input
                    type="text"
                    readOnly
                    value="Filter by: Engineering, Hybrid..."
                    className="w-full bg-transparent text-xs text-gray-600 dark:text-slate-300 outline-none"
                  />
                  <div className="flex items-center gap-1 text-[11px] font-bold text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                    <Filter size={12} />
                    <span>3 active</span>
                  </div>
                </div>

                {/* Talent Rows */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 divide-y divide-gray-100 dark:divide-slate-800 text-xs">
                  {[
                    { name: 'Sarah Connor', dept: 'Engineering', role: 'Staff Backend Architect', mode: 'Remote', score: '98%', status: 'Permanent' },
                    { name: 'Marcus Vance', dept: 'Product Design', role: 'Lead UI/UX Designer', mode: 'Hybrid', score: '95%', status: 'Permanent' },
                    { name: 'Elena Rostova', dept: 'DevOps & Cloud', role: 'Site Reliability Engineer', mode: 'Remote', score: '92%', status: 'Contract' },
                    { name: 'David Kalu', dept: 'Finance & RevOps', role: 'Financial Controller', mode: 'On-site', score: '99%', status: 'Permanent' },
                  ].map((emp, i) => (
                    <div key={i} className="p-3 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                          {emp.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{emp.name}</div>
                          <div className="text-[11px] text-gray-500 dark:text-slate-400">{emp.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300">
                          {emp.mode}
                        </span>
                        <div className="text-right">
                          <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{emp.score}</div>
                          <div className="text-[10px] text-gray-400">{emp.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'kanban' && (
              <div className="grid grid-cols-3 gap-3 text-xs">
                {/* Column 1: Todo */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-between font-bold text-gray-600 dark:text-slate-400 mb-2.5 pb-1 border-b border-gray-100 dark:border-slate-800">
                    <span>To Do</span>
                    <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-slate-800 text-center text-[10px]">2</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-2.5 rounded-lg border border-gray-200/60 dark:border-slate-700/60 shadow-xs mb-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                      High Priority
                    </span>
                    <p className="font-bold text-gray-800 dark:text-slate-200 mt-1">Multi-tenant RBAC spec</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/50 dark:border-slate-700 text-[10px] text-gray-400">
                      <span>Due Nov 22</span>
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-primary font-bold flex items-center justify-center text-[9px]">SC</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-200/70 dark:border-indigo-900/50 bg-indigo-50/10">
                  <div className="flex items-center justify-between font-bold text-primary dark:text-indigo-400 mb-2.5 pb-1 border-b border-indigo-100 dark:border-indigo-950">
                    <span>In Progress</span>
                    <span className="w-4 h-4 rounded-full bg-primary text-white text-center text-[10px]">3</span>
                  </div>
                  <div className="bg-indigo-50/40 dark:bg-slate-800 p-2.5 rounded-lg border border-indigo-100 dark:border-slate-700 shadow-xs mb-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-white">
                      Active Sprint
                    </span>
                    <p className="font-bold text-gray-800 dark:text-slate-200 mt-1">Kanban DnD Drag Engine</p>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-primary h-full w-3/4 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Column 3: Done */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 mb-2.5 pb-1 border-b border-gray-100 dark:border-slate-800">
                    <span>Done</span>
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-center text-[10px]">8</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-2.5 rounded-lg border border-gray-200/60 dark:border-slate-700/60 shadow-xs mb-2 opacity-85">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      Shipped
                    </span>
                    <p className="font-bold text-gray-800 dark:text-slate-200 mt-1 line-through">Spring Boot 4 JWT Layer</p>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Production Render Live</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-slate-800">
                    <div className="text-[11px] font-medium text-gray-400">Monthly Inflow (ARR Run)</div>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">$84,200.00</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">8 invoices paid on schedule</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-red-100 dark:border-slate-800">
                    <div className="text-[11px] font-medium text-gray-400">Monthly Burn (Payroll & Cloud)</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white mt-1">$22,410.00</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">73.4% Gross Margin</div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-3">
                  <div className="font-bold text-gray-800 dark:text-slate-200 mb-2 flex items-center justify-between">
                    <span>Recent Double-Entry Ledger</span>
                    <span className="text-[10px] font-mono text-gray-400">Auto-reconciled</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                      <div>
                        <span className="font-bold text-gray-800 dark:text-slate-200">Enterprise Cloud License — Apex Corp</span>
                        <div className="text-[10px] text-gray-400">Client Retainer | Ref #TX-8910</div>
                      </div>
                      <span className="font-bold text-emerald-600">+$24,500.00</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <span className="font-bold text-gray-800 dark:text-slate-200">AWS & Render Cloud Cluster</span>
                        <div className="text-[10px] text-gray-400">Infrastructure | Ref #TX-8911</div>
                      </div>
                      <span className="font-bold text-gray-700 dark:text-slate-300">-$1,480.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'command' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/30 shadow-2xl p-4 text-xs">
                {/* Search Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-800">
                  <Search size={16} className="text-primary" />
                  <span className="font-mono font-bold text-gray-900 dark:text-white">jump to employee or sprint...</span>
                  <span className="ml-auto px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-[10px] font-mono text-gray-400">
                    ESC
                  </span>
                </div>

                {/* Suggestions List */}
                <div className="pt-3 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 mb-1">
                    Quick Commands
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-indigo-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Create New Employee Record</span>
                    </div>
                    <span className="text-[10px] font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-slate-700">
                      N then E
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} />
                      <span>Switch to Kanban Delivery Board</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">G then K</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Wallet size={14} />
                      <span>Log Transaction / Expense</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">N then T</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
