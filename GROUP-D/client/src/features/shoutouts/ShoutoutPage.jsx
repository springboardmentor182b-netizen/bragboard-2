import React, { useEffect, useState } from "react";
import ShoutoutCard from "./ShoutoutCard";
import { getShoutouts } from "./shoutout.api";
import ExportButtons from "./ExportButtons";
import { PageContainer } from "./ShoutoutPage.styles";

export default function ShoutoutPage() {
  const [shoutouts, setShoutouts] = useState([]);

  useEffect(() => {
    loadShoutouts();
  }, []);

  async function loadShoutouts() {
    const response = await getShoutouts();

    // Backend returns: { data: [...] }
    const data = response?.data ? response.data : response;

    setShoutouts(data || []);
  }

  return (
    <PageContainer>
      <h2 className="title">Shoutouts</h2>

      {/* Export buttons for CSV/PDF */}
      <ExportButtons />

      <div className="grid">
        {shoutouts.map((s) => (
          <ShoutoutCard key={s.id} data={s} />
        ))}
      </div>
    </PageContainer>
  );
}
