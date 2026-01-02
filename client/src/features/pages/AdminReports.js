import React, { useState, useEffect } from 'react';
import { FileDown, FileText, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import AdminNavbar from '../admin/AdminNavbar';
import {
    DEFAULT_ADMIN_ID,
    fetchShoutoutReports,
    exportReports
} from '../admin/shoutoutReportsApi';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isExporting, setIsExporting] = useState(false);
    const [adminIdInput] = useState(DEFAULT_ADMIN_ID); // Could make editable if needed

    const loadReportHistory = async () => {
        setLoading(true);
        setError('');
        try {
            // In the reports history page, we likely want all reports regardless of status
            const data = await fetchShoutoutReports({ adminId: adminIdInput });
            setReports(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.message || 'Unable to load report history.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReportHistory();
    }, [adminIdInput]);

    const handleExport = async () => {
        setIsExporting(true);
        setError('');
        try {
            const blob = await exportReports('csv', adminIdInput);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `shoutout_reports_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err?.message || 'Failed to export reports.');
        } finally {
            setIsExporting(false);
        }
    };

    const formatDate = (value) => {
        if (!value) return '—';
        const date = new Date(value);
        return isNaN(date.getTime()) ? '—' : date.toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto p-6 md:p-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">System Reports</h1>
                        <p className="text-gray-400 mt-1">Access historical data and export reports for audit and compliance.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={loadReportHistory}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={isExporting || reports.length === 0}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                        >
                            {isExporting ? <Loader2 className="animate-spin" size={18} /> : <FileDown size={18} />}
                            Export CSV
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
                        <FileText size={20} className="text-blue-400" />
                        <h2 className="text-lg font-semibold text-white">Shoutout Report History</h2>
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs">
                            {reports.length} total entries
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-200">
                            <thead className="text-xs uppercase text-gray-400 bg-gray-950/50">
                                <tr className="border-b border-gray-800 text-left">
                                    <th className="py-4 px-6">ID</th>
                                    <th className="py-4 px-6">Reason</th>
                                    <th className="py-4 px-6">Reporter</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">Created</th>
                                    <th className="py-4 px-6">Resolved At</th>
                                    <th className="py-4 px-6">Resolution</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="py-20 text-center text-gray-500">
                                            <Loader2 className="animate-spin inline mr-2" size={20} />
                                            Loading history...
                                        </td>
                                    </tr>
                                ) : reports.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-20 text-center text-gray-500">
                                            No report history found.
                                        </td>
                                    </tr>
                                ) : (
                                    reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6 font-mono text-gray-400">#{report.id}</td>
                                            <td className="py-4 px-6">
                                                <span className="font-medium text-white">{report.reason}</span>
                                                {report.description && <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{report.description}</p>}
                                            </td>
                                            <td className="py-4 px-6 text-gray-300">{report.reporter_name}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider 
                          ${report.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                        report.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                            'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-400">{formatDate(report.created_at)}</td>
                                            <td className="py-4 px-6 text-gray-400">{formatDate(report.resolved_at)}</td>
                                            <td className="py-4 px-6 text-gray-400 italic">
                                                {report.resolution_notes || '—'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
