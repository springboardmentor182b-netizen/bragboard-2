import downloadFile from "../../utils/downloadFile";

const API_URL = "http://localhost:8000/reports";

export const exportCSV = async () => {
  const response = await fetch(`${API_URL}/shoutouts/csv`, {
    method: "GET",
  });

  const blob = await response.blob();
  downloadFile(blob, "shoutouts.csv");
};

export const exportPDF = async () => {
  const response = await fetch(`${API_URL}/shoutouts/pdf`, {
    method: "GET",
  });

  const blob = await response.blob();
  downloadFile(blob, "shoutouts.pdf");
};
