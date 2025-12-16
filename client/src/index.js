import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/global.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
.light {
  background-color: #ffffff;
  color: #000000;
  min-height: 100vh;
}

.dark {
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
}

