const express = require("express");
const router = express.Router();

// Import controller
const { getAdminAnalytics } = require("../controllers/adminAnalytics");

// Route
router.get("/analytics", getAdminAnalytics);

// Add more routes later if needed
// router.post("/add-user", addUserFunction);

module.exports = router;
