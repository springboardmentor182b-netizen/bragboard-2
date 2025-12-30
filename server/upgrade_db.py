import sqlite3
from pathlib import Path

# Adjust path assuming we run from server/ dir
BASE_DIR = Path(".").resolve()
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "app.db"

def upgrade():
    print(f"Connecting to database at {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        print("Adding column parent_id to shoutout_comments...")
        # Simple add column. Constraints might depend on sqlite version but usually this works.
        cursor.execute("ALTER TABLE shoutout_comments ADD COLUMN parent_id INTEGER REFERENCES shoutout_comments(id) ON DELETE CASCADE")
        conn.commit()
        print("Success.")
    except Exception as e:
        print(f"Error (maybe column exists?): {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    upgrade()
