// client/src/features/shoutouts/ShoutoutPage.styles.js
import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;

  .title {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .card {
    background: white;
    padding: 18px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .dept {
    font-size: 14px;
    color: gray;
  }

  .message {
    margin: 10px 0;
    font-size: 16px;
  }

  .reaction-display {
    margin-top: 10px;
  }

  .reaction-count {
    background: #eee;
    padding: 4px 8px;
    border-radius: 6px;
    margin-right: 6px;
  }

  .reaction-buttons button {
    margin-right: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
  }
`;
