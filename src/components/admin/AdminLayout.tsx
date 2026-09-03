import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, ClipboardList, BarChart3, LogOut, BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useState } from 'react';

const navItems = [
  { to: '/admin/dashboard', label: 'Inventory Overview', icon: LayoutDashboard },
  { to: '/admin/dashboard/add', label: 'Add New Product', icon: PackagePlus },
  { to: '/admin/dashboard/orders', label: 'Orders Log', icon: ClipboardList },
  { to: '/admin/dashboard/analytics', label: 'Store Analytics', icon: BarChart3 },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-navy-950/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy-900 border-r border-navy-800 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brass-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-navy-900" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-cream-50 block leading-none">Paper &amp; Parchment</span>
              <span className="text-[10px] text-brass-400 tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brass-500 text-navy-900'
                    : 'text-cream-300 hover:bg-navy-800 hover:text-cream-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-navy-900 border-b border-navy-800 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-cream-300">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif text-sm font-bold text-cream-50">Admin Panel</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
