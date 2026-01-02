from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
from server import models, schemas, auth, database

app = FastAPI(title="BragBoard API")

# Create tables at application startup (automatic creation of server/bragboard.db)
@app.on_event("startup")
def on_startup():
    models.Base.metadata.create_all(bind=database.engine)

origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AUTH ---

@app.post("/auth/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Role validation
    if user.role == "ADMIN" and user.secret_code != "ADMIN123":
        raise HTTPException(status_code=403, detail="Invalid ADMIN secret code")
    if user.role == "SUPER_ADMIN" and user.secret_code != "SUPER123":
        raise HTTPException(status_code=403, detail="Invalid SUPER_ADMIN secret code")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        department=user.department,
        avatar_url=user.avatar_url,
        status="ACTIVE"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# --- USERS ---

@app.get("/users", response_model=List[schemas.UserOut])
def read_users(skip: int = 0, limit: int = 100, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# --- SHOUTOUTS ---

@app.post("/shoutouts", response_model=schemas.ShoutOutOut)
def create_shoutout(shoutout: schemas.ShoutOutCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    new_shoutout = models.ShoutOut(
        from_user_id=current_user.id,
        message=shoutout.message,
        category=shoutout.category,
        sentiment_score=None,
        mood=None
    )
    db.add(new_shoutout)
    db.flush()

    for recipient_id in shoutout.recipient_ids:
        if recipient_id == current_user.id:
            continue
        
        recipient_user = db.query(models.User).filter(models.User.id == recipient_id).first()
        if recipient_user:
            assoc = models.Recipient(shoutout_id=new_shoutout.id, user_id=recipient_id)
            db.add(assoc)
            
            recipient_user.points += 100
            t_rec = models.Transaction(
                user_id=recipient_id,
                points=100,
                reason=f"Received shoutout from {current_user.name}"
            )
            db.add(t_rec)

    current_user.points += 50
    t_sender = models.Transaction(
        user_id=current_user.id,
        points=50,
        reason="Sent a shoutout"
    )
    db.add(t_sender)
    
    db.commit()
    db.refresh(new_shoutout)
    return new_shoutout

@app.get("/shoutouts", response_model=List[schemas.ShoutOutOut])
def read_shoutouts(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.ShoutOut).offset(skip).limit(limit).all()

# --- ANNOUNCEMENTS ---

@app.post("/announcements", response_model=schemas.AnnouncementOut)
def create_announcement(announcement: schemas.AnnouncementCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    new_announcement = models.Announcement(**announcement.dict())
    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)
    return new_announcement

@app.get("/announcements", response_model=List[schemas.AnnouncementOut])
def read_announcements(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Announcement).offset(skip).limit(limit).all()

# --- CHALLENGES ---

@app.post("/challenges", response_model=schemas.ChallengeOut)
def create_challenge(challenge: schemas.ChallengeCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    new_challenge = models.Challenge(**challenge.dict())
    db.add(new_challenge)
    db.commit()
    db.refresh(new_challenge)
    return new_challenge

@app.get("/challenges", response_model=List[schemas.ChallengeOut])
def read_challenges(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Challenge).offset(skip).limit(limit).all()
