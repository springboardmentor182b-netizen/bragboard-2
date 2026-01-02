import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserRole, UserRoleType } from '../types';
import { apiRequest } from '../services/api';

interface AuthProps {
  onLogin: (user: User) => void;
  users: User[];
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [role, setRole] = useState<UserRoleType>(UserRole.EMPLOYEE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // FastAPI traditionally expects form data for OAuth2 token requests
      const formData = new FormData();
      formData.append('username', email.trim());
      formData.append('password', password);
      formData.append('role', role);

      const response = await apiRequest('/auth/token', {
        method: 'POST',
        body: formData,
        useAuth: false // We don't have a token yet
      });

      localStorage.setItem('bb_access_token', response.access_token);
      localStorage.setItem('bb_refresh_token', response.refresh_token);

      // Fetch user profile after token is stored
      const userData = await apiRequest('/auth/me');
      onLogin(userData);
      navigate(userData.role === UserRole.EMPLOYEE ? '/' : '/admin/dashboard');
    } catch (err: any) {
      alert(err.message || "Auth Failure: Central node rejected credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          secret_code: secretCode || null
        }),
        useAuth: false
      });
      setIsSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Registry Fault: Application was rejected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="md:w-5/12 bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl font-black text-indigo-600 mb-8 shadow-2xl">BB</div>
            <h1 className="text-5xl font-black mb-6 italic tracking-tighter">BragBoard</h1>
            <p className="text-indigo-100 italic opacity-80 leading-relaxed uppercase text-[10px] tracking-widest">Database Persistence: Active</p>
          </div>
          <div className="relative z-10 text-[10px] font-bold italic text-indigo-200 border-t border-white/10 pt-8 uppercase tracking-widest">
            SQLite v3 Connection: Stable<br/>
            FastAPI Production Node
          </div>
        </div>

        <div className="md:w-7/12 p-10 lg:p-20 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="flex gap-4 mb-10 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
              <button 
                type="button"
                onClick={() => setIsLogin(true)} 
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}
              >
                Sync Node
              </button>
              <button 
                type="button"
                onClick={() => setIsLogin(false)} 
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}
              >
                Enroll Node
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center space-y-6 py-10">
                 <div className="text-6xl animate-bounce">📡</div>
                 <h2 className="text-2xl font-black italic text-slate-900 uppercase tracking-tighter">Identity Logged</h2>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed italic">The SQLite instance has recorded your application. Please stand by for Admin clearance.</p>
                 <button onClick={() => setIsLogin(true)} className="text-indigo-600 font-black uppercase text-xs">Return to Sync</button>
              </div>
            ) : (
              <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
                <div className="mb-6">
                  <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 italic">Auth Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[UserRole.EMPLOYEE, UserRole.ADMIN, UserRole.SUPER_ADMIN].map(r => (
                      <label key={r} className="cursor-pointer">
                        <input type="radio" name="role" className="sr-only peer" value={r} checked={role === r} onChange={() => setRole(r as UserRoleType)} />
                        <div className="py-2.5 text-center border-2 border-slate-50 rounded-xl peer-checked:border-indigo-600 peer-checked:bg-indigo-50 font-black text-[8px] uppercase tracking-widest text-slate-400 peer-checked:text-indigo-600 transition-all italic">
                          {r.split('_').join(' ')}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {!isLogin && (
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold italic" placeholder="Full Name" />
                )}
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold italic" placeholder="Auth Email" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold italic" placeholder="Passkey" />

                {role !== UserRole.EMPLOYEE && (
                  <div className="animate-in slide-in-from-top-2 pt-2">
                    <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1.5 italic">Clearance Secret</label>
                    <input type="password" required value={secretCode} onChange={(e) => setSecretCode(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/20 outline-none font-bold italic" placeholder="••••••••" />
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 mt-4 italic disabled:opacity-50"
                >
                  {loading ? 'Transmitting...' : (isLogin ? 'Establish Secure Sync' : 'Register Identity')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;