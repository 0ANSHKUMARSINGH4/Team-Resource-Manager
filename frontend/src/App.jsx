import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  LayoutDashboard, Wallet, Users, Briefcase, Calendar as CalendarIcon,
  Settings, User, Bell, Search, Plus, Trash2, X, Camera,
  Clock, CheckCircle, DollarSign, Moon, Sun, Shield, LogOut,
  TrendingUp, TrendingDown, ChevronDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// --- Helper Functions ---
const getAvatarColor = (name) => {
  const colors = [
    'bg-red-100 text-red-600', 'bg-orange-100 text-orange-600', 'bg-amber-100 text-amber-600',
    'bg-green-100 text-green-600', 'bg-emerald-100 text-emerald-600', 'bg-teal-100 text-teal-600',
    'bg-blue-100 text-blue-600', 'bg-indigo-100 text-indigo-600', 'bg-violet-100 text-violet-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';

// --- Sub-Components ---
const SidebarItem = ({ icon: Icon, label, activePage, setActivePage }) => {
  const isActive = activePage === label;
  return (
    <div
      onClick={() => setActivePage(label)}
      className={`flex items-center space-x-3 px-6 py-3 cursor-pointer mb-2 transition-colors border-l-4 ${
        isActive
          ? 'border-primary text-primary bg-indigo-50 dark:bg-slate-800 dark:text-indigo-400'
          : 'border-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, subtext, trend, trendUp, icon: Icon }) => (
  <Card className="p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-3">
         {Icon && <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg text-primary dark:text-indigo-400"><Icon size={18} /></div>}
         <h3 className="text-gray-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'}`}>
          {trend}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{value}</div>
    <div className="text-xs text-gray-400 dark:text-slate-500">{subtext}</div>
  </Card>
);

const Badge = ({ status }) => {
  const styles = status === 'Permanent'
    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300'
    : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300';
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
};

// --- Main App Component ---
function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Dropdown State

  // Forms & State
  const [formData, setFormData] = useState({ name: '', department: '', age: '', status: 'Contract' });
  const [projectForm, setProjectForm] = useState({ title: '', deadline: '', team: 3 });
  const [stats, setStats] = useState({ totalEmployees: 0, jobViews: 0, jobApplied: 0, resigned: 0 });
  const [managerName, setManagerName] = useState("Manager");
  const [managerRole, setManagerRole] = useState("Team Lead");

  // Mock Data
  const [projects, setProjects] = useState([
    { id: 1, title: "Website Redesign", status: "In Progress", deadline: "2026-02-18", team: 13 },
    { id: 2, title: "Mobile App API", status: "To Do", deadline: "2026-02-25", team: 4 },
    { id: 3, title: "Q3 Marketing", status: "Done", deadline: "2026-02-10", team: 5 },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, desc: "AWS Server Costs", amount: -1200, date: "2026-02-01", type: "expense" },
    { id: 2, desc: "Client Payment #102", amount: 8500, date: "2026-02-03", type: "income" },
    { id: 3, desc: "SaaS Licenses", amount: -450, date: "2026-02-05", type: "expense" },
    { id: 4, desc: "Q1 Bonus Payout", amount: -3200, date: "2026-02-06", type: "expense" },
  ]);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Data Fetching
  const API_URL = "http://localhost:8080/api";
  const refreshData = async () => {
    try {
      const empRes = await axios.get(`${API_URL}/employees`);
      const statRes = await axios.get(`${API_URL}/stats`);
      setEmployees(empRes.data);
      setStats(statRes.data);
    } catch (error) { console.error("Backend error", error); }
  };
  useEffect(() => { refreshData(); }, []);

  // Handlers
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/employees`, { ...formData, disciplineScore: 88 });
      setIsModalOpen(false); refreshData();
    } catch (err) { alert("Error adding employee"); }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    setProjects([...projects, { ...projectForm, id: Date.now(), status: "To Do" }]);
    setIsProjectModalOpen(false);
  };

  const handleDelete = async (id) => {
    if(confirm("Remove employee?")) {
      await axios.delete(`${API_URL}/employees/${id}`); refreshData();
    }
  };

  // Click Outside to Close Dropdown
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Chart Data
  const barData = [
    { name: 'Jan', tasks: 40, completed: 24 }, { name: 'Feb', tasks: 50, completed: 30 },
    { name: 'Mar', tasks: 60, completed: 45 }, { name: 'Apr', tasks: 45, completed: 30 },
  ];
  const financeData = [
    { name: 'Week 1', income: 4000, expense: 2400 }, { name: 'Week 2', income: 3000, expense: 1398 },
    { name: 'Week 3', income: 2000, expense: 9800 }, { name: 'Week 4', income: 2780, expense: 3908 },
  ];
  const COLORS = ['#10B981', '#6366F1']; // Green & Purple

  return (
    <div className="flex h-screen bg-[#F8F9FD] dark:bg-slate-900 font-sans transition-colors duration-300">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col transition-colors z-20">
        <div className="p-6 flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md text-xs">TRM</div>
          <span className="text-lg font-bold text-gray-800 dark:text-white leading-tight">Team Resource<br/>Manager</span>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {['Dashboard', 'Finance', 'Employees', 'Projects', 'Calendar'].map(item => (
            <SidebarItem
              key={item}
              icon={
                item === 'Dashboard' ? LayoutDashboard :
                item === 'Finance' ? Wallet :
                item === 'Employees' ? Users :
                item === 'Projects' ? Briefcase : CalendarIcon
              }
              label={item}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          ))}
        </div>

        {/* Bottom Navigation (Profile & Settings) */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-1">
          <SidebarItem icon={User} label="Profile" activePage={activePage} setActivePage={setActivePage} />
          <SidebarItem icon={Settings} label="Settings" activePage={activePage} setActivePage={setActivePage} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">

        {/* Navbar */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-colors">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{activePage}</h2>
          <div className="flex items-center space-x-4 relative">

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Profile Dropdown Trigger */}
            <div ref={dropdownRef} className="relative">
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors group select-none"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-slate-600 flex items-center justify-center text-primary dark:text-indigo-400 overflow-hidden">
                  <User size={20} />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{managerName}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{managerRole}</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 group-hover:text-primary transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-16 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                   <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 mb-2">
                     <p className="text-sm font-bold text-gray-800 dark:text-white">Signed in as</p>
                     <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{managerRole}</p>
                   </div>
                   <button
                     onClick={() => { setActivePage('Profile'); setIsProfileMenuOpen(false); }}
                     className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                   >
                     <User size={16} /> My Profile
                   </button>
                   <button
                     onClick={() => { setActivePage('Settings'); setIsProfileMenuOpen(false); }}
                     className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                   >
                     <Settings size={16} /> Account Settings
                   </button>
                   <div className="border-t border-gray-100 dark:border-slate-700 mt-2 pt-2">
                     <button
                       onClick={() => setIsProfileMenuOpen(false)}
                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                     >
                       <LogOut size={16} /> Sign Out
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* --- DASHBOARD --- */}
          {activePage === 'Dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value={stats.totalEmployees} subtext="Active Members" trend="+10%" trendUp={true} />
                <StatCard title="Active Tasks" value={stats.jobViews} subtext="In Progress" trend="+22%" trendUp={true} />
                <StatCard title="Pending" value={stats.jobApplied} subtext="Review" trend="+12%" trendUp={true} />
                <StatCard title="On Leave" value={stats.resigned} subtext="Unavailable" trend="-2%" trendUp={false} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6 h-80">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Task Trends</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={barData} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#E5E7EB"} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#94a3b8' : '#9CA3AF'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: darkMode ? '#94a3b8' : '#9CA3AF'}} />
                      <Tooltip
                        contentStyle={{backgroundColor: darkMode ? '#1e293b' : '#fff', borderColor: darkMode ? '#334155' : '#e5e7eb', color: darkMode ? '#fff' : '#000'}}
                        cursor={{fill: 'transparent'}}
                      />
                      <Bar dataKey="tasks" stackId="a" fill="#E0E7FF" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="completed" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* --- REDESIGNED DISTRIBUTION CARD WITH LEGEND --- */}
                <Card className="p-6 flex flex-col items-start h-80">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Distribution</h3>
                  <div className="w-full flex-1 relative flex items-center justify-center min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[{ name: 'On-Site', value: 35 }, { name: 'Remote', value: 65 }]}
                          innerRadius={60}
                          outerRadius={80}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                          stroke="none"
                        >
                          {COLORS.map((color, index) => <Cell key={index} fill={color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalEmployees}</span>
                    </div>
                  </div>

                  {/* CHART LEGEND */}
                  <div className="w-full flex justify-center gap-6 mt-4 pt-2 border-t border-gray-50 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                       <span className="text-sm font-medium text-gray-500 dark:text-slate-400">On-Site</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                       <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Remote</span>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* --- FINANCE --- */}
          {activePage === 'Finance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Budget" value="$128k" subtext="Annual" trend="+5%" trendUp={true} icon={DollarSign} />
                <StatCard title="Expenses" value="$45.2k" subtext="YTD" trend="+12%" trendUp={false} icon={TrendingDown} />
                <StatCard title="Net Income" value="$82.8k" subtext="Safe" trend="+8%" trendUp={true} icon={TrendingUp} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Transaction Table */}
                 <Card className="overflow-hidden">
                   <div className="p-6 border-b border-gray-100 dark:border-slate-700">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Recent Transactions</h3>
                   </div>
                   <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                        {transactions.map(t => (
                          <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                            <td className="px-6 py-4 font-medium">{t.desc}</td>
                            <td className="px-6 py-4 text-xs text-gray-400">{t.date}</td>
                            <td className={`px-6 py-4 font-bold ${t.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-slate-200'}`}>
                              {t.amount > 0 ? '+' : ''}{t.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                 </Card>
                 {/* Finance Chart */}
                 <Card className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Cash Flow Analysis</h3>
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={financeData}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#94a3b8' : '#9CA3AF'}}/>
                        <Tooltip contentStyle={{backgroundColor: darkMode ? '#1e293b' : '#fff', borderColor: 'transparent'}} />
                        <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expense" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpense)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </Card>
              </div>
            </div>
          )}

          {/* --- PROJECTS --- */}
          {activePage === 'Projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white">Kanban Board</h2>
                 <button onClick={() => setIsProjectModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                   <Plus size={16} /> New Project
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <Card key={project.id} className="p-6 relative group hover:shadow-md">
                    <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg ${project.status === 'Done' ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-primary'} dark:bg-slate-700`}>
                        {project.status === 'Done' ? <CheckCircle size={24} /> : <Clock size={24} />}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-400 mb-6">
                      <span>Due: {project.deadline}</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs font-bold">{project.status}</span>
                    </div>
                    {/* Fixed Avatar Overlap Logic */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
                      <div className="flex -space-x-2">
                         {[...Array(Math.min(project.team, 4))].map((_,i) => (
                           <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-slate-300">U{i+1}</div>
                         ))}
                         {project.team > 4 && (
                           <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-primary dark:text-indigo-300">
                             +{project.team - 4}
                           </div>
                         )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* --- CALENDAR --- */}
          {activePage === 'Calendar' && (
            <Card className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">February 2026</h2>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400"><div className="w-3 h-3 rounded-full bg-primary"></div> Deadline</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-4 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="font-bold text-gray-400 text-sm mb-4">{d}</div>
                ))}
                {/* Calendar Grid Logic */}
                {[...Array(28)].map((_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;
                  const hasDeadline = projects.some(p => p.deadline === dateStr);
                  return (
                    <div key={i} className={`h-24 rounded-xl border ${hasDeadline ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'} p-2 flex flex-col justify-between hover:border-indigo-300 transition-colors`}>
                      <span className={`text-sm font-bold ${hasDeadline ? 'text-primary' : 'text-gray-500 dark:text-slate-400'}`}>{day}</span>
                      {hasDeadline && (
                        <div className="bg-primary text-white text-[10px] rounded px-1 py-1 truncate">
                          {projects.find(p => p.deadline === dateStr).title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* --- SETTINGS --- */}
          {activePage === 'Settings' && (
            <Card className="max-w-3xl mx-auto overflow-hidden">
               <div className="p-6 border-b border-gray-100 dark:border-slate-700">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">System Settings</h3>
               </div>
               <div className="p-6 space-y-4">
                  <div className="p-4 bg-indigo-50 dark:bg-slate-700/30 rounded-lg flex gap-4 items-center">
                    <Shield className="text-primary" />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Account Security</h4>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Password last changed: 30 days ago</p>
                    </div>
                    <button className="ml-auto text-sm text-primary font-bold">Update</button>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg flex gap-4 items-center cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="text-red-500" />
                    <div>
                      <h4 className="font-bold text-red-600 dark:text-red-400">Sign Out</h4>
                      <p className="text-sm text-red-400 dark:text-red-500/70">Log out of your session securely</p>
                    </div>
                  </div>
               </div>
            </Card>
          )}

          {/* --- PROFILE PAGE (New) --- */}
          {activePage === 'Profile' && (
            <Card className="max-w-2xl mx-auto p-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-primary dark:text-indigo-400 mb-4 border-4 border-white dark:border-slate-600 shadow-sm">
                   <User size={64} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{managerName}</h2>
                <p className="text-gray-500 dark:text-slate-400 mb-8">{managerRole}</p>
                <div className="w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Display Name</label>
                    <input className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Role Title</label>
                    <input className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={managerRole} onChange={(e) => setManagerRole(e.target.value)} />
                  </div>
                  <button className="w-full py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 mt-4">Save Profile</button>
                </div>
              </div>
            </Card>
          )}

          {/* --- EMPLOYEES (Fallback for Shared View) --- */}
          {(activePage === 'Employees' || activePage === 'Dashboard') && (
            <Card className={`overflow-hidden ${activePage === 'Dashboard' ? 'block' : activePage === 'Employees' ? 'block' : 'hidden'}`}>
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Resources</h3>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 text-sm text-white bg-primary hover:bg-indigo-700 px-4 py-2 rounded-lg">
                  <Plus size={16} /> <span>Add</span>
                </button>
              </div>
              <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
                <thead className="bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-400">
                  <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Dept</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-900 dark:text-white">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarColor(emp.name)}`}>{getInitials(emp.name)}</div>
                        {emp.name}
                      </td>
                      <td className="px-6 py-4">{emp.department}</td>
                      <td className="px-6 py-4"><Badge status={emp.status} /></td>
                      <td className="px-6 py-4"><button onClick={() => handleDelete(emp.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>

        {/* --- MODALS --- */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-6">
              <h3 className="text-xl font-bold mb-4 dark:text-white">New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input required placeholder="Project Title" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} />
                <input required type="date" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={projectForm.deadline} onChange={(e) => setProjectForm({...projectForm, deadline: e.target.value})} />
                <input required type="number" placeholder="Team Size" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={projectForm.team} onChange={(e) => setProjectForm({...projectForm, team: parseInt(e.target.value)})} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsProjectModalOpen(false)} className="flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
                  <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700">Create</button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;