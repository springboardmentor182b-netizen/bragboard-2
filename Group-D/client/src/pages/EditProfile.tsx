
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { DEPARTMENTS } from '../constants';

interface EditProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    department: user.department,
    avatar: user.avatar
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
    navigate('/profile');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Identity Settings</h1>
        <p className="text-slate-500 font-medium italic">Update your public presence within the BragBoard ecosystem.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group cursor-pointer">
             <img src={formData.avatar} className="w-32 h-32 rounded-[2.5rem] border-4 border-indigo-50 bg-slate-50 shadow-sm transition-transform group-hover:scale-105" alt="Preview" />
             <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">Change</div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-4 italic">Neural Avatar Node Active</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Display Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 italic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Professional Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 italic"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Department Unit</label>
            <select 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 italic appearance-none"
            >
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-8 flex gap-4">
           <button 
             type="button" 
             onClick={() => navigate('/profile')}
             className="flex-1 py-5 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-colors italic"
           >
             Discard Changes
           </button>
           <button 
             type="submit"
             className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0 italic"
           >
             Commit Profile Update
           </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
