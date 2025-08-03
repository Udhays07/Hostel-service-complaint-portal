from sqlalchemy.orm import Session
from app.models.user import User, HostelEnum
from app.schemas.user import UserCreate
from typing import Optional
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_roll_number(db: Session, roll_number: str) -> Optional[User]:
    return db.query(User).filter(User.roll_number == roll_number).first()

def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    
    # Convert string hostel_name to HostelEnum
    hostel_enum = None
    if user.hostel_name:
        for enum_item in HostelEnum:
            if enum_item.value == user.hostel_name:
                hostel_enum = enum_item
                break
    
    db_user = User(
        name=user.name,
        email=user.email,
        roll_number=user.roll_number,
        password_hash=hashed_password,
        role=user.role,
        hostel_name=hostel_enum,
        room_number=user.room_number
    )
    
    db.add(db_user)
    db.commit()  # Verify this is being called and not failing
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    
    # Ensure this is correctly verifying the password
    if not verify_password(password, user.password_hash):
        return False
    
    return user
