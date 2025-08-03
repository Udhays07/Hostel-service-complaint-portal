from sqlalchemy import Column, Integer, String, Enum as SQLAEnum
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class HostelEnum(str, enum.Enum):
    Saffire = "Saffire"
    Emerald = "Emerald"
    Coral = "Coral"
    Diamond = "Diamond"
    Ruby = "Ruby"
    NewRuby = "New Ruby"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    roll_number = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="student")
    hostel_name = Column(SQLAEnum(HostelEnum), nullable=True)
    room_number = Column(String, nullable=True)
    
    # Add this relationship property to match the one in Complaint model
    complaints = relationship("Complaint", back_populates="user")
