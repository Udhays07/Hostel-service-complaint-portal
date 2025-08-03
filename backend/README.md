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

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routing.
- **MongoDB**: NoSQL database to store complaints and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For user authentication.
- **bcrypt**: For password hashing.

---

## Project Structure

```
Backend/
├── controllers/      # Logic for handling requests
├── models/           # Database schemas
├── routes/           # API endpoint definitions
├── middleware/       # Authentication and other middlewares
├── config/           # Configuration files (DB, environment)
├── app.js            # Main application file
└── README.md         # Documentation
```

---

## API Endpoints

### 1. **Authentication**

- **POST /api/register**  
    Register a new user.  
    **Body:** `{ name, email, password, hostel }`  
    **Response:** Success message or error.

- **POST /api/login**  
    Login an existing user.  
    **Body:** `{ email, password }`  
    **Response:** JWT token or error.

---

### 2. **Complaints**

- **POST /api/complaints**  
    Create a new complaint.  
    **Headers:** `Authorization: Bearer <token>`  
    **Body:** `{ title, description, category }`  
    **Response:** Complaint details or error.

- **GET /api/complaints**  
    Get all complaints (optionally filter by user or category).  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** List of complaints.

- **GET /api/complaints/:id**  
    Get a specific complaint by ID.  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** Complaint details.

- **PUT /api/complaints/:id**  
    Update a complaint (only by creator or admin).  
    **Headers:** `Authorization: Bearer <token>`  
    **Body:** Fields to update.  
    **Response:** Updated complaint or error.

- **DELETE /api/complaints/:id**  
    Delete a complaint (only by creator or admin).  
    **Headers:** `Authorization: Bearer <token>`  
    **Response:** Success message or error.

---

### 3. **Admin**

- **GET /api/admin/complaints**  
    Get all complaints for admin review.  
    **Headers:** `Authorization: Bearer <admin-token>`  
    **Response:** List of complaints.

- **PUT /api/admin/complaints/:id/status**  
    Update complaint status (e.g., resolved, pending).  
    **Headers:** `Authorization: Bearer <admin-token>`  
    **Body:** `{ status }`  
    **Response:** Updated complaint.

---

## How to Run Locally

1. **Install Node.js and MongoDB** on your machine.
2. **Clone the repository**:
     ```bash
     git clone <repo-url>
     cd Backend
     ```
3. **Install dependencies**:
     ```bash
     npm install
     ```
4. **Configure environment variables** in a `.env` file:
     ```
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     ```
5. **Start the server**:
     ```bash
     npm start
     ```
6. The backend runs on `http://localhost:3000` by default.

---

## Useful Concepts

- **REST API**: A way for clients (like frontend apps) to communicate with the backend using HTTP methods (GET, POST, PUT, DELETE).
- **Authentication**: Ensures only registered users can access certain endpoints.
- **Middleware**: Functions that run before request handlers (e.g., checking authentication).
- **Database Models**: Define how data is stored and retrieved.

---

## Contributing

- Fork the repository and create a new branch for your changes.
- Make sure to write clear commit messages.
- Open a pull request with a description of your changes.

---

## Need Help?

If you are stuck, search for tutorials on Node.js, Express, and MongoDB. The official documentation is very helpful!

---

**Happy Learning and Coding!**
