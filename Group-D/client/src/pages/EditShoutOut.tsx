
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { analyzeSentiment, checkToxicContent } from '../services/gemini';
import { ShoutOut } from '../types';

interface EditShoutOutProps {
  brags: ShoutOut[];
  onUpdateBrag: (id: string, message: string, category: string, sentiment: any) => void;
}

const EditShoutOut: React.FC<EditShoutOutProps> = ({ brags, onUpdateBrag }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const brag = brags.find(b => b.id === id);

  const [category, setCategory] = useState(brag?.category || CATEGORIES[0].id);
  const [message, setMessage] = useState(brag?.message || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);
  const [toxicity, setToxicity] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!brag) navigate('/');
  }, [brag, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brag || !message) return;

    setIsSubmitting(true);
    setIsAnalyzing(true);
    
    // Final check for toxicity
    const [sentiment, toxic] = await Promise.all([
      analyzeSentiment(message),
      checkToxicContent(message)
    ]);

    if (toxic.isToxic) {
      setToxicity(toxic);
      setIsSubmitting(false);
      setIsAnalyzing(false);
      return;
    }

    onUpdateBrag(brag.id, message, category, sentiment);
    setIsSubmitting(false);
    navigate('/');
  };

  if (!brag) return null;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 italic">Refine Your Brag</h1>
        {/* Fix: Use brag.toNames.join(', ') instead of deprecated brag.toName */}
        <p className="text-slate-500 font-medium">Updating recognition for <span className="text-indigo-600 font-bold">{brag.toNames.join(', ')}</span>.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Change Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all ${
                  category === cat.id 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Update Message</label>
            {isAnalyzing && <span className="text-[10px] font-black text-indigo-500 animate-pulse">AI VALIDATING...</span>}
          </div>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-6 bg-slate-50 border-2 rounded-3xl font-medium focus:ring-4 outline-none transition-all resize-none ${
              toxicity?.isToxic ? 'border-rose-400 ring-rose-100' : 'border-slate-100 ring-indigo-50'
            }`}
          />
          {toxicity?.isToxic && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
               <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Blocked by AI Filter</p>
               <p className="text-sm text-rose-600 font-medium mt-1">{toxicity.reason}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 py-5 text-slate-500 font-black uppercase tracking-widest rounded-3xl text-sm">Cancel</button>
          <button 
            disabled={isSubmitting || !message}
            className="flex-[2] py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all italic"
          >
            {isSubmitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShoutOut;
