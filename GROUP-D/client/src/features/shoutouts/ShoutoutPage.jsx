// client/src/features/shoutouts/ShoutoutPage.jsx
import React, { useEffect, useState } from "react";
import ShoutoutCard from "./ShoutoutCard";
import { getShoutouts } from "./shoutout.api";
import { PageContainer } from "./ShoutoutPage.styles";

export default function ShoutoutPage() {
  const [shoutouts, setShoutouts] = useState([]);

  useEffect(() => {
    loadShoutouts();
  }, []);

  async function loadShoutouts() {
    const data = await getShoutouts();
    setShoutouts(data);
  }

  return (
    <PageContainer>
      <h2 className="title">Shoutouts</h2>

      <div className="grid">
        {shoutouts.map((s) => (
          <ShoutoutCard key={s.id} data={s} />
        ))}
      </div>
    </PageContainer>
  );
}
