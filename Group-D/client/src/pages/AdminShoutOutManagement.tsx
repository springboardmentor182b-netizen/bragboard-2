
import React, { useState, useEffect } from 'react';
import { ShoutOut, Comment } from '../types';
import { Icons } from '../constants';

interface AdminShoutOutManagementProps {
  brags: ShoutOut[];
  onDelete: (id: string) => void;
  onResolve: (id: string) => void;
  onDeleteComment: (bragId: string, commentId: string) => void;
  onResolveComment: (bragId: string, commentId: string) => void;
}

const AdminShoutOutManagement: React.FC<AdminShoutOutManagementProps> = ({ brags, onDelete, onResolve, onDeleteComment, onResolveComment }) => {
  const [filter, setFilter] = useState<'all' | 'reported' | 'edited' | 'comments'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reportedComments = brags.flatMap(b => 
    b.comments.filter(c => !!c.isReported).map(c => ({ 
      ...c, 
      bragId: b.id, 
      bragTitle: `By ${b.fromName} for ${b.toNames.join(', ')}` 
    }))
  );

  const reportedPostsCount = brags.filter(b => !!b.isReported).length;

  useEffect(() => {
    if (reportedPostsCount > 0 && filter === 'all') {
      setFilter('reported');
    } else if (reportedComments.length > 0 && reportedPostsCount === 0 && filter === 'all') {
      setFilter('comments');
    }
  }, [reportedPostsCount, reportedComments.length, filter]);

  const filteredBrags = brags.filter(b => {
    const matchesSearch = b.fromName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.toNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesTab = true;
    if (filter === 'reported') {
      matchesTab = !!b.isReported;
    } else if (filter === 'edited') {
      matchesTab = !!b.isEdited;
    } else if (filter === 'comments') {
      matchesTab = false; 
    }

    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic mb-2 tracking-tight">Community Oversight</h1>
          <p className="text-slate-500 font-medium italic">Global review and moderation of workforce interactions.</p>
        </div>
        <div className="flex bg-slate-100 p-2 rounded-[1.5rem] w-full md:w-auto shadow-inner">
          {(['all', 'reported', 'edited', 'comments'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic relative ${
                filter === t ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t === 'comments' ? `Flagged Comments (${reportedComments.length})` : t === 'reported' ? `Reported Posts (${reportedPostsCount})` : t}
              {((t === 'reported' && reportedPostsCount > 0) || (t === 'comments' && reportedComments.length > 0)) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </header>

      {filter !== 'comments' && (
        <>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 flex items-center justify-center">
              <Icons.Home className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              placeholder="Filter by participant identity..." 
              className="flex-1 bg-transparent border-none outline-none font-black text-slate-700 placeholder:text-slate-300 placeholder:italic text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                    <th className="px-10 py-6">Participants</th>
                    <th className="px-10 py-6">Shout-out Logic</th>
                    <th className="px-10 py-6">Engagement</th>
                    <th className="px-10 py-6 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBrags.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-24 text-center text-slate-300 font-black italic uppercase tracking-widest text-sm">
                        No active records in this sector
                      </td>
                    </tr>
                  ) : (
                    filteredBrags.map((brag) => (
                      <tr key={brag.id} className={`transition-all ${brag.isReported ? 'bg-rose-50/40' : 'hover:bg-slate-50/30'}`}>
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${brag.fromName}`} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-100 shadow-sm object-cover" alt="" />
                            <div>
                              <p className="font-black text-slate-900 text-base italic">{brag.fromName}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Tags: {brag.toNames.join(', ')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="max-w-sm">
                            <p className="text-sm font-bold text-slate-600 italic leading-relaxed line-clamp-2">"{brag.message}"</p>
                            {brag.isReported && (
                              <div className="mt-3 text-[10px] font-black text-rose-600 bg-white px-4 py-2 rounded-xl border border-rose-100 uppercase italic shadow-sm">
                                Flagged: {brag.reportReason || 'Suspicious Content'}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-4">
                             <div className="text-center">
                               <p className="text-[10px] font-black text-slate-300 uppercase italic mb-1">Total</p>
                               <p className="text-lg font-black text-indigo-600 italic leading-none">
                                 {Object.values(brag.reactions).reduce((a, b) => a + b, 0)}
                               </p>
                             </div>
                             <div className="flex gap-2">
                                <span className="text-xs">❤️{brag.reactions.like}</span>
                                <span className="text-xs">👏{brag.reactions.clap}</span>
                                <span className="text-xs">⭐{brag.reactions.star}</span>
                             </div>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-3">
                            {brag.isReported && (
                              <button onClick={() => onResolve(brag.id)} className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg italic">Resolve</button>
                            )}
                            <button onClick={() => { if(window.confirm("Permanently delete this entry?")) onDelete(brag.id) }} className="px-6 py-3 bg-white text-rose-500 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all shadow-sm italic">Purge</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {filter === 'comments' && (
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
           <div className="p-10 border-b border-slate-50 bg-slate-50/50">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">Neural Thread Filtering</h3>
           </div>
           {reportedComments.length === 0 ? (
             <div className="p-32 text-center">
                <p className="text-slate-300 font-black italic uppercase tracking-widest text-sm">No flagged dialogue detected.</p>
             </div>
           ) : (
             <div className="divide-y divide-slate-50">
                {reportedComments.map((comment) => (
                  <div key={comment.id} className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 hover:bg-rose-50/20 transition-all duration-500">
                     <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                           <p className="font-black text-slate-900 italic text-lg">{comment.userName}</p>
                           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic leading-none opacity-60">{comment.bragTitle}</span>
                        </div>
                        <p className="text-base font-medium text-slate-600 italic leading-relaxed">"{comment.text}"</p>
                        <div className="text-[10px] font-black text-rose-600 uppercase italic bg-rose-50 px-4 py-2 rounded-xl inline-block border border-rose-100">
                           Incident Type: {comment.reportReason || 'Unprofessional Conduct'}
                        </div>
                     </div>
                     <div className="flex gap-4 shrink-0">
                        <button onClick={() => onResolveComment(comment.bragId, comment.id)} className="px-8 py-4 bg-emerald-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all italic">Dismiss</button>
                        <button onClick={() => { if(window.confirm("Remove this comment?")) onDeleteComment(comment.bragId, comment.id) }} className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg italic">Remove</button>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default AdminShoutOutManagement;
