import React, { useEffect, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

const statusOptions = [
  { value: 'resolved', label: 'Resolve - Take action' },
  { value: 'dismissed', label: 'Dismiss - No action needed' },
];

const ResolveReportModal = ({ report, onCancel, onSubmit, isSubmitting }) => {
  const [status, setStatus] = useState(statusOptions[0].value);
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    setStatus(statusOptions[0].value);
    setResolutionNotes('');
  }, [report]);

  if (!report) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ status, resolutionNotes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3 text-white">
            <ShieldAlert className="text-amber-400" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Resolve Report</p>
              <p className="text-sm font-semibold">Report #{report.id}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close resolve dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form className="px-6 py-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Resolution</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    status === option.value
                      ? 'border-blue-500 bg-blue-500/5'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    value={option.value}
                    checked={status === option.value}
                    onChange={() => setStatus(option.value)}
                    className="mt-1 accent-blue-500"
                  />
                  <div>
                    <p className="text-sm text-white font-semibold capitalize">{option.value}</p>
                    <p className="text-xs text-gray-400">{option.label}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium" htmlFor="resolution-notes">
              Notes (optional)
            </label>
            <textarea
              id="resolution-notes"
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-800 bg-gray-950 text-gray-100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Document the action you took or why the report was dismissed."
            />
            <p className="text-xs text-gray-500">
              These notes are stored with the report for audit history.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save resolution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResolveReportModal;

