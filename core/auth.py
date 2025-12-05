from fastapi import HTTPException

def get_current_user():
    class User:
        id = 1    # temporary user
    return User()
