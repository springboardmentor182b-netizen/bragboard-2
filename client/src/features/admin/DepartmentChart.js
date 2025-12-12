import React, { useEffect, useState } from 'react';

export default function DepartmentChart() {
  const [data, setData] = useState({
    labels: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
    values: [340, 260, 210, 150, 120],
  });

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/department-stats');
        if (!res.ok) throw new Error('no chart');
        const json = await res.json();
        if (json.labels && json.values) setData(json);
      } catch {
        // keep fallback
      }
    };
    fetchChart();
  }, []);

  const max = Math.max(...data.values, 1);

  return (
    <div style={{ background: '#001F54', borderRadius: 12, padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: 600, color: 'white' }}>Shoutouts by Department</h3>
        <div style={{ fontSize: '0.85rem', color: '#9fb2d2' }}>This week</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 12 }}>
        {data.values.map((v, i) => {
          const heightPct = Math.round((v / max) * 100);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  height: `${Math.max(15, heightPct)}%`,
                  width: '100%',
                  maxWidth: 28,
                  borderRadius: 6,
                  background: 'linear-gradient(180deg, #22c1c3, #0f5ac2)',
                }}
                title={`${data.labels[i]}: ${v}`}
              />
              <div style={{ fontSize: '0.65rem', marginTop: 8, color: '#cfe7f6', textAlign: 'center' }}>
                {data.labels[i]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}