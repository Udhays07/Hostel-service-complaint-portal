# add_admin.py
from app.database import get_db, engine
from sqlalchemy.orm import Session
from sqlalchemy import text

def add_admin_user():
    # Create a session
    db = Session(engine)
    
    try:
        # Check if admin already exists
        result = db.execute(text("SELECT * FROM users WHERE email = 'admin@example.com'")).fetchone()
        
        if result:
            print("Admin user already exists")
            return
        
        # Add admin user
        db.execute(text("""
        INSERT INTO users (name, email, roll_number, password_hash, role)
        VALUES ('Admin User', 'admin@example.com', 'ADMIN001', 
                '$2b$12$Qr8Tv0zOJVmhDfGa7V5SreJzJKrJ5Jp/nYbmQRrA1H1NDAnUreJsC', 'admin')
        """))
        
        db.commit()
        print("Admin user created successfully")
    except Exception as e:
        print(f"Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    add_admin_user()