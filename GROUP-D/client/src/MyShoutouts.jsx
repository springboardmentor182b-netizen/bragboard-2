import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function MyShoutouts() {
  const [receivedShoutouts, setReceivedShoutouts] = useState([]);
  const [givenShoutouts, setGivenShoutouts] = useState([]);

  // Fetch shoutouts
  useEffect(() => {
    fetchReceivedShoutouts();
    fetchGivenShoutouts();
  }, []);

  const fetchReceivedShoutouts = async () => {
    try {
      const res = await fetch("http://localhost:8000/employee/shoutouts/received");
      const data = await res.json();
      setReceivedShoutouts(data.data);
    } catch (error) {
      console.error("Error fetching received shoutouts", error);
    }
  };

  const fetchGivenShoutouts = async () => {
    try {
      const res = await fetch("http://localhost:8000/employee/shoutouts/given");
      const data = await res.json();
      setGivenShoutouts(data.data);
    } catch (error) {
      console.error("Error fetching given shoutouts", error);
    }
  };

  const renderShoutoutCard = (s) => (
    <Card key={s.id} className="bg-rose-200 shadow rounded-2xl">
      <CardContent className="p-4">
        <div className="flex justify-between text-sm mb-2">
          <div className="font-semibold">{s.name}</div>
          <div>{s.date}</div>
        </div>

        {s.badge && (
          <div className="text-xs bg-rose-300 inline-block px-2 py-1 rounded-full mb-2">
            {s.badge}
          </div>
        )}

        {s.message && <div className="mb-2">Message: "{s.message}"</div>}
        {s.comment && <div className="mb-2">Comment: "{s.comment}"</div>}
        {s.post && (
          <div className="mb-2">
            <div>{s.tags}</div>
            <div className="mt-1">Post: "{s.post}"</div>
          </div>
        )}

        <div className="flex gap-4 text-sm mt-2">
          <div>❤️ {s.likes}</div>
          <div>💬 {s.comments}</div>
          {s.shares && <div>🔁 {s.shares}</div>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full min-h-screen bg-rose-100 p-6 flex flex-col">

      {/* Header */}
      <div className="text-2xl font-bold mb-1">My Shout-outs</div>
      <div className="text-sm mb-6">WEDNESDAY, 12 NOV 2025</div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow w-full">
          <Search className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <Button variant="outline" className="rounded-full">
          Reset Filters
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Button variant="outline" className="rounded-full w-full flex items-center gap-2">
          By Date <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full w-full flex items-center gap-2">
          By Month <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full w-full flex items-center gap-2">
          By Year <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full w-full flex items-center gap-2">
          All <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* GIVEN TO ME */}
      <h2 className="text-lg font-semibold mb-3">Shoutouts Given To Me</h2>
      <div className="flex flex-col gap-4 mb-8">
        {receivedShoutouts.length > 0 ? (
          receivedShoutouts.map(renderShoutoutCard)
        ) : (
          <p className="text-sm text-gray-600">No shoutouts received yet.</p>
        )}
      </div>

      {/* GIVEN BY ME */}
      <h2 className="text-lg font-semibold mb-3">Shoutouts Given By Me</h2>
      <div className="flex flex-col gap-4">
        {givenShoutouts.length > 0 ? (
          givenShoutouts.map(renderShoutoutCard)
        ) : (
          <p className="text-sm text-gray-600">No shoutouts given yet.</p>
        )}
      </div>

    </div>
  );
}

