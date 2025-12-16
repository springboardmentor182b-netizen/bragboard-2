import React from "react";
import Shoutouts from "./pages/Shoutouts";
import MyReportedShoutouts from "./pages/MyReportedShoutouts";

function App() {
  return (
    <div>
      <h1>Employee Shoutouts</h1>

      <Shoutouts />

      <hr />

      <MyReportedShoutouts />
    </div>
  );
}

export default App;

