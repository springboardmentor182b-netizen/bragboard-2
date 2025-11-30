// client/src/features/shoutouts/ShoutoutCard.jsx
import React from "react";
import ReactionButtons from "./ReactionButtons";
import ReactionDisplay from "./ReactionDisplay";

export default function ShoutoutCard({ data }) {
  return (
    <div className="card">
      <h3>{data.author_name}</h3>
      <p className="dept">Department: {data.department}</p>
      <p className="message">{data.message}</p>

      <ReactionDisplay reactions={data.reactions} />
      <ReactionButtons shoutoutId={data.id} />
    </div>
  );
}
