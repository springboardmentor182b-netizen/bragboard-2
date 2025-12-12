import React, { useEffect, useState } from "react";
import ShoutoutCard from "./ShoutoutCard";
import { getShoutouts } from "./shoutout.api";
import ExportButtons from "./ExportButtons";     // ✅ Added
import { PageContainer } from "./ShoutoutPage.styles";

export default function ShoutoutPage() {
  const [shoutouts, setShoutouts] = useState([]);

  useEffect(() => {
    loadShoutouts();
  }, []);

  async function loadShoutouts() {
    const response = await getShoutouts();

    // Handle backend API structure correctly
    const data = response?.data || response;
    setShoutouts(data || []);
  }

  return (
    <PageContainer>
      <h2 className="title">Shoutouts</h2>

      {/* ✅ Export Buttons for CSV & PDF */}
      <ExportButtons />

      <div className="grid">
        {shoutouts.map((s) => (
          <ShoutoutCard key={s.id} data={s} />
        ))}
      </div>
    </PageContainer>
  );
}
