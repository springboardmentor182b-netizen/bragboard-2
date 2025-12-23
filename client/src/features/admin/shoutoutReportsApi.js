const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
export const DEFAULT_ADMIN_ID = Number(process.env.REACT_APP_ADMIN_ID) || 1;

const extractError = async (response) => {
  try {
    const data = await response.json();
    if (data?.detail) {
      return Array.isArray(data.detail)
        ? data.detail.map((item) => item.msg || item).join(', ')
        : data.detail;
    }
  } catch {
    /* ignore json parse issues */
  }
  return response.statusText || 'Request failed';
};

export async function fetchShoutoutReports({ adminId = DEFAULT_ADMIN_ID, status }) {
  const search = new URLSearchParams({ admin_id: adminId });
  if (status) {
    search.append('status', status);
  }

  const response = await fetch(`${API_BASE_URL}/api/shoutout-reports?${search.toString()}`);
  if (!response.ok) {
    throw new Error(await extractError(response));
  }

  return response.json();
}

export async function resolveShoutoutReport(
  reportId,
  { adminId = DEFAULT_ADMIN_ID, status, resolutionNotes }
) {
  const search = new URLSearchParams({ admin_id: adminId });
  const payload = {
    status: status?.toLowerCase(),
    resolution_notes: resolutionNotes || '',
  };

  const response = await fetch(
    `${API_BASE_URL}/api/shoutout-reports/${reportId}/resolve?${search.toString()}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(await extractError(response));
  }

  return response.json();
}

