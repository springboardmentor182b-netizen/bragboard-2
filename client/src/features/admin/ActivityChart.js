import React, { useEffect, useState } from 'react';

export default function ActivityChart() {
  const [data, setData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [12, 19, 9, 17, 23, 8, 14],
  });

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/weekly-activity');
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
        <h3 style={{ fontWeight: 600, color: 'white' }}>Weekly Activity</h3>
        <div style={{ fontSize: '0.85rem', color: '#9fb2d2' }}>Shoutouts</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 140, gap: 8 }}>
        {data.values.map((v, i) => {
          const heightPct = Math.round((v / max) * 100);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  height: `${Math.max(10, heightPct)}%`,
                  width: '100%',
                  maxWidth: 32,
                  borderRadius: 6,
                  background: 'linear-gradient(180deg, #1282A2, #034078)',
                }}
                title={`${data.labels[i]}: ${v}`}
              />
              <div style={{ fontSize: '0.7rem', marginTop: 8, color: '#cfe7f6' }}>{data.labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
