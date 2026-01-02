
import React from 'react';
import { User, Transaction } from '../types';

interface RewardsProps {
  user: User;
  transactions: Transaction[];
  onRedeem: (itemName: string, cost: number) => void;
}

const Rewards: React.FC<RewardsProps> = ({ user, transactions, onRedeem }) => {
  const storeItems = [
    { id: 1, name: 'Extra PTO Day', cost: 5000, icon: '🏝️', stock: 5 },
    { id: 2, name: 'Amazon Gift Card $50', cost: 2000, icon: '💳', stock: 12 },
    { id: 3, name: 'BragBoard Hoodie', cost: 1500, icon: '👕', stock: 8 },
    { id: 4, name: 'Coffee on the CEO', cost: 500, icon: '☕', stock: 99 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Rewards Store</h1>
          <p className="text-slate-500 font-medium">Redeem your hard-earned points for exclusive perks.</p>
        </div>
        <div className="bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
           <span className="text-3xl">💰</span>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Balance</p>
              <p className="text-2xl font-black text-indigo-600 italic tracking-tighter">{user.points.toLocaleString()} pts</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storeItems.map(item => (
          <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
             <div className="text-5xl mb-6 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:scale-110 transition-transform shadow-inner">{item.icon}</div>
             <h3 className="text-lg font-black text-slate-900 italic mb-1">{item.name}</h3>
             <p className="text-[10px] font-black text-slate-300 mb-6 uppercase tracking-widest">{item.stock} Units left</p>
             <button 
               onClick={() => onRedeem(item.name, item.cost)}
               disabled={user.points < item.cost}
               className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-95 ${
                 user.points >= item.cost 
                 ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' 
                 : 'bg-slate-100 text-slate-400 cursor-not-allowed'
               }`}
             >
               {user.points >= item.cost ? `Redeem • ${item.cost}` : 'Locked'}
             </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 italic">Your Redemptions</h3>
        {transactions.length === 0 ? (
          <p className="text-slate-300 font-black italic text-center py-12 text-sm uppercase tracking-widest">No transaction history found</p>
        ) : (
          <div className="divide-y divide-slate-50">
            {transactions.map(t => (
              <div key={t.id} className="py-5 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">🎁</div>
                  <div>
                    <p className="text-sm font-black text-slate-900 italic">{t.itemName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(t.timestamp).toLocaleDateString()} • System ID: {t.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-rose-500 italic">-{t.cost} pts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
