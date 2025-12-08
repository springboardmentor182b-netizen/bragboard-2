// client/src/features/shoutouts/shoutout.api.js

const API = "http://localhost:8000/api";

export async function getShoutouts() {
  const res = await fetch(`${API}/shoutouts`);
  return await res.json();
}

export async function addReaction(id, reaction) {
  await fetch(`${API}/reactions/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reaction }),
  });
}
