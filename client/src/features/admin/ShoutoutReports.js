import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw, ShieldCheck, Ban, Loader2 } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const STATUS_STYLES = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  resolved: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  dismissed: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
};

const humanizeStatus = (value) => {
  const text = (value || '').toString();
  if (!text) return 'Pending';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const ShoutoutReports = () => {
  const [adminId, setAdminId] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resolvingId, setResolvingId] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState({});

  const isAdminIdValid = useMemo(() => Number.isInteger(Number(adminId)) && Number(adminId) > 0, [adminId]);

  const fetchReports = async () => {
    if (!isAdminIdValid) {
      setError('Enter a valid admin ID to view reports.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({ admin_id: adminId });
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await fetch(`${API_BASE_URL}/api/shoutout-reports?${params.toString()}`);
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Unable to load reports.');
      }

      const data = await response.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId, statusFilter]);

  const formatDate = (value) => {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const handleResolve = async (reportId, targetStatus) => {
    if (!isAdminIdValid) {
      setError('Enter a valid admin ID before resolving.');
      return;
    }

    setResolvingId(reportId);
    setError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/shoutout-reports/${reportId}/resolve?admin_id=${adminId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: targetStatus,
            resolution_notes: resolutionNotes[reportId] || undefined,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Unable to resolve report.');
      }

      const updated = await response.json();
      setReports((prev) => prev.map((report) => (report.id === reportId ? updated : report)));
    } catch (err) {
      setError(err.message || 'Failed to resolve report.');
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/10 mt-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-semibold text-white">Shoutout Reports</h2>
          <p className="text-sm text-gray-400">
            Review flagged shoutouts and resolve them as an admin.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="adminId" className="text-sm text-gray-400">
              Admin ID
            </label>
            <input
              id="adminId"
              type="number"
              min="1"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value ? Number(e.target.value) : '')}
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>

          <button
            type="button"
            onClick={fetchReports}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 py-3 bg-rose-500/10 border-b border-rose-500/30 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="divide-y divide-gray-800">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading reports...
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-400">
            No shoutout reports found for this filter.
          </div>
        )}

        {!loading &&
          reports.map((report) => {
            const status = (report.status || 'pending').toLowerCase();
            const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;

            return (
              <div key={report.id} className="p-6 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyle}`}
                    >
                      {humanizeStatus(status)}
                    </span>
                    <span className="text-sm text-gray-400">
                      Reported by <span className="text-white font-medium">{report.reporter_name || `User ${report.reporter_id}`}</span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Created {formatDate(report.created_at)}
                  </span>
                </div>

                <div className="bg-gray-800/50 border border-gray-800 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{report.reason}</h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {report.description || 'No additional details provided.'}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>Shoutout ID: <span className="text-gray-300">{report.shoutout_id}</span></div>
                      {report.shoutout_sender_id && (
                        <div>Sender ID: <span className="text-gray-300">{report.shoutout_sender_id}</span></div>
                      )}
                    </div>
                  </div>

                  {report.shoutout_message && (
                    <div className="mt-3 p-3 bg-gray-900 border border-gray-800 rounded-md text-sm text-gray-200">
                      “{report.shoutout_message}”
                    </div>
                  )}
                </div>

                {status !== 'pending' ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Resolved by {report.resolver_name || `Admin ${report.resolved_by || ''}`}{' '}
                      on {formatDate(report.resolved_at)}
                    </div>
                    {report.resolution_notes && (
                      <div className="bg-gray-800/60 border border-gray-800 rounded-md px-3 py-2 text-gray-200">
                        Notes: {report.resolution_notes}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <label className="text-sm text-gray-400">
                      Resolution notes (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={resolutionNotes[report.id] || ''}
                      onChange={(e) =>
                        setResolutionNotes((prev) => ({ ...prev, [report.id]: e.target.value }))
                      }
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add context for your decision..."
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={resolvingId === report.id}
                        onClick={() => handleResolve(report.id, 'resolved')}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {resolvingId === report.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                        Mark as Resolved
                      </button>
                      <button
                        type="button"
                        disabled={resolvingId === report.id}
                        onClick={() => handleResolve(report.id, 'dismissed')}
                        className="inline-flex items-center gap-2 bg-rose-600/90 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {resolvingId === report.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Ban className="w-4 h-4" />
                        )}
                        Dismiss Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShoutoutReports;

