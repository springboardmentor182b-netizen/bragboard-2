import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Unauthorized or token expired");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {user && <p>Logged in as {user.email}</p>}
    </div>
  );
}