import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

// Mock data for demonstration
const mockShoutouts = [
  {
    id: 1,
    message: "Arshit did such an amazing job creating all these designs!",
    recipient: "@arshitsaraff",
    category: "HR",
    timestamp: "2024-01-15"
  },
  {
    id: 2,
    message: "Pranjali did such an amazing job on her designs!",
    recipient: "@prajaliaivale",
    category: "HR",
    timestamp: "2024-01-14"
  },
  {
    id: 3,
    message: "Yeshwanath did such an amazing job creating the admin panel !",
    recipient: "@yeshwanath",
    category: "CyberSecurity",
    timestamp: "2024-01-13"
  }
];

const MyShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [filters, setFilters] = useState({
    HR: false,
    CyberSecurity: false,
    Deployment: false
  });

  useEffect(() => {
    // load shoutouts (mock for now)
    setShoutouts(mockShoutouts);

    // load initial filters from localStorage (so Sidebar and this page are in sync)
    const saved = localStorage.getItem("bragboard_filters");
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  // watch localStorage changes (if user toggles filters in sidebar)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "bragboard_filters") {
        const v = e.newValue ? JSON.parse(e.newValue) : null;
        if (v) setFilters(v);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filteredShoutouts = shoutouts.filter(shoutout => {
    const active = Object.keys(filters).filter(k => filters[k]);
    if (active.length === 0) return true;
    return active.includes(shoutout.category);
  });

  return (
    <main className="flex-1 p-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">My Shout-outs</h2>

        <div className="space-y-4">
          {filteredShoutouts.length > 0 ? (
            filteredShoutouts.map((shoutout) => (
              <div
                key={shoutout.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800 mb-2">{shoutout.message}</p>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 inline-block">
  {shoutout.recipient}
</span>

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No shout-outs match your filters</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyShoutouts;
