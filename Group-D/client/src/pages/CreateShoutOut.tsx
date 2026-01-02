
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, Icons } from '../constants';
import { analyzeSentiment, checkToxicContent } from '../services/gemini';
import { User, ShoutOut, UserRole } from '../types';

interface CreateShoutOutProps {
  user: User;
  users: User[];
  onAddBrag: (brag: ShoutOut) => void;
}

const CreateShoutOut: React.FC<CreateShoutOutProps> = ({ user, users, onAddBrag }) => {
  const navigate = useNavigate();
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ score: number; mood: string; summary: string } | null>(null);
  const [toxicity, setToxicity] = useState<{ isToxic: boolean; reason: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (message.length < 10) {
      setAiFeedback(null);
      setToxicity(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAnalyzing(true);
      const [sentiment, toxic] = await Promise.all([
        analyzeSentiment(message),
        checkToxicContent(message)
      ]);
      setAiFeedback(sentiment);
      setToxicity(toxic);
      setIsAnalyzing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [message]);

  const toggleRecipient = (id: string) => {
    setSelectedRecipientIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Strict role separation: Employees only recognize other Employees.
  // Admins or Super Admins cannot be tagged in peer-recognition feed.
  const filteredUsers = users.filter(u => 
    u.id !== user.id && 
    u.role === UserRole.EMPLOYEE && 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipientIds.length === 0 || !message || (toxicity && toxicity.isToxic)) return;

    setIsSubmitting(true);
    
    const recipients = users.filter(u => selectedRecipientIds.includes(u.id));

    const newBrag: ShoutOut = {
      id: Math.random().toString(36).substr(2, 9),
      fromId: user.id,
      fromName: user.name,
      toIds: recipients.map(r => r.id),
      toNames: recipients.map(r => r.name),
      message,
      category,
      timestamp: new Date(),
      reactions: {
        like: 0,
        clap: 0,
        star: 0
      },
      comments: [],
      sentimentScore: aiFeedback?.score || 50,
      mood: aiFeedback?.mood || 'Neutral'
    };

    setTimeout(() => {
      onAddBrag(newBrag);
      setIsSubmitting(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight">Publish a Brag</h1>
        <p className="text-slate-500 font-medium">Spotlight excellence and inspire the collective.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 italic">Who are you recognizing?</label>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search teammates..." 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                {filteredUsers.map(u => (
                  <label key={u.id} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl transition-all cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-50 transition-all cursor-pointer"
                      checked={selectedRecipientIds.includes(u.id)}
                      onChange={() => toggleRecipient(u.id)}
                    />
                    <img src={u.avatar} className="w-8 h-8 rounded-lg bg-white shadow-sm object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 italic truncate">{u.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{u.department}</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedRecipientIds.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedRecipientIds.map(id => {
                    const u = users.find(x => x.id === id);
                    return (
                      <span key={id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 italic">
                        {u?.name}
                        <button onClick={() => toggleRecipient(id)} className="hover:text-rose-500">×</button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 italic">Recognition Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all ${
                    category === cat.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' 
                    : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4 italic">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">The Message</label>
              {isAnalyzing && (
                <span className="text-[10px] font-black text-indigo-500 animate-pulse">AI VALIDATING...</span>
              )}
            </div>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full p-6 bg-slate-50 border-2 rounded-3xl font-medium focus:ring-4 outline-none transition-all resize-none italic ${
                toxicity?.isToxic ? 'border-rose-400 ring-rose-100' : 'border-slate-50 ring-indigo-50'
              }`}
              placeholder="What specifically did they do? Be descriptive..."
            />
            {toxicity?.isToxic && (
              <div className="mt-4 p-6 bg-rose-50 border border-rose-100 rounded-[1.5rem] animate-in slide-in-from-top-2">
                 <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest italic">Blocked by Safety Protocol</p>
                 <p className="text-sm text-rose-600 font-medium mt-1 italic leading-relaxed">"{toxicity.reason}"</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-5 text-slate-500 font-black uppercase tracking-widest rounded-3xl text-sm italic">Discard</button>
            <button 
              disabled={isSubmitting || !!toxicity?.isToxic || selectedRecipientIds.length === 0 || !message}
              className="flex-[2] py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all italic"
            >
              {isSubmitting ? 'Syncing...' : 'Deploy Recognition'}
            </button>
          </div>
        </form>

        <div className="hidden lg:block space-y-6">
           {aiFeedback && !toxicity?.isToxic && (
              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-3xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full -mr-24 -mt-24 blur-[80px]"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8 italic relative z-10">AI Behavioral Analysis</p>
                <div className="text-6xl font-black italic mb-8 tracking-tighter relative z-10">{aiFeedback.score}%</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 italic relative z-10">Cultural Impact Rating</p>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-sm font-medium leading-relaxed opacity-90 relative z-10 shadow-inner">
                   "{aiFeedback.summary}"
                </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CreateShoutOut;
