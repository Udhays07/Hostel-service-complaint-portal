# Hostel Complaint Portal Backend Documentation

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [How to Run Locally](#how-to-run-locally)
5. [Useful Concepts](#useful-concepts)
6. [Contributing](#contributing)

---

## Tech Stack

- **Python**: Programming language for backend development.
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python.
- **SQLAlchemy**: ORM (Object Relational Mapper) for database interactions.
- **SQLite**: Lightweight, file-based relational database.
- **Pydantic**: Data validation and settings management using Python type annotations.

---

## Project Structure

```
Backend/
├── app/               # Main application package
│   ├── api/           # API endpoint definitions
│   ├── models/        # SQLAlchemy ORM models
│   ├── schemas/       # Pydantic models for request/response
│   ├── db/            # Database session and config
│   ├── core/          # Core logic (auth, utils)
│   └── main.py        # FastAPI entry point
├── tests/             # Test cases
├── requirements.txt   # Python dependencies
└── README.md          # Documentation
```

---

## API Endpoints

### 1. **Authentication**

- **POST /api/register**  
    Register a new user.  
    **Body:**  
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "hostel": "string"
    }
    ```
    **Response:** Success message or error.

- **POST /api/login**  
    Login an existing user.  
    **Body:**  
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
    **Response:** JWT token or error.

---

### 2. **Complaints**

- **POST /api/complaints**  
    Create a new complaint.  
    **Headers:** `Authorization: Bearer <token>`  
    **Body:**  
    ```json
    {
      "title": "string",
      "description": "string",
      "category": "string"
    }
    ```
    **Response:** Complaint details or error.

- **GET /api/complaints**  
    Get all complaints (optionally filter by user or category).  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** List of complaints.

- **GET /api/complaints/{id}**  
    Get a specific complaint by ID.  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** Complaint details.

- **PUT /api/complaints/{id}**  
    Update a complaint (only by creator or admin).  
    **Headers:** `Authorization: Bearer <token>`  
    **Body:** Fields to update.  
    **Response:** Updated complaint or error.

- **DELETE /api/complaints/{id}**  
    Delete a complaint (only by creator or admin).  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** Success message or error.

---

### 3. **Admin**

- **GET /api/admin/complaints**  
    Get all complaints for admin review.  
    **Headers:** `Authorization: Bearer <admin-token>`  
    **Response:** List of complaints.

- **PUT /api/admin/complaints/{id}/status**  
    Update complaint status (e.g., resolved, pending).  
    **Headers:** `Authorization: Bearer <admin-token>`  
    **Body:**  
    ```json
    {
      "status": "string"
    }
    ```
    **Response:** Updated complaint.

---

## How to Run Locally

1. **Install Python 3.8+** on your machine.
2. **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd Backend
    ```
3. **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
4. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
5. **Configure environment variables** in a `.env` file:
    ```
    SECRET_KEY=<your-secret-key>
    ```
6. **Start the server**:
    ```bash
    uvicorn app.main:app --reload
    ```
7. The backend runs on `http://localhost:8000` by default.

---

## Useful Concepts

- **FastAPI**: Enables automatic generation of OpenAPI docs and fast development.
- **Pydantic Models**: Used for request validation and response serialization.
- **SQLAlchemy ORM**: Maps Python classes to database tables.
- **JWT Authentication**: Secures endpoints and manages user sessions.
- **Dependency Injection**: FastAPI's way to manage database sessions and authentication.

---

## Contributing

- Fork the repository and create a new branch for your changes.
- Make sure to write clear commit messages.
- Open a pull request with a description of your changes.

---

## Need Help?

If you are stuck, search for tutorials on FastAPI, SQLAlchemy, and Pydantic. The official documentation is very helpful!

---

**Happy Learning and Coding!**
