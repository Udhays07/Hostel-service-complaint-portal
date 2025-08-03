from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum as SQLAEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class StatusEnum(str, enum.Enum):
    Pending = "Pending"
    InProgress = "In Progress"
    Resolved = "Resolved"
    Rejected = "Rejected"

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    status = Column(SQLAEnum(StatusEnum), default=StatusEnum.Pending)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    user = relationship("User", back_populates="complaints")
