import React, { useState } from "react";
import ShoutoutCard from "../components/Cards/ShoutoutCard";
import ReportShoutoutModal from "../components/Modals/ReportShoutoutModal";

function Shoutouts() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2>Shoutouts</h2>

      <ShoutoutCard onReport={() => setShowModal(true)} />

      {showModal && (
        <ReportShoutoutModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Shoutouts;
