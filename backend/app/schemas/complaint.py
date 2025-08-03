from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class StatusEnum(str, Enum):
    Pending = "Pending"
    InProgress = "In Progress"
    Resolved = "Resolved"
    Rejected = "Rejected"

class ComplaintBase(BaseModel):
    category: str
    title: str
    description: Optional[str] = None

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintUpdate(BaseModel):
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[StatusEnum] = None

class ComplaintOut(ComplaintBase):
    id: int
    user_id: int
    status: StatusEnum
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True