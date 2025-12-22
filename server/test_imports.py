import sys
import os

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))

try:
    print("Testing src.database.core...")
    import src.database.core
    print("Testing src.entities.user...")
    import src.entities.user
    print("Testing src.entities.todo...")
    import src.entities.todo
    print("Testing src.entities.shoutout_report...")
    import src.entities.shoutout_report
    print("Testing src.todos.service...")
    import src.todos.service
    print("Testing src.todos.controller...")
    import src.todos.controller
    print("Testing src.main...")
    import src.main
    print("All imports successful!")
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
except SyntaxError as e:
    print(f"SyntaxError in {e.filename} at line {e.lineno}: {e.text}")
    sys.exit(1)
