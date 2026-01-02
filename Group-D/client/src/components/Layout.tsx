import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Icons } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  user: any;
  onLogout: () => void;
  notifications: any[];
  flaggedCount?: number;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, notifications, flaggedCount = 0 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const isAdmin = user?.role === UserRole.ADMIN || isSuperAdmin;
  const unreadCount = notifications.filter(n => !n.read).length;

  const mainLinks = [
    { to: '/', icon: <Icons.Home className="w-5 h-5" />, label: 'Neural Feed' },
    { to: '/leaderboard', icon: <Icons.Trophy className="w-5 h-5" />, label: 'Rankings' },
    { to: '/announcements', icon: <span className="text-sm">📢</span>, label: 'Broadcasts' },
    { to: '/challenges', icon: <span className="text-sm">🎯</span>, label: 'Missions' },
    { to: '/rewards', icon: <span className="text-sm">💎</span>, label: 'Rewards' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <Icons.Chart className="w-5 h-5" />, label: 'Analytics' },
    { to: '/admin/employees', icon: <Icons.Users className="w-5 h-5" />, label: 'Directory' },
    { to: '/admin/shoutouts', icon: <Icons.CheckCircle className="w-5 h-5" />, label: 'Moderation', count: flaggedCount },
    { to: '/admin/reports', icon: <span className="text-sm">📊</span>, label: 'Audit Logs' },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-inter">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <Link to="/" className="text-2xl font-black text-indigo-600 flex items-center gap-3 italic mb-12">
            <span className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl not-italic shadow-lg shadow-indigo-200">BB</span>
            BragBoard
          </Link>

          <nav className="flex-1 space-y-1">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}>
                {link.icon}
                <span className="text-[11px] font-black uppercase tracking-widest">{link.label}</span>
              </NavLink>
            ))}

            {isAdmin && (
              <div className="pt-8 mt-8 border-t border-slate-100 space-y-1">
                <p className="px-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 italic">Management Stack</p>
                {adminLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all relative ${isActive ? 'bg-indigo-900 text-white font-bold shadow-xl shadow-indigo-900/10' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {link.icon}
                    <span className="text-[11px] font-black uppercase tracking-widest">{link.label}</span>
                    {link.count !== undefined && link.count > 0 && (
                      <span className="absolute right-4 w-5 h-5 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">{link.count}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </nav>

          <div className="pt-8 mt-auto border-t border-slate-100 space-y-4">
            <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-slate-500'}`}>
               <img src={user?.avatar} className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm object-cover" alt="" />
               <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-black text-slate-900 truncate uppercase italic">{user?.name}</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user?.role}</p>
               </div>
            </NavLink>
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[10px] font-black text-slate-400 hover:text-rose-600 transition-all uppercase tracking-widest italic border border-transparent hover:border-rose-100 hover:bg-rose-50 rounded-2xl">
              Deauthorize Node
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 relative z-40">
           <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
           </div>
           
           <div className="hidden lg:block">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] italic">System Uptime: 99.9%</span>
           </div>

           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-[11px] font-black text-indigo-600 italic leading-none">{user?.points?.toLocaleString()} XP</p>
                 <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">Tier: {user?.role}</p>
              </div>
              <Link to="/notifications" className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Icons.Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">{unreadCount}</span>}
              </Link>
           </div>
        </header>

        <section className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
