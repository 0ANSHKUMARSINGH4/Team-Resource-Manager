import React, { useState } from 'react'
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
  DollarSign,
  Copy,
  Check,
  Command,
  Search,
  ArrowUpRight,
} from 'lucide-react'

type HeroTab = 'kpi' | 'kanban' | 'talent' | 'command'

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HeroTab>('kpi')
  const [copied, setCopied] = useState(false)
  const [talentSearch, setTalentSearch] = useState('')
  const [commandQuery, setCommandQuery] = useState('')
  const [kanbanStage, setKanbanStage] = useState<'todo' | 'in_progress' | 'done'>('in_progress')

  const handleCopyCredentials = () => {
    navigator.clipboard.writeText('admin@trm.com / admin123')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const advanceKanban = () => {
    if (kanbanStage === 'todo') setKanbanStage('in_progress')
    else if (kanbanStage === 'in_progress') setKanbanStage('done')
    else setKanbanStage('todo')
  }

  const sampleTalent = [
    { name: 'Sarah Connor', dept: 'Engineering', role: 'Staff Backend Architect', mode: 'Remote', score: 98, status: 'PERMANENT' },
    { name: 'Marcus Vance', dept: 'Design & UX', role: 'Principal Designer', mode: 'Hybrid', score: 95, status: 'PERMANENT' },
    { name: 'Elena Rostova', dept: 'Infrastructure', role: 'Senior SRE Lead', mode: 'Remote', score: 91, status: 'CONTRACT' },
    { name: 'David Chen', dept: 'Revenue Ops', role: 'Financial Controller', mode: 'On-Site', score: 96, status: 'PERMANENT' },
  ]

  const filteredTalent = sampleTalent.filter(
    (t) =>
      t.name.toLowerCase().includes(talentSearch.toLowerCase()) ||
      t.dept.toLowerCase().includes(talentSearch.toLowerCase()) ||
      t.role.toLowerCase().includes(talentSearch.toLowerCase())
  )

  const commandResults = [
    { title: 'Talent Directory', category: 'Navigation', shortcut: 'G T' },
    { title: 'Kanban Delivery Board', category: 'Navigation', shortcut: 'G K' },
    { title: 'Add New Employee Record', category: 'Quick Action', shortcut: 'N E' },
    { title: 'Export Talent to CSV', category: 'Data Action', shortcut: 'E C' },
    { title: 'Toggle Dark / Light Theme', category: 'Preferences', shortcut: 'T M' },
  ].filter((c) => c.title.toLowerCase().includes(commandQuery.toLowerCase()))

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/20 via-violet-500/20 to-pink-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 shadow-sm text-xs font-bold text-gray-800 dark:text-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 hover:border-primary/50 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-primary dark:text-indigo-400 font-extrabold uppercase tracking-wide">
            Enterprise CRM 2.3
          </span>
          <span className="text-gray-300 dark:text-slate-600">|</span>
          <span className="flex items-center gap-1 text-gray-600 dark:text-slate-300">
            Next-Gen Resource Intelligence & Delivery
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
          Stop wrestling with disconnected spreadsheets, clunky legacy CRMs, and guesswork capacity planning.
          TRM unites <strong className="text-gray-900 dark:text-white font-bold">360° Employee Intelligence</strong>,{' '}
          <strong className="text-gray-900 dark:text-white font-bold">Live Kanban Delivery</strong>, and{' '}
          <strong className="text-gray-900 dark:text-white font-bold">Financial Runways</strong> into one blisteringly fast platform.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Launch Live Console</span>
            <ArrowRight size={18} />
          </Link>

          <a
            href="#tour"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 text-gray-900 dark:text-white font-bold text-base border border-gray-200 dark:border-slate-700 shadow-sm transition-all"
          >
            <Play size={16} className="text-primary fill-primary" />
            <span>Interactive Product Tour</span>
          </a>
        </div>

        {/* One-Click Demo Credentials Pill */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 shadow-sm text-xs backdrop-blur-sm">
            <span className="font-semibold text-gray-500 dark:text-slate-400">Demo Access:</span>
            <code className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-slate-700 text-primary dark:text-indigo-400 font-bold">
              admin@trm.com
            </code>
            <code className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-mono">
              admin123
            </code>
            <button
              onClick={handleCopyCredentials}
              className="inline-flex items-center gap-1 ml-1 text-primary dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              title="Copy credentials"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Proof Metric Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-gray-500 dark:text-slate-400">
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
            <span>Spring Security 6 & JWT</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span>Live on Render Cloud + Vercel</span>
          </div>
        </div>

        {/* 🌟 Interactive Sandbox Console (4 Live Modes) */}
        <div className="mt-12 relative mx-auto max-w-6xl">
          <div className="relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-white/95 via-white/70 to-white/30 dark:from-slate-800/95 dark:via-slate-800/70 dark:to-slate-800/30 border border-gray-200/90 dark:border-slate-700 shadow-2xl backdrop-blur-xl">
            {/* Top Mock Window Header with View Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-100 dark:border-slate-700/60 px-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-bold text-gray-400 dark:text-slate-500 hidden sm:inline">
                  trm.app/console/{activeTab}
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-slate-700/70 rounded-xl">
                <button
                  onClick={() => setActiveTab('kpi')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'kpi'
                      ? 'bg-white dark:bg-slate-800 text-primary dark:text-indigo-400 shadow-xs'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
                  }`}
                >
                  📊 Executive KPI
                </button>
                <button
                  onClick={() => setActiveTab('kanban')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'kanban'
                      ? 'bg-white dark:bg-slate-800 text-primary dark:text-indigo-400 shadow-xs'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
                  }`}
                >
                  🗂️ Agile Kanban
                </button>
                <button
                  onClick={() => setActiveTab('talent')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'talent'
                      ? 'bg-white dark:bg-slate-800 text-primary dark:text-indigo-400 shadow-xs'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
                  }`}
                >
                  👥 Talent Directory
                </button>
                <button
                  onClick={() => setActiveTab('command')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'command'
                      ? 'bg-white dark:bg-slate-800 text-primary dark:text-indigo-400 shadow-xs'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
                  }`}
                >
                  ⚡ Command ⌘K
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud Sync
              </div>
            </div>

            {/* Console Body Depending on Active Tab */}
            <div className="bg-slate-50/70 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-6 text-left border border-gray-100 dark:border-slate-800 transition-all min-h-[380px]">
              {/* TAB 1: EXECUTIVE KPI */}
              {activeTab === 'kpi' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                        <span>Total Headcount</span>
                        <Users size={16} className="text-primary" />
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">10 Active</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        ↑ 100% Verified in DB
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                        <span>Active Sprints</span>
                        <Briefcase size={16} className="text-indigo-500" />
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">3 Projects</div>
                      <div className="text-[11px] text-primary font-bold mt-1">
                        Kanban Delivery Live
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                        <span>Annual Budget</span>
                        <DollarSign size={16} className="text-emerald-500" />
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">$128,000</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        +8.4% Net Margin Safe
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                        <span>Avg Discipline</span>
                        <Activity size={16} className="text-violet-500" />
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">91.6%</div>
                      <div className="text-[11px] text-indigo-500 font-bold mt-1">
                        High Performance Score
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                          Delivery Sprints Adherence
                        </h4>
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          Live Metrics <ArrowUpRight size={13} />
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-gray-700 dark:text-slate-300">Phase 1 CRM Core Architecture</span>
                            <span className="text-emerald-600 font-bold">100% Shipped</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-gray-700 dark:text-slate-300">Command ⌘K Palette & 360° Drawer</span>
                            <span className="text-primary font-bold">100% Active</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-gray-700 dark:text-slate-300">PostgreSQL Live Cloud Sync (Render)</span>
                            <span className="text-indigo-500 font-bold">Operational</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full w-5/6" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                          Talent Distribution
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-slate-400">On-Site Staff</span>
                            <span className="font-bold text-emerald-500">5 members</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-slate-400">Remote Workforce</span>
                            <span className="font-bold text-primary">3 members</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-slate-400">Hybrid Specialist</span>
                            <span className="font-bold text-amber-500">2 members</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/login"
                        className="w-full mt-4 py-2.5 rounded-xl bg-primary hover:bg-indigo-700 text-white font-bold text-xs text-center transition-colors shadow-xs"
                      >
                        Enter Real Dashboard →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE KANBAN */}
              {activeTab === 'kanban' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        Interactive Sprint Workflow
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Click &quot;Advance Task&quot; below to transition the card across stages!
                      </p>
                    </div>
                    <button
                      onClick={advanceKanban}
                      className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Advance Task →</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column 1: To Do */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-3 text-xs font-bold text-gray-600 dark:text-slate-400 pb-2 border-b border-gray-100 dark:border-slate-700">
                        <span>TO DO</span>
                        <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-[10px]">
                          {kanbanStage === 'todo' ? 2 : 1}
                        </span>
                      </div>
                      {kanbanStage === 'todo' && (
                        <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-700/80 border border-indigo-200 dark:border-slate-600 mb-2 shadow-xs">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary text-white">
                            Current Focus
                          </span>
                          <h5 className="font-bold text-xs text-gray-900 dark:text-white mt-1.5">
                            CRM Modernization Architecture
                          </h5>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1">
                            Lead: Sarah Connor • 5 pts
                          </p>
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 text-xs">
                        <span className="text-[10px] font-bold text-gray-500">Backlog</span>
                        <h5 className="font-bold text-gray-800 dark:text-slate-200 mt-1">
                          Role-Based Permission Matrix
                        </h5>
                      </div>
                    </div>

                    {/* Column 2: In Progress */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/20">
                      <div className="flex justify-between items-center mb-3 text-xs font-bold text-primary dark:text-indigo-400 pb-2 border-b border-indigo-100 dark:border-indigo-950">
                        <span>IN PROGRESS</span>
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                          {kanbanStage === 'in_progress' ? 2 : 1}
                        </span>
                      </div>
                      {kanbanStage === 'in_progress' && (
                        <div className="p-3 rounded-xl bg-indigo-100/70 dark:bg-slate-700 border border-primary/40 dark:border-indigo-500 mb-2 shadow-xs animate-in zoom-in-95 duration-200">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary text-white">
                            Active Stage
                          </span>
                          <h5 className="font-bold text-xs text-gray-900 dark:text-white mt-1.5">
                            CRM Modernization Architecture
                          </h5>
                          <p className="text-[11px] text-gray-600 dark:text-slate-300 mt-1">
                            Lead: Sarah Connor • 5 pts
                          </p>
                          <div className="w-full bg-indigo-200 dark:bg-slate-600 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-primary h-full w-2/3 rounded-full" />
                          </div>
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 text-xs">
                        <span className="text-[10px] font-bold text-amber-500">In Review</span>
                        <h5 className="font-bold text-gray-800 dark:text-slate-200 mt-1">
                          Flyway V4 Schema Migrations
                        </h5>
                      </div>
                    </div>

                    {/* Column 3: Done */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 pb-2 border-b border-gray-100 dark:border-slate-700">
                        <span>DONE</span>
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 flex items-center justify-center text-[10px]">
                          {kanbanStage === 'done' ? 3 : 2}
                        </span>
                      </div>
                      {kanbanStage === 'done' && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 mb-2 shadow-xs animate-in zoom-in-95 duration-200">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                            ✓ Shipped
                          </span>
                          <h5 className="font-bold text-xs text-gray-900 dark:text-white mt-1.5 line-through">
                            CRM Modernization Architecture
                          </h5>
                          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                            Completed on schedule
                          </p>
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 text-xs">
                        <span className="text-[10px] font-bold text-emerald-600">✓ Production</span>
                        <h5 className="font-bold text-gray-800 dark:text-slate-200 mt-1 line-through">
                          Spring Boot 4 JWT Backend
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TALENT DIRECTORY SEARCH */}
              {activeTab === 'talent' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xs">
                    <Search size={16} className="text-gray-400 ml-1" />
                    <input
                      type="text"
                      value={talentSearch}
                      onChange={(e) => setTalentSearch(e.target.value)}
                      placeholder="Try typing: 'Sarah', 'Engineering', 'Remote', or 'Lead'..."
                      className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                    />
                    {talentSearch && (
                      <button
                        onClick={() => setTalentSearch('')}
                        className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                    <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 whitespace-nowrap hidden sm:inline">
                      {filteredTalent.length} matches
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700/60 text-xs overflow-hidden shadow-xs">
                    {filteredTalent.length === 0 ? (
                      <div className="py-8 text-center text-gray-400 text-xs">
                        No team member matches &quot;{talentSearch}&quot;. Try typing &quot;Sarah&quot; or &quot;Remote&quot;.
                      </div>
                    ) : (
                      filteredTalent.map((member, i) => (
                        <div
                          key={i}
                          className="p-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white">{member.name}</div>
                              <div className="text-[11px] text-gray-500 dark:text-slate-400">
                                {member.role} • {member.dept}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                              {member.mode}
                            </span>
                            <div className="text-right">
                              <span className="font-black text-emerald-600 dark:text-emerald-400">
                                {member.score}%
                              </span>
                              <div className="text-[10px] text-gray-400">{member.status}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: INTERACTIVE COMMAND PALETTE (⌘K) */}
              {activeTab === 'command' && (
                <div className="space-y-4 animate-in fade-in duration-300 max-w-xl mx-auto">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-primary/30 shadow-xl space-y-3">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-slate-700">
                      <Command size={18} className="text-primary" />
                      <input
                        type="text"
                        value={commandQuery}
                        onChange={(e) => setCommandQuery(e.target.value)}
                        placeholder="Type a command: 'talent', 'dark', 'add'..."
                        className="w-full bg-transparent text-sm font-semibold text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                      />
                      <kbd className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-[10px] font-mono text-gray-500">
                        ESC
                      </kbd>
                    </div>

                    <div className="space-y-1 max-h-56 overflow-y-auto">
                      {commandResults.length === 0 ? (
                        <div className="py-6 text-center text-xs text-gray-400">
                          No matching commands found.
                        </div>
                      ) : (
                        commandResults.map((cmd, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 dark:hover:bg-slate-700/60 transition-colors text-xs font-semibold cursor-pointer group"
                          >
                            <div className="flex items-center gap-2 text-gray-800 dark:text-slate-200 group-hover:text-primary">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{cmd.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-400 uppercase">{cmd.category}</span>
                              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-[10px] font-mono text-gray-500">
                                {cmd.shortcut}
                              </kbd>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
