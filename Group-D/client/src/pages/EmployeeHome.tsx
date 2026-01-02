
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icons, CATEGORIES } from '../constants';
import { ShoutOut, User, UserRole } from '../types';

interface EmployeeHomeProps {
  user: User;
  brags: ShoutOut[];
  users: User[];
  onReaction: (id: string, type: 'like' | 'clap' | 'star') => void;
  onComment: (id: string, text: string) => void;
  onReport: (id: string, reason: string) => void;
  onReportComment: (bragId: string, commentId: string, reason: string) => void;
}

const EmployeeHome: React.FC<EmployeeHomeProps> = ({ user, brags, users, onReaction, onComment, onReport, onReportComment }) => {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});

  const activeBrags = brags.filter(b => !b.isReported);
  const culturalNodes = users.filter(u => u.role === UserRole.EMPLOYEE).sort((a, b) => b.points - a.points);

  const submitComment = (id: string) => {
    if (!commentInput[id]?.trim()) return;
    onComment(id, commentInput[id]);
    setCommentInput(prev => ({ ...prev, [id]: '' }));
  };

  const handleReport = (id: string) => {
    const reason = window.prompt("Reason for report (Toxicity, Harassment, Inappropriate):");
    if (reason) {
      onReport(id, reason);
      alert("Post reported and hidden from your feed for review.");
    }
  };

  const handleReportComment = (bragId: string, commentId: string) => {
    const reason = window.prompt("Reason for report:");
    if (reason) {
      onReportComment(bragId, commentId, reason);
      alert("Comment reported and hidden for review.");
    }
  };

  const formatRecipients = (names: string[]) => {
    if (names.length <= 2) return names.join(' and ');
    return `${names[0]}, ${names[1]}, and ${names.length - 2} others`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-8 space-y-12">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 flex items-center gap-8 group">
          <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform shadow-inner shrink-0">✨</div>
          <NavLink to="/create-shoutout" className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-400 px-8 py-5 rounded-2xl text-left transition-all border border-slate-100 font-bold italic shadow-inner text-sm">
            Recognize a win... celebrate your team?
          </NavLink>
        </div>

        <div className="space-y-12">
          {activeBrags.length === 0 ? (
            <div className="bg-white p-24 rounded-[3.5rem] border-2 border-dashed border-slate-200 text-center space-y-8">
               <div className="text-8xl animate-bounce">🔭</div>
               <div className="space-y-3">
                 <p className="font-black text-slate-300 uppercase tracking-[0.4em] italic text-sm">Neural Void</p>
                 <p className="text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed italic">Be the first to ignite the feed with recognition.</p>
               </div>
               <NavLink to="/create-shoutout" className="inline-block px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-3xl shadow-indigo-200 hover:-translate-y-1 transition-transform italic">Start Tagging</NavLink>
            </div>
          ) : (
            activeBrags.map((post) => (
              <article key={post.id} className="bg-white rounded-[3.5rem] shadow-sm border border-slate-200 hover:shadow-3xl hover:shadow-indigo-500/5 transition-all group overflow-hidden">
                <div className="p-12 lg:p-14">
                  <header className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-6">
                      <div className="relative shrink-0">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.fromName}`} className="w-20 h-20 rounded-[2rem] bg-indigo-50 shadow-sm border-2 border-white object-cover" alt="" />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-xl border border-slate-100">
                          {CATEGORIES.find(c => c.id === post.category)?.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-xl leading-tight italic">
                          {post.fromName} <span className="font-normal text-slate-300 not-italic mx-1 opacity-60">celebrated</span> {formatRecipients(post.toNames)}
                        </h3>
                        <div className="flex items-center gap-3 mt-3">
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 italic">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                              {new Date(post.timestamp).toLocaleDateString([], { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                           </p>
                           {post.isEdited && <span className="text-[9px] font-bold text-slate-400 italic bg-slate-100 px-2 rounded-full uppercase">MODIFIED</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {post.fromId === user.id && (
                        <button onClick={() => navigate(`/edit-shoutout/${post.id}`)} className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                      )}
                      <button onClick={() => handleReport(post.id)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                        <Icons.Alert className="w-5 h-5" />
                      </button>
                    </div>
                  </header>

                  <p className="text-slate-800 text-3xl lg:text-4xl leading-snug mb-14 font-black italic tracking-tight px-2">
                    "{post.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-10">
                    <div className="flex bg-slate-50/50 p-2 rounded-[1.5rem] border border-slate-100 shadow-inner">
                      <button onClick={() => onReaction(post.id, 'like')} className="flex flex-col items-center px-6 py-2 hover:bg-white rounded-xl transition-all group/rx active:scale-90">
                        <span className="text-xl group-hover/rx:scale-125 transition-transform">❤️</span>
                        <span className="text-[10px] font-black text-slate-400 mt-1 italic">{post.reactions.like}</span>
                      </button>
                      <button onClick={() => onReaction(post.id, 'clap')} className="flex flex-col items-center px-6 py-2 hover:bg-white rounded-xl transition-all group/rx active:scale-90 border-x border-slate-200/40">
                        <span className="text-xl group-hover/rx:scale-125 transition-transform">👏</span>
                        <span className="text-[10px] font-black text-slate-400 mt-1 italic">{post.reactions.clap}</span>
                      </button>
                      <button onClick={() => onReaction(post.id, 'star')} className="flex flex-col items-center px-6 py-2 hover:bg-white rounded-xl transition-all group/rx active:scale-90">
                        <span className="text-xl group-hover/rx:scale-125 transition-transform">⭐</span>
                        <span className="text-[10px] font-black text-slate-400 mt-1 italic">{post.reactions.star}</span>
                      </button>
                    </div>

                    <div className="flex-1 text-right">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-8 py-3 rounded-full border border-indigo-100 shadow-sm italic">Mood: {post.mood}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/30 px-12 py-12 lg:px-14 border-t border-slate-100 space-y-10">
                  {post.comments.filter(c => !c.isReported).length > 0 && (
                    <div className="space-y-8">
                      {post.comments.map(c => !c.isReported && (
                        <div key={c.id} className="flex gap-5 items-start animate-in slide-in-from-left-2 duration-300">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-sm font-black text-indigo-500 shrink-0 italic">
                            {c.userName.charAt(0)}
                          </div>
                          <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 relative group/comment">
                             <div className="flex justify-between items-center mb-3">
                               <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{c.userName}</p>
                               <div className="flex items-center gap-4">
                                 <span className="text-[9px] font-bold text-slate-300 uppercase italic leading-none">{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                 <button onClick={() => handleReportComment(post.id, c.id)} className="opacity-0 group-hover/comment:opacity-100 transition-opacity text-slate-300 hover:text-rose-500 p-1">
                                   <Icons.Alert className="w-3 h-3" />
                                 </button>
                               </div>
                             </div>
                             <p className="text-sm text-slate-600 font-medium leading-relaxed italic">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-5 items-center bg-white p-2 rounded-[2rem] border border-slate-200 shadow-lg">
                    <input 
                      type="text" 
                      placeholder="Add to the celebration..."
                      className="flex-1 bg-transparent px-8 py-4 text-sm font-semibold outline-none placeholder:italic placeholder:text-slate-300"
                      value={commentInput[post.id] || ''}
                      onChange={(e) => setCommentInput(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && submitComment(post.id)}
                    />
                    <button 
                      onClick={() => submitComment(post.id)}
                      className="bg-indigo-600 text-white px-10 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95 shrink-0 italic"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-12">
        <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-3xl border border-indigo-400 group overflow-hidden relative">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-150 duration-1000"></div>
           <div className="flex justify-between items-start mb-12 relative">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-200 italic leading-none">Culture Core</p>
              <div className="text-5xl animate-pulse">💎</div>
           </div>
           <p className="text-4xl font-black italic leading-tight mb-14 relative tracking-tighter">
             Peer recognition <span className="text-indigo-200 underline decoration-indigo-300 underline-offset-8">amplifies momentum</span>.
           </p>
           <NavLink to="/create-shoutout" className="block w-full py-6 bg-white text-indigo-600 text-center rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 relative italic">New Recognition</NavLink>
        </div>

        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] italic">Top Culture Nodes</h2>
            <NavLink to="/leaderboard" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline italic">Ranks</NavLink>
          </div>
          <div className="space-y-10">
            {culturalNodes.slice(0, 5).map((user, i) => (
              <div key={user.id} className="flex items-center gap-6 group cursor-default">
                <span className="text-slate-200 font-black italic text-3xl w-10 transition-colors group-hover:text-indigo-100 shrink-0">#{i+1}</span>
                <img src={user.avatar} className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 transition-transform group-hover:scale-110 shadow-sm shrink-0 object-cover" alt="" />
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-black text-slate-800 italic leading-none truncate group-hover:text-indigo-600 transition-colors">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 truncate opacity-70 italic">{user.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
