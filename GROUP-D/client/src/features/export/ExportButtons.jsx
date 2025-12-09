import React from "react";
import { exportCSV, exportPDF } from "./export.api";
import { ButtonsContainer } from "./ShoutoutExport.styles";

const ExportButtons = () => {
  const handleCSV = async () => {
    await exportCSV();
  };

  const handlePDF = async () => {
    await exportPDF();
  };

  return (
    <ButtonsContainer>
      <button onClick={handleCSV} className="export-btn csv">
        Export CSV
      </button>

      <button onClick={handlePDF} className="export-btn pdf">
        Export PDF
      </button>
    </ButtonsContainer>
  );
};

export default ExportButtons;
