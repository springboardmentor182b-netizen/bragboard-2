import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, ShieldAlert } from 'lucide-react';
import ResolveReportModal from './ResolveReportModal';
import {
  DEFAULT_ADMIN_ID,
  fetchShoutoutReports,
  resolveShoutoutReport,
  deleteShoutout,
} from './shoutoutReportsApi';

const statusClasses = {
  pending: 'text-amber-400 bg-amber-400/10 border border-amber-500/40',
  resolved: 'text-emerald-400 bg-emerald-400/10 border border-emerald-500/40',
  dismissed: 'text-slate-400 bg-slate-400/10 border border-slate-500/40',
};

const ShoutoutReportsPanel = () => {
  const [adminIdInput, setAdminIdInput] = useState(DEFAULT_ADMIN_ID);
  const [statusFilter, setStatusFilter] = useState('all');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isResolving, setIsResolving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // ID of shoutout being deleted

  const adminId = Number(adminIdInput) || DEFAULT_ADMIN_ID;

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchShoutoutReports({
        adminId,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchShoutoutReports failed:", err);
      setError(err?.message || 'Unable to load shoutout reports.');
    } finally {
      setLoading(false);
    }
  }, [adminId, statusFilter]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const pendingCount = useMemo(
    () => reports.filter((report) => report.status === 'pending').length,
    [reports]
  );

  const handleResolveSubmit = async ({ status, resolutionNotes }) => {
    if (!selectedReport) return;
    setIsResolving(true);
    setError('');
    try {
      const updated = await resolveShoutoutReport(selectedReport.id, {
        adminId,
        status,
        resolutionNotes,
      });
      setReports((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedReport(null);
    } catch (err) {
      setError(err?.message || 'Unable to resolve report.');
    } finally {
      setIsResolving(false);
    }
  };

  const handleDeleteShoutout = async (shoutoutId) => {
    if (!window.confirm('Are you sure you want to delete this shoutout post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(shoutoutId);
    setError('');
    try {
      await deleteShoutout(shoutoutId);
      // Refresh reports to show that shoutout message is gone or just general refresh
      await loadReports();
    } catch (err) {
      setError(err?.message || 'Unable to delete shoutout.');
    } finally {
      setIsDeleting(null);
    }
  };

  const renderStatusPill = (status) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1 ${statusClasses[status] || 'bg-gray-800 text-gray-300 border border-gray-700'
        }`}
    >
      {status === 'pending' ? (
        <ShieldAlert size={14} />
      ) : (
        <CheckCircle2 size={14} className="text-emerald-400" />
      )}
      {status}
    </span>
  );

  const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString();
  };

  return (
    <section className="mt-10 bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-5 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Shoutout Reports</h2>
            {pendingCount > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Review employee shoutout reports and resolve or dismiss them.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">Admin ID</label>
            <input
              type="number"
              value={adminIdInput}
              onChange={(e) => setAdminIdInput(e.target.value)}
              className="w-28 rounded-lg border border-gray-700 bg-gray-950 text-gray-100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              min="1"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-950 text-gray-100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <button
            onClick={loadReports}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="animate-spin mr-2" size={18} />
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-400">
            <ShieldAlert className="text-gray-500" size={32} />
            <p>No shoutout reports found for this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-200">
              <thead className="text-xs uppercase text-gray-400">
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 pr-4">Report</th>
                  <th className="text-left py-3 pr-4">Reason</th>
                  <th className="text-left py-3 pr-4">Reporter</th>
                  <th className="text-left py-3 pr-4">Shoutout</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Created</th>
                  <th className="text-left py-3 pr-4">Resolved</th>
                  <th className="text-left py-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-800 last:border-0 hover:bg-gray-900/60 transition-colors"
                  >
                    <td className="py-3 pr-4 text-gray-100 font-semibold">#{report.id}</td>
                    <td className="py-3 pr-4">
                      <div className="text-gray-100 font-medium">{report.reason}</div>
                      {report.description && (
                        <p className="text-xs text-gray-400 mt-1">{report.description}</p>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="text-gray-100">{report.reporter_name || 'Unknown'}</div>
                      <p className="text-xs text-gray-500">ID: {report.reporter_id}</p>
                    </td>
                    <td className="py-3 pr-4 max-w-xs">
                      <p className="text-gray-100">{report.shoutout_message || '—'}</p>
                      {report.shoutout_sender_id && (
                        <p className="text-xs text-gray-500 mt-1">
                          Sender ID: {report.shoutout_sender_id}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4">{renderStatusPill(report.status)}</td>
                    <td className="py-3 pr-4 text-gray-300">{formatDate(report.created_at)}</td>
                    <td className="py-3 pr-4 text-gray-300">
                      {report.resolved_at ? (
                        <div>
                          <p>{formatDate(report.resolved_at)}</p>
                          {report.resolver_name && (
                            <p className="text-xs text-gray-500 mt-1">
                              By {report.resolver_name}
                            </p>
                          )}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {report.status === 'pending' ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setSelectedReport(report)}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
                          >
                            Resolve
                          </button>
                          {report.shoutout_message && report.status === 'pending' && (
                            <button
                              onClick={() => handleDeleteShoutout(report.shoutout_id)}
                              disabled={isDeleting === report.shoutout_id}
                              className="px-3 py-2 rounded-lg bg-red-600/20 text-red-400 text-xs font-semibold hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                            >
                              {isDeleting === report.shoutout_id ? 'Deleting...' : 'Delete Post'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">
                          {report.resolution_notes || 'Resolved'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ResolveReportModal
        report={selectedReport}
        onCancel={() => setSelectedReport(null)}
        onSubmit={handleResolveSubmit}
        isSubmitting={isResolving}
      />
    </section>
  );
};

export default ShoutoutReportsPanel;

