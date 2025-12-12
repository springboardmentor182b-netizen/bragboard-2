const API = "http://localhost:8000/api";

export async function getShoutouts() {
  const res = await fetch(`${API}/shoutouts`);
  return await res.json();
}

export async function addReaction(shoutoutId, reactionType) {
  await fetch(`${API}/reactions/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shoutoutId,
      reactionType,
    }),
  });
}

export async function removeReaction(shoutoutId) {
  await fetch(`${API}/reactions/remove`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shoutoutId,
    }),
  });
}
