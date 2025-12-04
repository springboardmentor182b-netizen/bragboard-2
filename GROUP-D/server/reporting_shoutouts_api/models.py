# Temporary in-memory database (list)
shoutouts_db = []

class ShoutoutModel:
    def __init__(self, id, employee_id, message, status="Pending"):
        self.id = id
        self.employee_id = employee_id
        self.message = message
        self.status = status
