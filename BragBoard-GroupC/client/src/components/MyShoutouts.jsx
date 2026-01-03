import React, { useEffect, useState } from "react";
import ShoutoutCard from "./ShoutoutCard";
import "../assets/global.css";

const MyShoutouts = ({ employeeId = 1 }) => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/shoutouts/sender/${employeeId}`);
        if (!res.ok) throw new Error("Failed to fetch shoutouts");
        const data = await res.json();
        setShoutouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoutouts();
  }, [employeeId]);

  if (loading) return <p>Loading your shoutouts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (shoutouts.length === 0) return <p>No shoutouts sent yet.</p>;

  return (
    <div className="section-content">
      <h1 className="text-2xl font-semibold mb-4">Your Shoutouts</h1>
      <div className="analytics-grid">
        {shoutouts.map((s) => (
          <ShoutoutCard key={s.id} shoutout={s} />
        ))}
      </div>
    </div>
  );
};

export default MyShoutouts;
