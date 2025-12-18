import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import LeaderboardTable from "../components/LeaderboardTable";
import LeaderboardChart from "../components/LeaderboardChart";

export default function Leaderboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/leaderboard")
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-[var(--header-pink)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏆 Employee Leaderboard</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <LeaderboardChart
          data={employees}
          title="Weekly Performance"
        />
        <LeaderboardChart
          data={employees}
          title="Monthly Performance"
        />
      </div>

      {/* Table */}
      <LeaderboardTable employees={filtered} />
    </div>
  );
}
