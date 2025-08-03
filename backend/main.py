from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import user, complaint
from app.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hostel Complaint Portal API")

# Add CORS middleware FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router, prefix="/api/users", tags=["Users"])
app.include_router(complaint.router, prefix="/api/complaints", tags=["Complaints"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Hostel Complaint Portal API"}