import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  MessageSquareWarning,
  RotateCw,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const ADMIN_ID = process.env.REACT_APP_ADMIN_ID || 1;

const statusStyles = {
  pending: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
  resolved: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  dismissed: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
};

const statusLabel = {
  pending: 'Pending review',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

const StatusChip = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
  >
    {status === 'resolved' ? (
      <ShieldCheck size={14} />
    ) : status === 'dismissed' ? (
      <ShieldOff size={14} />
    ) : (
      <AlertTriangle size={14} />
    )}
    {statusLabel[status] || status}
  </span>
);

const formatDate = (value) => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString();
  } catch (e) {
    return value;
  }
};

function ShoutoutReports() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ admin_id: ADMIN_ID });
      const res = await fetch(`${API_BASE_URL}/api/shoutout-reports?${params.toString()}`);

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Failed to fetch reports');
      }

      const json = await res.json();
      setReports(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(err.message || 'Unable to load shoutout reports');
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const filteredReports = useMemo(() => {
    if (filter === 'all') return reports;
    return reports.filter((report) => report.status === filter);
  }, [filter, reports]);

  const summary = useMemo(
    () =>
      reports.reduce(
        (acc, report) => {
          const key = report.status || 'pending';
          acc.total += 1;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        { total: 0, pending: 0, resolved: 0, dismissed: 0 }
      ),
    [reports]
  );

  const resolveReport = async (reportId, status) => {
    const resolution_notes = window.prompt('Resolution notes (optional)', '') || undefined;
    setSavingId(reportId);
    setError(null);

    try {
      const params = new URLSearchParams({ admin_id: ADMIN_ID });
      const res = await fetch(
        `${API_BASE_URL}/api/shoutout-reports/${reportId}/resolve?${params.toString()}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, resolution_notes }),
        }
      );

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Failed to update report');
      }

      const updated = await res.json();
      setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err) {
      setError(err.message || 'Unable to update report');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 uppercase tracking-wide">
            <MessageSquareWarning size={18} />
            Shoutout Reports
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Review & resolve flagged shoutouts
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Live data from the moderation API. Actions call the backend resolver endpoint.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {['all', 'pending', 'resolved', 'dismissed'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'border-gray-800 text-gray-300 hover:border-gray-700'
              }`}
            >
              {key === 'all' ? 'All' : statusLabel[key]}
              <span className="ml-1 text-xs text-gray-400">
                {key === 'all' ? summary.total : summary[key] || 0}
              </span>
            </button>
          ))}

          <button
            onClick={fetchReports}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border border-gray-800 text-gray-200 hover:border-gray-700 transition-colors"
          >
            <RotateCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-amber-200">{summary.pending}</p>
          <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Resolved</p>
          <p className="text-2xl font-bold text-emerald-200">{summary.resolved}</p>
          <p className="text-xs text-gray-500 mt-1">Closed as addressed</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Dismissed</p>
          <p className="text-2xl font-bold text-rose-200">{summary.dismissed}</p>
          <p className="text-xs text-gray-500 mt-1">Closed without action</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-800">
        <div className="grid grid-cols-12 bg-gray-850 px-4 py-3 text-sm text-gray-400 uppercase tracking-wide">
          <span className="col-span-2">Report</span>
          <span className="col-span-3">Shoutout</span>
          <span className="col-span-2">Reporter</span>
          <span className="col-span-3">Reason</span>
          <span className="col-span-1">Status</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>
        <div className="divide-y divide-gray-800 bg-gray-900">
          {loading ? (
            <div className="px-4 py-8 text-center text-gray-300 flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Loading reports...
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No reports in this view.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-12 px-4 py-4 text-sm text-gray-200 gap-2"
              >
                <div className="col-span-2">
                  <p className="font-semibold text-white">Report #{report.id}</p>
                  <p className="text-gray-500 text-xs">Filed {formatDate(report.created_at)}</p>
                </div>

                <div className="col-span-3">
                  <p className="font-semibold">Shoutout #{report.shoutout_id}</p>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {report.shoutout_message || 'Message unavailable'}
                  </p>
                  {report.shoutout_sender_id && (
                    <p className="text-gray-500 text-xs mt-1">
                      From user ID {report.shoutout_sender_id}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <p className="font-semibold">{report.reporter_name || `User ${report.reporter_id}`}</p>
                  <p className="text-gray-500 text-xs">Reporter ID {report.reporter_id}</p>
                </div>

                <div className="col-span-3">
                  <p className="inline-flex px-2 py-1 rounded-md bg-gray-800 text-gray-100">
                    {report.reason}
                  </p>
                  {report.description && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {report.description}
                    </p>
                  )}
                  {report.resolution_notes && (
                    <p className="text-emerald-200 text-xs mt-2">
                      Notes: {report.resolution_notes}
                    </p>
                  )}
                </div>

                <div className="col-span-1 flex items-center">
                  <StatusChip status={report.status} />
                </div>

                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button
                    onClick={() => resolveReport(report.id, 'resolved')}
                    disabled={report.status !== 'pending' || savingId === report.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                      report.status === 'pending' && savingId !== report.id
                        ? 'bg-emerald-600/90 text-white border-emerald-500 hover:bg-emerald-500'
                        : 'bg-gray-800 text-gray-500 border-gray-800 cursor-not-allowed'
                    }`}
                  >
                    {savingId === report.id ? 'Saving...' : 'Resolve'}
                  </button>
                  <button
                    onClick={() => resolveReport(report.id, 'dismissed')}
                    disabled={report.status !== 'pending' || savingId === report.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                      report.status === 'pending' && savingId !== report.id
                        ? 'bg-rose-600/80 text-white border-rose-500 hover:bg-rose-500'
                        : 'bg-gray-800 text-gray-500 border-gray-800 cursor-not-allowed'
                    }`}
                  >
                    {savingId === report.id ? 'Saving...' : 'Dismiss'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ShoutoutReports;