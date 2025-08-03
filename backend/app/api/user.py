from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.services import user_service
from app.auth.jwt_handler import create_access_token, get_current_user
from app.database import get_db

router = APIRouter()

# Fixed register endpoint - no unwanted parameters
@router.post("/register", response_model=UserOut)
async def register_user(
    user: UserCreate, 
    db: Session = Depends(get_db)
):
    if user_service.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if user_service.get_user_by_roll_number(db, user.roll_number):
        raise HTTPException(status_code=400, detail="Roll number already registered")
        
    return user_service.create_user(db, user)

@router.post("/login")
async def login_user(user: UserLogin, db: Session = Depends(get_db)):
    print(f"Login attempt: {user.email}")
    auth_user = user_service.authenticate_user(db, user.email, user.password)
    if not auth_user:
        print(f"Authentication failed for email: {user.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # If successful, log that too
    print(f"Login successful for: {auth_user.email}, role: {auth_user.role}")
    
    token = create_access_token({
        "sub": str(auth_user.id),
        "email": auth_user.email,
        "role": auth_user.role
    })
    
    return {"access_token": token, "token_type": "bearer", "role": auth_user.role}

@router.get("/me", response_model=UserOut)
async def get_me(current_user = Depends(get_current_user)):
    return current_user

@router.get("/all", response_model=list[UserOut])
def list_all_users(current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    return user_service.get_all_users(db)
