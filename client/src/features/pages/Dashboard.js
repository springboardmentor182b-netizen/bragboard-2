import React, { useState } from "react";
import axios from "axios";
import LeaderboardWidget from "../components/LeaderboardWidget";

export default function Dashboard() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleAddShoutout = async (e) => {
    e.preventDefault();
    if (!recipient || !message)
      return alert("Please fill all fields");

    try {
      const res = await axios.post("/api/shoutouts", { recipient, message });
      if (res.status === 201) {
        alert("Shoutout added!");
        setRecipient("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add shoutout");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Analytics, shoutouts, and BragBoard gamification.
        </p>
      </header>

      {/* Add Shoutout Form */}
      <div className="add-shoutout">
        <h2>Add Shoutout</h2>
        <form onSubmit={handleAddShoutout}>
          <input
            type="text"
            placeholder="Recipient Name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <textarea
            placeholder="Your shoutout message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Add Shoutout</button>
        </form>
      </div>

      {/* Widgets section */}
      <section className="widget-grid">
        {/* BragBoard Leaderboard */}
        <LeaderboardWidget />
      </section>

      {/* Existing dashboard content below */}
      {/* charts, stats, shoutouts list can stay here */}
    </div>
  );
}
