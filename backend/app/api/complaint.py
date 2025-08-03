from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.complaint import ComplaintCreate, ComplaintOut, ComplaintUpdate
from app.services import complaint_service
from app.database import get_db
from app.auth.jwt_handler import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=ComplaintOut)
async def create_complaint(
    complaint: ComplaintCreate, 
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return complaint_service.create_complaint(db, complaint, current_user.id)

@router.get("/", response_model=List[ComplaintOut])
async def get_complaints(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # For debugging
    print(f"User {current_user.id} requesting complaints")
    
    if current_user.role == "admin":
        return complaint_service.get_complaints(db)
    return complaint_service.get_user_complaints(db, current_user.id)

@router.get("/{complaint_id}", response_model=ComplaintOut)
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    complaint = complaint_service.get_complaint_by_id(db, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Check if user has permission to access this complaint
    if current_user.role != "admin" and complaint.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this complaint")
    
    return complaint

@router.put("/{complaint_id}", response_model=ComplaintOut)
def update_complaint(
    complaint_id: int,
    complaint_update: ComplaintUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get the complaint first
    complaint = complaint_service.get_complaint_by_id(db, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Check permissions
    if current_user.role != "admin" and complaint.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this complaint")
    
    # Students can only update their own complaints and cannot change status
    if current_user.role != "admin" and complaint_update.status is not None:
        raise HTTPException(status_code=403, detail="Students cannot update complaint status")
    
    updated_complaint = complaint_service.update_complaint(db, complaint_id, complaint_update)
    return updated_complaint

@router.delete("/{complaint_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get the complaint first
    complaint = complaint_service.get_complaint_by_id(db, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Only admin or the complaint creator can delete
    if current_user.role != "admin" and complaint.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this complaint")
    
    complaint_service.delete_complaint(db, complaint_id)
    return None