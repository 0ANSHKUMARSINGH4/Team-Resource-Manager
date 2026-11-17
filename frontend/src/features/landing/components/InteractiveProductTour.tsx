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
  Filter,
  Check,
  ChevronRight,
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

interface TourTalent {
  id: string
  name: string
  dept: string
  role: string
  mode: string
  score: string
  status: string
  email: string
}

interface TourTask {
  id: string
  title: string
  column: 'todo' | 'in_progress' | 'done'
  priority: string
  assignee: string
  due: string
}

export const InteractiveProductTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('talent')

  // Interactive state for Talent Tab
  const [talentQuery, setTalentQuery] = useState('')
  const [selectedTalent, setSelectedTalent] = useState<TourTalent | null>(null)

  // Interactive state for Kanban Tab
  const [tasks, setTasks] = useState<TourTask[]>([
    { id: '1', title: 'Multi-tenant RBAC spec', column: 'todo', priority: 'High Priority', assignee: 'SC', due: 'Nov 22' },
    { id: '2', title: 'Kanban DnD Drag Engine', column: 'in_progress', priority: 'Active Sprint', assignee: 'JD', due: 'Nov 20' },
    { id: '3', title: 'Spring Boot 4 JWT Layer', column: 'done', priority: 'Shipped', assignee: 'MV', due: 'Shipped' },
  ])

  // Interactive state for Finance Tab
  const [monthlyRevenue, setMonthlyRevenue] = useState(84200)
  const [monthlyBurn, setMonthlyBurn] = useState(22410)

  // Interactive state for Command Tab
  const [commandInput, setCommandInput] = useState('')

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
        '360° slide-over profile drawer with audit history and manager logs',
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
        'Interactive stage transitions across Todo, In Progress, and Done',
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
        { label: 'Monthly Revenue', value: `$${(monthlyRevenue / 1000).toFixed(1)}k`, delta: '+22.4% MoM' },
        { label: 'Gross Margin', value: `${(((monthlyRevenue - monthlyBurn) / (monthlyRevenue || 1)) * 100).toFixed(1)}%`, delta: '+4.1% efficiency' },
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

  const moveTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t
        if (t.column === 'todo') return { ...t, column: 'in_progress', priority: 'Active Sprint' }
        if (t.column === 'in_progress') return { ...t, column: 'done', priority: 'Shipped' }
        return { ...t, column: 'todo', priority: 'To Do' }
      })
    )
  }

  const sampleTalentList: TourTalent[] = [
    { id: '1', name: 'Sarah Connor', dept: 'Engineering', role: 'Staff Backend Architect', mode: 'Remote', score: '98%', status: 'Permanent', email: 'sarah.c@trm.com' },
    { id: '2', name: 'Marcus Vance', dept: 'Product Design', role: 'Lead UI/UX Designer', mode: 'Hybrid', score: '95%', status: 'Permanent', email: 'marcus.v@trm.com' },
    { id: '3', name: 'Elena Rostova', dept: 'DevOps & Cloud', role: 'Site Reliability Engineer', mode: 'Remote', score: '92%', status: 'Contract', email: 'elena.r@trm.com' },
    { id: '4', name: 'David Kalu', dept: 'Finance & RevOps', role: 'Financial Controller', mode: 'On-site', score: '99%', status: 'Permanent', email: 'david.k@trm.com' },
  ]

  const filteredTalent = sampleTalentList.filter(
    (e) =>
      e.name.toLowerCase().includes(talentQuery.toLowerCase()) ||
      e.dept.toLowerCase().includes(talentQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(talentQuery.toLowerCase())
  )

  const quickCommands = [
    { label: 'Create New Employee Record', shortcut: 'N E', category: 'Action' },
    { label: 'Open Kanban Delivery Board', shortcut: 'G K', category: 'Navigation' },
    { label: 'Download Talent Directory CSV', shortcut: 'E C', category: 'Export' },
    { label: 'Toggle Dark / Light Theme', shortcut: 'T M', category: 'System' },
    { label: 'Inspect Financial Ledger', shortcut: 'G F', category: 'Navigation' },
  ].filter((c) => c.label.toLowerCase().includes(commandInput.toLowerCase()))

  const grossMargin = (((monthlyRevenue - monthlyBurn) / (monthlyRevenue || 1)) * 100).toFixed(1)

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

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Descriptions & Real Impact Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary dark:text-indigo-400">
                {currentTab.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white mt-1 leading-snug">
                {currentTab.tagline}
              </h3>
            </div>

            <ul className="space-y-3">
              {currentTab.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-300">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
              {currentTab.stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-2xs">
                  <div className="text-[11px] text-gray-400 font-medium truncate">{stat.label}</div>
                  <div className="text-base font-black text-gray-900 dark:text-white mt-0.5">{stat.value}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 truncate">
                    {stat.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-indigo-400 hover:gap-3 transition-all"
              >
                <span>Experience live in sandbox</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Live Mock Window (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 transition-all min-h-[440px] flex flex-col justify-between">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-gray-400 dark:text-slate-500 text-[11px] ml-2">
                  app.trm.io/{activeTab}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Interactive Mock
              </div>
            </div>

            {/* TAB CONTENT: 1. TALENT 360 */}
            {activeTab === 'talent' && (
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Search Filter Bar */}
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/80 p-2 rounded-xl border border-gray-200 dark:border-slate-700 mb-3">
                    <Search size={14} className="text-gray-400" />
                    <input
                      type="text"
                      value={talentQuery}
                      onChange={(e) => setTalentQuery(e.target.value)}
                      placeholder="Type to filter talent: 'Sarah', 'DevOps', 'Remote'..."
                      className="w-full bg-transparent text-xs text-gray-800 dark:text-white outline-none"
                    />
                    <div className="flex items-center gap-1 text-[11px] font-bold text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded whitespace-nowrap">
                      <Filter size={12} />
                      <span>{filteredTalent.length} active</span>
                    </div>
                  </div>

                  {/* Talent Rows */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 divide-y divide-gray-100 dark:divide-slate-800 text-xs">
                    {filteredTalent.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => setSelectedTalent(emp)}
                        className={`p-3 flex items-center justify-between transition-colors cursor-pointer ${
                          selectedTalent?.id === emp.id
                            ? 'bg-indigo-50 dark:bg-slate-800 border-l-4 border-primary'
                            : 'hover:bg-gray-50/50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                              <span>{emp.name}</span>
                              <span className="text-[10px] text-gray-400 font-normal">({emp.email})</span>
                            </div>
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

                {/* Simulated Mini Slide-Over Profile Drawer */}
                {selectedTalent && (
                  <div className="p-3.5 bg-indigo-50/70 dark:bg-slate-800/80 rounded-2xl border border-primary/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center justify-between text-xs font-bold text-primary dark:text-indigo-400 mb-1">
                      <span>360° Profile Preview: {selectedTalent.name}</span>
                      <button onClick={() => setSelectedTalent(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] mt-2">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Department</span>
                        <span className="font-bold text-gray-800 dark:text-white">{selectedTalent.dept}</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Discipline</span>
                        <span className="font-bold text-emerald-600">{selectedTalent.score} High</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Work Mode</span>
                        <span className="font-bold text-indigo-600">{selectedTalent.mode}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 2. KANBAN SPRINTS */}
            {activeTab === 'kanban' && (
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Interactive Kanban: Click card button to shift columns</span>
                  <span className="text-primary font-bold">3 Tasks Loaded</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Column 1: Todo */}
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between font-bold text-gray-600 dark:text-slate-400 mb-2 pb-1 border-b border-gray-200 dark:border-slate-700">
                      <span>To Do</span>
                      <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-slate-700 text-center text-[10px]">
                        {tasks.filter((t) => t.column === 'todo').length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.filter((t) => t.column === 'todo').map((task) => (
                        <div key={task.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                            {task.priority}
                          </span>
                          <p className="font-bold text-gray-800 dark:text-white mt-1">{task.title}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400">
                            <span>{task.due}</span>
                            <button
                              onClick={() => moveTask(task.id)}
                              className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Start</span>
                              <ChevronRight size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-indigo-50/40 dark:bg-slate-800/60 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-900/50">
                    <div className="flex items-center justify-between font-bold text-primary dark:text-indigo-400 mb-2 pb-1 border-b border-indigo-100 dark:border-indigo-950">
                      <span>In Progress</span>
                      <span className="w-4 h-4 rounded-full bg-primary text-white text-center text-[10px]">
                        {tasks.filter((t) => t.column === 'in_progress').length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.filter((t) => t.column === 'in_progress').map((task) => (
                        <div key={task.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-primary/30 dark:border-slate-700 shadow-xs">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-white">
                            {task.priority}
                          </span>
                          <p className="font-bold text-gray-800 dark:text-white mt-1">{task.title}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400">
                            <span>{task.due}</span>
                            <button
                              onClick={() => moveTask(task.id)}
                              className="text-emerald-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Complete</span>
                              <Check size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 mb-2 pb-1 border-b border-gray-200 dark:border-slate-700">
                      <span>Done</span>
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-center text-[10px]">
                        {tasks.filter((t) => t.column === 'done').length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.filter((t) => t.column === 'done').map((task) => (
                        <div key={task.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs opacity-90">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            {task.priority}
                          </span>
                          <p className="font-bold text-gray-800 dark:text-white mt-1 line-through">{task.title}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-[10px] text-emerald-600 font-bold">
                            <span>✓ Verified</span>
                            <button
                              onClick={() => moveTask(task.id)}
                              className="text-gray-400 hover:text-primary cursor-pointer text-[9px]"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. FINANCIAL LEDGER */}
            {activeTab === 'finance' && (
              <div className="space-y-4 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-emerald-100 dark:border-slate-700">
                      <div className="text-[11px] font-medium text-gray-500">Monthly Revenue (ARR Run)</div>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        ${monthlyRevenue.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">8 invoices paid on schedule</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-red-100 dark:border-slate-700">
                      <div className="text-[11px] font-medium text-gray-500">Monthly Burn (Payroll & Cloud)</div>
                      <div className="text-xl font-black text-gray-900 dark:text-white mt-1">
                        ${monthlyBurn.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        {grossMargin}% Gross Margin
                      </div>
                    </div>
                  </div>

                  {/* Interactive Sliders to Test Live Calculations */}
                  <div className="bg-gray-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-300">
                        <span>Adjust Monthly Revenue:</span>
                        <span className="text-primary font-black">${monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="40000"
                        max="150000"
                        step="5000"
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-300">
                        <span>Adjust Monthly Burn:</span>
                        <span className="text-red-500 font-black">${monthlyBurn.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="60000"
                        step="2000"
                        value={monthlyBurn}
                        onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-3 text-[11px]">
                  <div className="flex justify-between items-center font-bold text-gray-700 dark:text-slate-300 pb-2 border-b border-gray-100 dark:border-slate-800">
                    <span>Double-Entry Transaction Audit</span>
                    <span className="text-emerald-600 font-bold">Auto-Reconciled</span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-slate-800">
                    <div className="flex justify-between py-1.5">
                      <span>Apex Corp Enterprise License</span>
                      <span className="font-bold text-emerald-600">+$24,500.00</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>Cloud Infrastructure Cluster (Render)</span>
                      <span className="font-bold text-gray-600 dark:text-slate-300">-$1,480.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. COMMAND ⌘K */}
            {activeTab === 'command' && (
              <div className="space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="bg-gray-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-primary/40 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-700">
                    <Search size={16} className="text-primary" />
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      placeholder="Try typing: 'export', 'theme', 'employee'..."
                      className="w-full bg-transparent text-xs font-semibold text-gray-900 dark:text-white outline-none"
                    />
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-[10px] font-mono text-gray-400">
                      ESC
                    </kbd>
                  </div>

                  <div className="space-y-1">
                    {quickCommands.map((cmd, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-primary/40 transition-colors"
                      >
                        <span className="font-bold text-gray-800 dark:text-slate-200">{cmd.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400">{cmd.category}</span>
                          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-primary">
                            {cmd.shortcut}
                          </kbd>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl text-center text-primary dark:text-indigo-300 text-xs font-bold">
                  ⚡ Powered by client-side fuzzy indexing for sub-8ms response time
                </div>
              </div>
            )}

            {/* Bottom Window Footer */}
            <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-gray-400 dark:text-slate-500 font-medium">
                TRM Enterprise Engine 2.3
              </span>
              <Link
                to="/login"
                className="font-bold text-primary dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Launch Live System</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
