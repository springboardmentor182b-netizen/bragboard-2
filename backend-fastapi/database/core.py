from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("DATABASE_URL")
if not MONGO_URL:
    raise Exception("DATABASE_URL not found in .env")

client = MongoClient(MONGO_URL)

# extract DB name from URL
db_name = MONGO_URL.split("/")[-1].split("?")[0]
db = client[db_name]

users_collection = db["users"]
