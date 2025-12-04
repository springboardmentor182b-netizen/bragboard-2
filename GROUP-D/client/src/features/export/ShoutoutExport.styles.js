import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;

  .export-btn {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 6px;
  }

  .csv {
    background-color: #4caf50;
    color: white;
  }

  .pdf {
    background-color: #f44336;
    color: white;
  }
`;
