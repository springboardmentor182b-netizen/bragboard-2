# BragBoard Comment API

This FastAPI service exposes endpoints for creating, editing, deleting, and
listing comments. Each comment is associated with a `post_id`. Data is stored
in a lightweight SQLite database that lives in `server/src/data/app.db`.

## Setup

```bash
cd server
python -m venv .venv
.venv\Scripts\activate         # PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run the server

```bash
uvicorn server.src.main:app --reload
```

## Available endpoints

- `POST /api/comments` — add a comment (requires `post_id`, `author`, `content`)
- `GET /api/comments` — list comments (use `?post_id=<id>` or `?author=<name>` to filter)
- `GET /api/comments/{id}` — fetch a single comment
- `PUT /api/comments/{id}` — update post_id, author, or content
- `DELETE /api/comments/{id}` — remove a comment

## Quick testing with HTTPie or curl

### Create a comment
```bash
http POST :8000/api/comments post_id:=1 author="Alice" content="First comment!"
```

### List all comments
```bash
http GET :8000/api/comments
```

### List comments for a specific post
```bash
http GET :8000/api/comments?post_id=1
```

### List comments by a specific author
```bash
http GET :8000/api/comments?author=Alice
```

### Get a specific comment
```bash
http GET :8000/api/comments/1
```

### Update a comment
```bash
http PUT :8000/api/comments/1 content="Updated comment" post_id:=2
```

### Delete a comment
```bash
http DELETE :8000/api/comments/1
```

## Testing with curl

### Create a comment
```bash
curl -X POST http://localhost:8000/api/comments -H "Content-Type: application/json" -d "{\"post_id\": 1, \"author\": \"Alice\", \"content\": \"First comment!\"}"
```

### List all comments
```bash
curl http://localhost:8000/api/comments
```

### List comments for a specific post
```bash
curl "http://localhost:8000/api/comments?post_id=1"
```

### Update a comment
```bash
curl -X PUT http://localhost:8000/api/comments/1 -H "Content-Type: application/json" -d "{\"content\": \"Updated comment\"}"
```

### Delete a comment
```bash
curl -X DELETE http://localhost:8000/api/comments/1
```

