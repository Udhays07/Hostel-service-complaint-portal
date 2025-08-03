from sqlalchemy.orm import Session
from app.models.complaint import Complaint, StatusEnum
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate
from typing import List, Optional

def get_complaint_by_id(db: Session, complaint_id: int) -> Optional[Complaint]:
    return db.query(Complaint).filter(Complaint.id == complaint_id).first()

def get_complaints(db: Session, skip: int = 0, limit: int = 100) -> List[Complaint]:
    return db.query(Complaint).offset(skip).limit(limit).all()

def get_user_complaints(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Complaint]:
    return db.query(Complaint).filter(Complaint.user_id == user_id).offset(skip).limit(limit).all()

def create_complaint(db: Session, complaint: ComplaintCreate, user_id: int) -> Complaint:
    db_complaint = Complaint(
        user_id=user_id,
        category=complaint.category,
        title=complaint.title,
        description=complaint.description,
        status=StatusEnum.Pending
    )
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    return db_complaint

def update_complaint(db: Session, complaint_id: int, complaint_update: ComplaintUpdate) -> Optional[Complaint]:
    db_complaint = get_complaint_by_id(db, complaint_id)
    if not db_complaint:
        return None
    
    update_data = complaint_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_complaint, key, value)
    
    db.commit()
    db.refresh(db_complaint)
    return db_complaint

def delete_complaint(db: Session, complaint_id: int) -> bool:
    db_complaint = get_complaint_by_id(db, complaint_id)
    if not db_complaint:
        return False
    
    db.delete(db_complaint)
    db.commit()
    return True