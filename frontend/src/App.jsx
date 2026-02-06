import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutDashboard, Wallet, Users, Briefcase, UserCheck, Calendar,
  Settings, User, Bell, Search, Filter, Plus, Trash2, X, Camera
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, activePage, setActivePage }) => {
  const isActive = activePage === label;
  return (
    <div
      onClick={() => setActivePage(label)}
      className={`flex items-center space-x-3 px-6 py-3 cursor-pointer mb-1 transition-colors ${isActive ? 'text-primary border-r-4 border-primary bg-indigo-50' : 'text-gray-500 hover:bg-gray-100'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const StatCard = ({ title, value, subtext, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {trend}
      </span>
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-xs text-gray-400">{subtext}</div>
  </div>
);

const Badge = ({ status }) => {
  const styles = status === 'Permanent'
    ? 'bg-emerald-100 text-emerald-600'
    : 'bg-gray-100 text-gray-600';
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
};

// --- Main App Component ---

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', department: '', age: '', status: 'Contract' });
  const [stats, setStats] = useState({ totalEmployees: 0, jobViews: 0, jobApplied: 0, resigned: 0 });

  // Profile State - Default is "Manager"
  const [managerName, setManagerName] = useState("Manager");
  const [managerRole, setManagerRole] = useState("HR Manager");
  const [profileImage, setProfileImage] = useState(null);

  // CHANGE THIS TO YOUR RENDER URL WHEN DEPLOYING
  // const API_URL = "https://team-manager.onrender.com/api";
  const API_URL = "http://localhost:8080/api";

  const refreshData = async () => {
    try {
      const empRes = await axios.get(`${API_URL}/employees`);
      const statRes = await axios.get(`${API_URL}/stats`);
      setEmployees(empRes.data);
      setStats(statRes.data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  useEffect(() => { refreshData(); }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, disciplineScore: Math.floor(Math.random() * (100 - 70 + 1) + 70) };
      await axios.post(`${API_URL}/employees`, payload);
      setIsModalOpen(false);
      setFormData({ name: '', department: '', age: '', status: 'Contract' });
      refreshData();
    } catch (error) {
      alert("Failed to add employee");
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to remove this employee?")) {
      try {
        await axios.delete(`${API_URL}/employees/${id}`);
        refreshData();
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  const barData = [
    { name: 'Jan', view: 40, applied: 24 }, { name: 'Feb', view: 50, applied: 30 },
    { name: 'Mar', view: 60, applied: 45 }, { name: 'Apr', view: 45, applied: 30 },
    { name: 'May', view: 30, applied: 20 }, { name: 'Jun', view: 55, applied: 35 },
    { name: 'Jul', view: 65, applied: 40 }, { name: 'Aug', view: 80, applied: 60 },
    { name: 'Sep', view: 60, applied: 35 }, { name: 'Oct', view: 45, applied: 25 },
    { name: 'Nov', view: 35, applied: 20 }, { name: 'Dec', view: 65, applied: 50 },
  ];
  const pieData = [{ name: 'Male', value: 65 }, { name: 'Female', value: 35 }];
  const COLORS = ['#10B981', '#6366F1'];

  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            TM
          </div>
          <span className="text-xl font-bold text-gray-800">TeamFlow</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {['Dashboard', 'Finance', 'Employees', 'Company', 'Candidate', 'Calendar'].map((item) => (
             <SidebarItem
               key={item}
               icon={item === 'Dashboard' ? LayoutDashboard : item === 'Finance' ? Wallet : item === 'Employees' ? Users : item === 'Company' ? Briefcase : item === 'Candidate' ? UserCheck : Calendar}
               label={item}
               activePage={activePage}
               setActivePage={setActivePage}
             />
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <SidebarItem icon={User} label="Profile" activePage={activePage} setActivePage={setActivePage} />
          <SidebarItem icon={Settings} label="Setting" activePage={activePage} setActivePage={setActivePage} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">{activePage}</h2>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
               <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <button className="p-2 relative text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* MANAGER PROFILE HEADER */}
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={() => setActivePage('Profile')}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <User size={20} />
                </div>
              )}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-bold text-gray-700">{managerName}</p>
                <p className="text-xs text-gray-500">{managerRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {activePage === 'Dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value={stats.totalEmployees || 0} subtext="Employee" trend="+10.0%" />
                <StatCard title="Job View" value={stats.jobViews} subtext="Viewers" trend="+22.0%" />
                <StatCard title="Job Applied" value={stats.jobApplied} subtext="Applicants" trend="+12.0%" />
                <StatCard title="Resigned Employees" value={stats.resigned} subtext="Employee" trend="-7.0%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Job Statistics</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={barData} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="view" stackId="a" fill="#E0E7FF" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="applied" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* UPDATED COMPOSITION CARD */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-80">
                  <h3 className="font-bold text-lg text-gray-800 w-full mb-2">Composition</h3>
                  <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-3xl font-bold text-gray-800">{stats.totalEmployees}</span>
                    </div>
                  </div>
                  {/* ADDED TEXT BELOW CHART */}
                  <p className="text-gray-400 text-sm mt-2">Total Employee Count</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">Employee Status</h3>
                  <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 text-sm text-white bg-primary hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
                    <Plus size={16} /> <span>Add Employee</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Employee Name</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Age</th>
                        <th className="px-6 py-4">Discipline</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/150?u=${emp.id}`} alt="avatar" className="w-8 h-8 rounded-full" />
                            {emp.name}
                          </td>
                          <td className="px-6 py-4">{emp.department}</td>
                          <td className="px-6 py-4">{emp.age}</td>
                          <td className="px-6 py-4 text-green-600 font-bold">+{emp.disciplineScore}%</td>
                          <td className="px-6 py-4"><Badge status={emp.status} /></td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleDelete(emp.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activePage === 'Profile' && (
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-4 border-indigo-50">
                      <User size={64} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{managerName}</h2>
                <p className="text-gray-500">{managerRole}</p>

                <div className="w-full mt-8 space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                     <input type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                     <input type="text" value={managerRole} onChange={(e) => setManagerRole(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                   </div>
                   <button onClick={() => alert("Profile Saved!")} className="w-full bg-primary text-white font-bold py-2 rounded-lg mt-4 shadow-lg shadow-indigo-200">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other pages */}
          {['Finance', 'Employees', 'Company', 'Candidate', 'Calendar', 'Setting'].includes(activePage) && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-gray-300">
               <div className="p-4 bg-indigo-50 rounded-full mb-4 text-primary">
                 {activePage === 'Finance' && <Wallet size={48} />}
                 {activePage === 'Employees' && <Users size={48} />}
                 {activePage === 'Company' && <Briefcase size={48} />}
                 {activePage === 'Candidate' && <UserCheck size={48} />}
                 {activePage === 'Calendar' && <Calendar size={48} />}
                 {activePage === 'Setting' && <Settings size={48} />}
               </div>
               <h3 className="text-xl font-bold text-gray-800">{activePage} Module</h3>
               <p className="text-gray-500 mt-2">This module is under development.</p>
            </div>
          )}
        </div>

        {/* Modal Logic (Same as before) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">New Employee</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Full Name</label><input required className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Department</label><select className="w-full px-4 py-2 border rounded-lg" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}><option value="">Select...</option><option value="Marketing">Marketing</option><option value="Finance">Finance</option><option value="R&D">R&D</option><option value="HR">HR</option><option value="Sales">Sales</option></select></div>
                  <div><label className="block text-sm font-medium mb-1">Age</label><input required type="number" className="w-full px-4 py-2 border rounded-lg" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} /></div>
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Contract Type</label>
                   <div className="flex gap-4">
                     <label className="flex items-center gap-2"><input type="radio" name="status" value="Permanent" checked={formData.status === 'Permanent'} onChange={() => setFormData({...formData, status: 'Permanent'})} /><span>Permanent</span></label>
                     <label className="flex items-center gap-2"><input type="radio" name="status" value="Contract" checked={formData.status === 'Contract'} onChange={() => setFormData({...formData, status: 'Contract'})} /><span>Contract</span></label>
                   </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-2">Confirm Hire</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;