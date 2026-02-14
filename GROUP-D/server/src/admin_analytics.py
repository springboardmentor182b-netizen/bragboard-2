def get_admin_analytics():
    analytics_data = {
        "totalUsers": 120,
        "activeUsers": 95,
        "newRegistrationsToday": 12,
        "revenueToday": 4500,
        "mostViewedFeature": "Dashboard",
        "recentActivities": [
            "User John logged in",
            "Admin updated settings",
            "New user registered"
        ]
    }

    return {
        "success": True,
        "message": "Admin Analytics Fetched Successfully",
        "data": analytics_data
    }
