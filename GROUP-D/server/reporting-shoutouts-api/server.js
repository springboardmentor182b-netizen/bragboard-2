const express = require("express");
const app = express();

app.use(express.json());

// Store shoutouts here
let shoutouts = [];

// POST: Employee reports a shoutout
app.post("/report", (req, res) => {
  const newReport = {
    id: shoutouts.length + 1,
    employeeId: req.body.employeeId,
    message: req.body.message,
    status: "Pending"
  };
  shoutouts.push(newReport);
  res.json({ message: "Report submitted", report: newReport });
});

// Emp view his reports
app.get("/my-reports", (req, res) => {
  res.json(shoutouts);
});

// Admin view all
app.get("/admin/reports", (req, res) => {
  res.json(shoutouts);
});

// Admin resolve
app.put("/admin/resolve/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const report = shoutouts.find(r => r.id === id);
  if (!report) return res.status(404).send("Not found");
  report.status = "Resolved";
  res.json(report);
});

// Test route (for you only)
app.get("/test-post", (req, res) => {
  shoutouts.push({
    id: shoutouts.length + 1,
    employeeId: 101,
    message: "This is a test shoutout",
    status: "Pending"
  });

  res.send("Test shoutout added!");
});

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
