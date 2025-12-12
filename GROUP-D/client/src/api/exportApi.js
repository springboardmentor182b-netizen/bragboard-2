const API = "http://localhost:8000/api";   // <-- MUST include /api

export async function downloadCSV() {
  const res = await fetch(`${API}/export/csv`, {
    method: "GET",
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "shoutouts.csv";
  a.click();

  URL.revokeObjectURL(url);
}

export async function downloadPDF() {
  const res = await fetch(`${API}/export/pdf`, {
    method: "GET",
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "shoutouts.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
