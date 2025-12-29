import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import Base, engine
from app.models import User, Shoutout, ShoutoutRecipient

# Drop all tables
print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)

# Create all tables with new schema
print("Creating all tables...")
Base.metadata.create_all(bind=engine)

print("✅ Database reset complete!")