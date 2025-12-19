from pydantic import BaseModel
from typing import List


class CountAnalytics(BaseModel):
    label: str
    count: int


class AnalyticsResponse(BaseModel):
    data: List[CountAnalytics]


class OverviewAnalytics(BaseModel):
    total_shoutouts: int
    total_reports: int
    resolved_reports: int
    pending_reports: int
    dismissed_reports: int


