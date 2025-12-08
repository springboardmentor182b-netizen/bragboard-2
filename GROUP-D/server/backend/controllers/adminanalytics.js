exports.getAdminAnalytics = (req, res) => {
  const analyticsData = {
    totalUsers: 120,
    activeUsers: 95,
    newRegistrationsToday: 12,
    revenueToday: 4500,
    mostViewedFeature: "Dashboard",
    recentActivities: [
      "User John logged in",
      "Admin updated settings",
      "New user registered"
    ]
  };

  res.json({
    success: true,
    message: "Admin Analytics Fetched Successfully",
    data: analyticsData
  });
};
