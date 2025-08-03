from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Request, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.user_service import get_user_by_id
import os
from dotenv import load_dotenv

load_dotenv()
# Use environment variable or fallback to a default (in development only!)
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "8610323391adsfsdfgfgfghjgjkjhlmnmnbhbhgvcfdxzsaqwsededrft9965472929")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise credentials_exception
    
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_id(db, user_id)
    if user is None:
        raise credentials_exception
    return user
