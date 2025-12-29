Link for Figma Designs: https://www.figma.com/files/team/1570027860587485870/project/495965258/BragBoard-Group-C?fuid=1570017231882215916

How to Run Frontend(client) GroupC:-

1. cd BragBoard-GroupC
2. cd client
3. npm install
4. npm start
5. navigate to http://localhost:3000

How to Run Backend(server) GroupC:-

1. cd BragBoard-GroupC
2. cd server
3. python -m venv venv
4. venv\Scripts\activate (windows)
5. pip install fastapi uvicorn
6. inside server - mkdir app - cd app - create main.py
7. inside main.py 
from fastapi import FastAPI
app = FastAPI()

@app.get("/") def home(): return {"message": "Backend is running!"} 
8. run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload 
9. navigate to http://127.0.0.1:8000/