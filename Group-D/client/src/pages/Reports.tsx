
import React from 'react';
import { ShoutOut, User } from '../types';

interface ReportsProps {
  brags: ShoutOut[];
  users: User[];
}

const Reports: React.FC<ReportsProps> = ({ brags, users }) => {
  const downloadCSV = () => {
    const headers = ['ID', 'Sender', 'Recipient', 'Message', 'Category', 'Timestamp', 'Sentiment Score', 'Mood'];
    const rows = brags.map(b => [
      b.id, 
      b.fromName, 
      // Fix: Use b.toNames.join('; ') for CSV formatting
      `"${b.toNames.join('; ')}"`, 
      `"${b.message.replace(/"/g, '""')}"`, 
      b.category, 
      new Date(b.timestamp).toISOString(), 
      b.sentimentScore,
      b.mood
    ]);
    const content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bragboard_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20 print:p-0">
      {/* This style block ensures we have a clean print view for the PDF export */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          aside, header, footer, button, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print-area {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          .card-grid {
             display: block !important;
          }
          .card {
             break-inside: avoid;
             margin-bottom: 20px;
             border: 1px solid #e2e8f0 !important;
          }
        }
      `}} />

      <header className="flex justify-between items-end no-print">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter mb-2">Workspace Intelligence</h1>
          <p className="text-slate-500 font-medium italic">Generate high-fidelity organization reports for compliance and review.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={downloadCSV}
             className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 italic"
           >
             <span>📊</span> Export CSV
           </button>
           <button 
             onClick={handlePrintPDF}
             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 italic"
           >
             <span>📄</span> Download PDF
           </button>
        </div>
      </header>

      <div className="print-area">
        <div className="hidden print:block mb-10 border-b-4 border-indigo-600 pb-6">
           <h1 className="text-4xl font-black italic">BragBoard Executive Report</h1>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Generated on: {new Date().toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 card-grid mb-12">
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center card">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Total System Brags</p>
              <p className="text-5xl font-black text-indigo-600 italic tracking-tighter">{brags.length}</p>
           </div>
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center card">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Cultural Active Nodes</p>
              <p className="text-5xl font-black text-emerald-600 italic tracking-tighter">{users.length}</p>
           </div>
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center card">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Engagement Score</p>
              <p className="text-5xl font-black text-indigo-900 italic tracking-tighter">A+</p>
           </div>
        </div>

        <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group mb-12 card no-print">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-40 -mt-40 blur-[120px]"></div>
           <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-10 italic">Quarterly Interaction Mapping</h3>
           <div className="h-64 flex items-end justify-between gap-6 px-4 relative z-10">
              {[45, 62, 55, 89, 70, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group/bar">
                   <div 
                     className="w-full bg-white/10 rounded-t-2xl group-hover/bar:bg-indigo-500 transition-all duration-700 relative shadow-2xl"
                     style={{ height: `${h}%` }}
                   >
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-400 opacity-0 group-hover/bar:opacity-100 transition-all">
                        {h}%
                      </span>
                   </div>
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter italic">Phase {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden card">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Raw Activity Stream</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                  <th className="px-8 py-4">From</th>
                  <th className="px-8 py-4">To</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Sentiment</th>
                  <th className="px-8 py-4">Date</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {brags.slice(0, 15).map(b => (
                 <tr key={b.id}>
                    <td className="px-8 py-4 text-sm font-black italic">{b.fromName}</td>
                    {/* Fix: Use b.toNames.join(', ') instead of deprecated b.toName */}
                    <td className="px-8 py-4 text-sm font-black italic">{b.toNames.join(', ')}</td>
                    <td className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">{b.category}</td>
                    <td className="px-8 py-4 text-sm font-black text-indigo-600 italic">{b.sentimentScore}%</td>
                    <td className="px-8 py-4 text-[10px] text-slate-400">{new Date(b.timestamp).toLocaleDateString()}</td>
                 </tr>
               ))}
            </tbody>
          </table>
          {brags.length > 15 && (
            <div className="p-6 text-center text-[10px] text-slate-300 italic font-black uppercase tracking-widest">
              And {brags.length - 15} more records...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
