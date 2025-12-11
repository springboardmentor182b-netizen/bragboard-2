import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { Trophy } from "lucide-react";
import { Info} from "lucide-react";
import PageContainer from "../layout/PageContainer";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:8000/leaderboard");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
  <PageContainer>
    <div className="leaderboard-container">    
      <div className="leaderboard-header">
       <h1 className="welcome">Leaderboard</h1>
        <button className="information-btn">
         <Info size={20} />
         
        </button>
        </div> 

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {/* 🔥 PODIUM GOES HERE */}
          {users.length >= 3 && (
            <div className="podium">
              {/* 2nd Place */}
              <div className="podium-card second">
                <h3>{users[1].username}</h3>
                <p>{users[1].points} pts</p>
                <span>2nd Place</span>
              </div>

              {/* 1st Place */}
              <div className="podium-card first">
                <h3>{users[0].username}</h3>
                <p>{users[0].points} pts</p>
                <span>1st Place</span>
              </div>

              {/* 3rd Place */}
              <div className="podium-card third">
                <h3>{users[2].username}</h3>
                <p>{users[2].points} pts</p>
                <span>3rd Place</span>
              </div>
            </div>
          )}

          {/* 📌 TABLE BELOW PODIUM */}
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u.rank}</td>
                  <td>{u.username}</td>
                  <td>{u.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  </PageContainer>
);

};

export default Leaderboard;
