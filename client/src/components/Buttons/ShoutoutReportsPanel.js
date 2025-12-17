import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

const ShoutoutReportsPanel = ({ onExport }) => {
  const [reportType, setReportType] = useState('shoutouts');
  const [format, setFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportClick = async () => {
    setIsExporting(true);
    try {
      
      await onExport(reportType, format);
    } catch (error) {
      console.error("Export UI Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mt-8">
      <h2 className="text-xl font-bold mb-4 text-white">Reports & Analytics Export</h2>
      
      <div className="flex flex-wrap items-center gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400 font-medium">Data Type</label>
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="shoutouts">All Shoutouts</option>
            <option value="users">User Activity</option>
            <option value="engagement">Engagement Metrics</option>
          </select>
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400 font-medium">Format</label>
          <select 
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="csv">CSV (Spreadsheet)</option>
            <option value="pdf">PDF (Document)</option>
            <option value="json">JSON (Data)</option>
          </select>
        </div>

        
        <button 
          onClick={handleExportClick}
          disabled={isExporting}
          className={`mt-6 flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg 
            ${isExporting 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-500 text-white active:scale-95 shadow-green-900/20'}`}
        >
          {isExporting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
          ) : (
            <FileText size={18} />
          )}
          {isExporting ? 'Generating...' : `Export ${reportType.toUpperCase()}`}
        </button>
      </div>
    </div>
  );
};

export default ShoutoutReportsPanel;