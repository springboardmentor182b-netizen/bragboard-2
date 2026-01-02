
import React, { useState } from 'react';
import { ShoutOut, Comment } from '../types';

interface AdminModerationProps {
  brags: ShoutOut[];
  onDelete: (id: string) => void;
  onResolve: (id: string) => void;
  onDeleteComment: (bragId: string, commentId: string) => void;
  onResolveComment: (bragId: string, commentId: string) => void;
}

const AdminModeration: React.FC<AdminModerationProps> = ({ brags, onDelete, onResolve, onDeleteComment, onResolveComment }) => {
  const [activeView, setActiveView] = useState<'posts' | 'comments'>('posts');
  
  const reportedBrags = brags.filter(b => b.isReported);
  const reportedComments = brags.flatMap(b => 
    // Fix: Use b.toNames.join(', ') instead of deprecated b.toName
    b.comments.filter(c => c.isReported).map(c => ({ ...c, bragId: b.id, bragTitle: `To ${b.toNames.join(', ')} from ${b.fromName}` }))
  );

  const renderPostTable = (items: ShoutOut[]) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      {items.length === 0 ? (
        <div className="p-20 text-center space-y-4">
          <div className="text-5xl grayscale opacity-20">🛡️</div>
          <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No reported posts</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                <th className="px-10 py-5">Origin / Destination</th>
                <th className="px-10 py-5">Message Context</th>
                <th className="px-10 py-5">Safety Score</th>
                <th className="px-10 py-5 text-right">Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(brag => (
                <tr key={brag.id} className="hover:bg-rose-50/10 transition-colors">
                  <td className="px-10 py-6">
                     <div className="flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${brag.fromName}`} className="w-10 h-10 rounded-xl bg-slate-50 border border-white shadow-sm" alt="" />
                        <div>
                          <p className="font-black text-slate-900 text-sm italic">{brag.fromName}</p>
                          {/* Fix: Use brag.toNames.join(', ') instead of deprecated brag.toName */}
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-none">To {brag.toNames.join(', ')}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-6">
                     <div className="max-w-md">
                        <p className="text-sm font-bold text-slate-600 italic leading-relaxed line-clamp-2">"{brag.message}"</p>
                        <div className="mt-3 flex items-start gap-2 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                           <span className="text-[10px] shrink-0 mt-0.5">🚩</span>
                           <p className="text-[10px] font-black text-rose-700 leading-tight uppercase tracking-tight italic">Reason: {brag.reportReason || 'Unspecified'}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-6">
                     <span className="text-xs font-black text-slate-900 italic">{brag.sentimentScore}% Safety</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                     <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => onResolve(brag.id)}
                          className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-emerald-600 transition-all italic"
                        >
                           Resolve
                        </button>
                        <button 
                          onClick={() => { if(window.confirm("Delete this content?")) onDelete(brag.id) }} 
                          className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-sm italic"
                        >
                           Delete
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderCommentTable = (items: any[]) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      {items.length === 0 ? (
        <div className="p-20 text-center space-y-4">
          <div className="text-5xl grayscale opacity-20">💬</div>
          <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No reported comments</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                <th className="px-10 py-5">Author / Context</th>
                <th className="px-10 py-5">Comment Content</th>
                <th className="px-10 py-5 text-right">Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(comment => (
                <tr key={comment.id} className="hover:bg-rose-50/10 transition-colors">
                  <td className="px-10 py-6">
                     <div>
                        <p className="font-black text-slate-900 text-sm italic">{comment.userName}</p>
                        <p className="text-[10px] text-indigo-500 font-bold uppercase mt-1 leading-none">{comment.bragTitle}</p>
                     </div>
                  </td>
                  <td className="px-10 py-6">
                     <div className="max-w-md">
                        <p className="text-sm font-bold text-slate-600 italic leading-relaxed line-clamp-2">"{comment.text}"</p>
                        <div className="mt-3 flex items-start gap-2 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                           <p className="text-[10px] font-black text-rose-700 uppercase tracking-tight italic">Flagged: {comment.reportReason || 'Bad Content'}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                     <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => onResolveComment(comment.bragId, comment.id)}
                          className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-emerald-600 transition-all italic"
                        >
                           Resolve
                        </button>
                        <button 
                          onClick={() => { if(window.confirm("Permanently remove this comment?")) onDeleteComment(comment.bragId, comment.id) }} 
                          className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-sm italic"
                        >
                           Delete
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Safety & Moderation</h1>
          <p className="text-slate-500 font-medium">Manage reported content and ensure workplace professionality.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => setActiveView('posts')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'posts' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Posts ({reportedBrags.length})
          </button>
          <button 
            onClick={() => setActiveView('comments')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'comments' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Comments ({reportedComments.length})
          </button>
        </div>
      </header>

      {activeView === 'posts' ? renderPostTable(reportedBrags) : renderCommentTable(reportedComments)}
    </div>
  );
};

export default AdminModeration;
