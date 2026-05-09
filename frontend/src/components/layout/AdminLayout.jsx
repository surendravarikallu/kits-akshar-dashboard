import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Menu as MenuIcon, 
  Layers, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { label: 'Navbar Menu', icon: <MenuIcon size={20} />, path: '/admin/navbar' },
    { label: 'Section Manager', icon: <Layers size={20} />, path: '/admin/sections' },
    { label: 'Departments', icon: <Users size={20} />, path: '/admin/departments' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-kits-black flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="text-xl font-clash font-bold text-white tracking-tight flex items-center gap-2 group">
            <div className="w-6 h-6 bg-kits-gold rounded-sm flex items-center justify-center text-kits-black text-xs">K</div>
            <span>AKSHAR <span className="text-[10px] text-kits-gold uppercase tracking-[0.2em] block font-medium">Admin</span></span>
          </Link>
        </div>

        <nav className="flex-grow p-4 mt-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-kits-gold text-kits-black font-bold' 
                    : 'text-kits-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="text-sm uppercase tracking-widest font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-4 px-4 py-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-kits-navy flex items-center justify-center text-kits-gold border border-kits-gold/20 font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-kits-gray truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 transition-colors rounded-sm"
          >
            <LogOut size={20} />
            <span className="text-sm uppercase tracking-widest font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-kits-black/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-kits-gold">
            {navItems.find(n => n.path === location.pathname)?.label || 'Administration'}
          </h2>
          <Link to="/" className="text-xs text-kits-gray hover:text-white flex items-center gap-2 transition-colors">
            <ChevronLeft size={14} /> View Website
          </Link>
        </header>
        
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
