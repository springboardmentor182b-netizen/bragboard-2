
import React, { useState } from 'react';
import { User, Announcement, UserRole } from '../types';

interface AnnouncementsProps {
  user: User;
  announcements: Announcement[];
  onCreate: (ann: Announcement) => void;
  onReact: (id: string, emoji: string) => void;
  onComment: (id: string, text: string) => void;
}

const Announcements: React.FC<AnnouncementsProps> = ({ user, announcements, onCreate, onReact, onComment }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const isAdmin = user.role === UserRole.ADMIN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      author: user.name,
      timestamp: new Date(),
      reactions: [],
      comments: [],
      status: 'Published'
    };
    onCreate(newAnn);
    setIsCreating(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
       <header className="flex justify-between items-end">
         <div>
           <h1 className="text-3xl font-black text-slate-900 italic tracking-tight mb-2">Workspace Broadcasts</h1>
           <p className="text-slate-500 font-medium italic">Official comms and cultural updates for the organization.</p>
         </div>
         {isAdmin && (
           <button 
             onClick={() => setIsCreating(true)}
             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-xl transition-all italic"
           >
             Create Broadcast
           </button>
         )}
       </header>

       {isCreating && (
         <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3.5rem] shadow-2xl animate-in slide-in-from-top-4 space-y-8 border border-indigo-100">
           <div className="space-y-4">
             <input required placeholder="Broadcast Title" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none outline-none font-black italic text-lg" value={title} onChange={e => setTitle(e.target.value)} />
             <textarea required placeholder="Content details..." className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none outline-none font-bold h-48" value={content} onChange={e => setContent(e.target.value)} />
           </div>
           <div className="flex gap-4">
             <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100">Deploy Global Broadcast</button>
             <button type="button" onClick={() => setIsCreating(false)} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[11px]">Abort</button>
           </div>
         </form>
       )}

       <div className="space-y-10">
          {announcements.length === 0 ? (
            <div className="p-20 bg-white rounded-[3rem] text-center border border-slate-100">
               <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No active broadcasts found</p>
            </div>
          ) : (
            announcements.map(ann => (
              <article key={ann.id} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                 <header className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-5">
                       <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg italic font-black">📢</div>
                       <div>
                          <h3 className="text-2xl font-black text-slate-900 italic tracking-tight leading-none">{ann.title}</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Broadcasted {new Date(ann.timestamp).toLocaleDateString()} • by {ann.author}</p>
                       </div>
                    </div>
                 </header>

                 <div className="bg-slate-50/50 p-10 rounded-[2.5rem] mb-10 border border-slate-50">
                    <p className="text-slate-700 font-medium leading-relaxed italic text-lg line-clamp-6">{ann.content}</p>
                 </div>

                 <div className="flex flex-wrap gap-3 mb-10">
                    {['🔥', '❤️', '👏', '🚀', '⭐'].map(emoji => (
                      <button 
                        key={emoji}
                        onClick={() => onReact(ann.id, emoji)}
                        className={`px-5 py-2.5 rounded-full border border-slate-100 text-sm font-black transition-all hover:bg-white hover:scale-110 shadow-sm ${ann.reactions.find(r => r.emoji === emoji && r.users.includes(user.id)) ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50'}`}
                      >
                        {emoji} {ann.reactions.find(r => r.emoji === emoji)?.count || 0}
                      </button>
                    ))}
                 </div>

                 <div className="space-y-6 pt-10 border-t border-slate-50">
                    {ann.comments.map(c => (
                      <div key={c.id} className="flex gap-4 items-start">
                         <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-500 shadow-inner italic shrink-0">{c.userName.charAt(0)}</div>
                         <div className="flex-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                            <p className="text-[10px] font-black text-slate-900 italic">{c.userName}</p>
                            <p className="text-sm text-slate-600 font-medium mt-1 leading-relaxed">{c.text}</p>
                         </div>
                      </div>
                    ))}
                    <div className="flex gap-3">
                       <input 
                         placeholder="Reply to broadcast..." 
                         className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-50"
                         value={commentText[ann.id] || ''}
                         onChange={e => setCommentText({...commentText, [ann.id]: e.target.value})}
                         onKeyPress={e => e.key === 'Enter' && (onComment(ann.id, commentText[ann.id]), setCommentText({...commentText, [ann.id]: ''}))}
                       />
                       <button 
                         onClick={() => { onComment(ann.id, commentText[ann.id]); setCommentText({...commentText, [ann.id]: ''}); }}
                         className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-indigo-100"
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
  );
};

export default Announcements;
