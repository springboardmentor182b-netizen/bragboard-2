
import React, { useState, useRef } from 'react';
import { User, Challenge, UserRole } from '../types';

interface ChallengesProps {
  user: User;
  users: User[]; // Added users to props for assignment
  challenges: Challenge[];
  onCreateChallenge: (chal: Challenge) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ user, users, challenges, onCreateChallenge }) => {
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Creation State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reward, setReward] = useState('');
  const [goal, setGoal] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [missionImage, setMissionImage] = useState<string | undefined>(undefined);
  const [userSearch, setUserSearch] = useState('');

  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMissionImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleUserAssignment = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chal: Challenge = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      goal,
      reward,
      deadline,
      currentProgress: 0,
      isActive: true,
      assignedUserIds: selectedUserIds,
      image: missionImage
    };
    onCreateChallenge(chal);
    resetForm();
  };

  const resetForm = () => {
    setIsCreating(false);
    setTitle('');
    setDescription('');
    setDeadline('');
    setReward('');
    setGoal(1);
    setSelectedUserIds([]);
    setMissionImage(undefined);
  };

  const filteredEmployees = users.filter(u => 
    u.role === UserRole.EMPLOYEE && 
    u.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic mb-2 tracking-tighter">Engagement Quests</h1>
          <p className="text-slate-500 font-medium italic">Deploy high-impact missions to drive workspace performance.</p>
        </div>
        {isAdmin && !isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95 italic"
          >
            Deploy New Mission
          </button>
        )}
      </header>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl animate-in zoom-in-95 space-y-10">
          <div className="flex justify-between items-center">
             <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Mission Briefing Configuration</h3>
             <button type="button" onClick={resetForm} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors italic">Abort Mission</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Objective Title</label>
                  <input required placeholder="Target Objective..." className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none font-bold italic focus:border-indigo-100 transition-all" value={title} onChange={e => setTitle(e.target.value)} />
               </div>

               <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Mission Parameters (Short Description)</label>
                  <textarea required rows={4} placeholder="What needs to be achieved? Keep it concise." className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none font-medium italic focus:border-indigo-100 transition-all resize-none" value={description} onChange={e => setDescription(e.target.value)} />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Deadline (Last Date)</label>
                    <input required type="text" placeholder="e.g. Oct 31, 2025" className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none font-bold italic focus:border-indigo-100 transition-all" value={deadline} onChange={e => setDeadline(e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Prize Pool</label>
                    <input required placeholder="500 XP / Reward..." className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none font-bold italic focus:border-indigo-100 transition-all" value={reward} onChange={e => setReward(e.target.value)} />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Mission Asset (Optional Image)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all group overflow-hidden"
                  >
                    {missionImage ? (
                      <img src={missionImage} className="w-full h-full object-cover" alt="Mission Preview" />
                    ) : (
                      <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase italic">Click to Upload Briefing Image</p>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
               </div>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Assign Operatives ({selectedUserIds.length})</label>
                  <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-6 space-y-4">
                     <input 
                       type="text" 
                       placeholder="Search employees..." 
                       className="w-full px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none"
                       value={userSearch}
                       onChange={(e) => setUserSearch(e.target.value)}
                     />
                     <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                        {filteredEmployees.map(u => (
                          <label key={u.id} className="flex items-center gap-4 p-3 hover:bg-white rounded-2xl cursor-pointer transition-all border border-transparent hover:border-indigo-100">
                             <input 
                               type="checkbox" 
                               className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-50"
                               checked={selectedUserIds.includes(u.id)}
                               onChange={() => toggleUserAssignment(u.id)}
                             />
                             <img src={u.avatar} className="w-10 h-10 rounded-xl bg-white border border-slate-100" alt="" />
                             <div>
                                <p className="text-xs font-black text-slate-900 italic">{u.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{u.department}</p>
                             </div>
                          </label>
                        ))}
                     </div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 italic px-2">* Leaving empty targets the entire sector.</p>
               </div>

               <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-3xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 italic">Publish Mission to Board</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {challenges.length === 0 ? (
          <div className="md:col-span-2 p-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 text-center space-y-6">
             <div className="text-7xl opacity-10">🛰️</div>
             <div className="space-y-2">
                <p className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] italic">No active missions found</p>
                <p className="text-xs text-slate-400 italic font-medium">Platform orbit is clear. Stand by for future directives.</p>
             </div>
          </div>
        ) : (
          challenges.map(chal => (
            <div key={chal.id} className="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl transition-all group overflow-hidden">
               {chal.image && (
                 <div className="h-48 w-full overflow-hidden">
                    <img src={chal.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" alt="" />
                 </div>
               )}
               <div className="p-10 space-y-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">{chal.title}</h3>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 italic">Prize: {chal.reward}</p>
                     </div>
                     <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-4 py-2 rounded-full border border-rose-100 uppercase italic leading-none">{chal.deadline}</span>
                  </div>

                  <p className="text-slate-600 font-medium leading-relaxed italic text-sm">{chal.description}</p>

                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                        <span>Milestone Success</span>
                        <span>{Math.round((chal.currentProgress / (chal.goal || 1)) * 100)}%</span>
                     </div>
                     <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                        <div className="h-full bg-indigo-600 rounded-full shadow-lg" style={{ width: `${(chal.currentProgress / (chal.goal || 1)) * 100}%` }}></div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex justify-between items-center mt-auto">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Assigned Operatives</p>
                        <div className="flex -space-x-3">
                           {(!chal.assignedUserIds || chal.assignedUserIds.length === 0) ? (
                             <span className="text-[10px] font-black text-indigo-400 uppercase italic">Global Access</span>
                           ) : (
                             <>
                                {chal.assignedUserIds.slice(0, 4).map(uid => (
                                  <img key={uid} src={users.find(u => u.id === uid)?.avatar} className="w-10 h-10 rounded-xl border-4 border-white bg-slate-50 shadow-sm object-cover" alt="" />
                                ))}
                                {chal.assignedUserIds.length > 4 && (
                                  <div className="w-10 h-10 rounded-xl border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">+{chal.assignedUserIds.length - 4}</div>
                                )}
                             </>
                           )}
                        </div>
                     </div>
                     {!isAdmin && (
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all italic">Execute Task</button>
                     )}
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Challenges;
