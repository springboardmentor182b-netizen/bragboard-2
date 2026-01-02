
import React from 'react';
import { Icons } from '../constants';

interface NotificationsProps {
  notifications: any[];
  onMarkAllRead: () => void;
  onDelete: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onMarkAllRead, onDelete }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Activity Center</h1>
          <p className="text-slate-500 font-medium">Stay updated with recognitions and workspace milestones.</p>
        </div>
        <button 
          onClick={onMarkAllRead}
          className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline italic"
        >
          Mark all as read
        </button>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Live Neural Feed</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {notifications.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <div className="text-5xl opacity-20 grayscale">📭</div>
              <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No notifications found</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-6 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group relative ${!n.read ? 'bg-indigo-50/30' : ''}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${
                  n.type === 'brag' ? 'bg-indigo-100 text-indigo-600' : 
                  n.type === 'badge' ? 'bg-amber-100 text-amber-600' : 
                  n.type === 'broadcast' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {n.type === 'brag' ? '🔥' : n.type === 'badge' ? '🏆' : n.type === 'broadcast' ? '📢' : '🔔'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-900 leading-tight italic">{n.title}</p>
                    {!n.read && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{n.msg}</p>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2 italic">
                    {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(n.id); }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
