
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onUpdateProfile: (updatedUser: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name);
  const [avatarBase64, setAvatarBase64] = useState(user.avatar);
  const [hasChanges, setHasChanges] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setHasChanges(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const commitChanges = () => {
    const updated = {
      ...user,
      name: name,
      avatar: avatarBase64
    };
    onUpdateProfile(updated);
    setHasChanges(false);
    alert("Profile updated successfully from your local device.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <header>
        <h1 className="text-4xl font-black text-slate-900 italic mb-2 tracking-tighter">Workspace Preferences</h1>
        <p className="text-slate-500 font-medium italic">Configure your cultural identity and secure your node.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <div className="space-y-12">
           <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 italic">Avatar & Identity</h3>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="relative group shrink-0">
                    <img 
                      src={avatarBase64} 
                      className="w-32 h-32 rounded-[2.5rem] border-8 border-indigo-50 bg-slate-50 shadow-inner transition-transform group-hover:scale-105 object-cover" 
                      alt="Avatar Preview" 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all border-4 border-white"
                      title="Upload photo from disk"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xl font-black text-slate-900 italic mb-2">Local Upload Enabled</p>
                    <p className="text-sm text-slate-400 mb-6 font-medium italic">Select a photo from your laptop to customize your appearance.</p>
                    {hasChanges && (
                      <button 
                        onClick={commitChanges}
                        className="px-10 py-4 bg-indigo-600 text-white rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all italic shadow-2xl shadow-indigo-100"
                      >
                        Push Changes
                      </button>
                    )}
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-slate-50 pt-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-50 font-black text-slate-700 italic text-base outline-none focus:bg-white focus:border-indigo-100 transition-all" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Assigned Department</label>
                    <div className="w-full px-8 py-5 rounded-3xl bg-slate-100 border-2 border-slate-100 font-black text-slate-400 italic text-base cursor-not-allowed">
                       {user.department}
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                 <div className="text-center md:text-left space-y-3">
                    <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] italic">Cultural Footprint</h3>
                    <p className="text-3xl font-black italic tracking-tighter leading-none">Activity Hub</p>
                 </div>
                 <button 
                   onClick={() => navigate('/activity')}
                   className="px-12 py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-indigo-50 transition-all italic shadow-2xl active:scale-95"
                 >
                   View Timeline
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
