# Healthcare Management REST API

A clean, complete Healthcare Management REST API built using **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM**, secured with **JWT Authentication** and **bcrypt** password hashing.

> **Disclaimer:** This project was developed as a backend assignment with simulated test records. It is intended for educational demonstrations and is not certified for clinical HIPAA/GDPR compliance without formal regulatory certification.

---

## 1. Project Overview

The Healthcare Management API enables authenticated users (healthcare staff/practitioners) to:
- Securely register and log in to obtain signed JSON Web Tokens (JWT).
- Manage patient records with strict ownership controls (users can only access, update, and delete their own patients).
- Maintain a directory of medical doctors and specialists.
- Assign doctors to patients with duplicate prevention, query assignments, and delete mappings with ownership enforcement.

---

## 2. Technology Stack

- **Runtime:** Node.js (v18+)
- **Module System:** JavaScript ES Modules (`"type": "module"`)
- **Web Framework:** Express.js 4.x
- **Database:** PostgreSQL
- **ORM:** Sequelize 6.x (with `pg` and `pg-hstore`)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password Hashing:** `bcryptjs`
- **Request Validation:** `express-validator`
- **Security & Headers:** `helmet`, `cors`, and `express-rate-limit`
- **Environment Configuration:** `dotenv`
- **Development Tool:** `nodemon`
- **API Testing:** Postman-compatible endpoints (`postman_collection.json`)

---

## 3. Prerequisites

Before running the application locally, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- [npm](https://www.npmjs.com/) (version 9.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 14, 15, 16, or 17)
- [Postman](https://www.postman.com/) (for API testing)

---

## 4. Project Structure

```text
healthcare-backend/
├── src/
│   ├── config/
│   │   └── database.js          # PostgreSQL database connection & Sequelize instance
│   ├── controllers/
│   │   ├── authController.js     # User registration and login handlers
│   │   ├── patientController.js  # Patient CRUD with user ownership enforcement
│   │   ├── doctorController.js   # Doctor directory management
│   │   └── mappingController.js  # Patient-Doctor relationship management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token authentication
│   │   ├── validateRequest.js    # express-validator error formatting
│   │   └── errorHandler.js       # Centralized error & 404 route handlers
│   ├── models/
│   │   ├── index.js              # Model associations & exports
│   │   ├── User.js               # User model (hashed password, safe toJSON)
│   │   ├── Patient.js            # Patient model (belongs to User)
│   │   ├── Doctor.js             # Doctor model
│   │   └── PatientDoctor.js      # Patient-Doctor junction model (unique compound index)
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes (/api/auth)
│   │   ├── patientRoutes.js      # Protected patient routes (/api/patients)
│   │   ├── doctorRoutes.js       # Protected doctor routes (/api/doctors)
│   │   └── mappingRoutes.js      # Protected mapping routes (/api/mappings)
│   ├── validators/
│   │   ├── authValidators.js     # Request validation rules for auth
│   │   ├── patientValidators.js  # Request validation rules for patients
│   │   ├── doctorValidators.js   # Request validation rules for doctors
│   │   └── mappingValidators.js  # Request validation rules for mappings
│   ├── app.js                   # Express application setup & middleware
│   └── server.js                # Server entry point & DB synchronization
├── .env.example                 # Example environment variables template
├── .gitignore                   # Excludes .env and node_modules from Git
├── package.json                 # Project configuration and run scripts
├── postman_collection.json      # Complete Postman collection for all endpoints
└── README.md                    # Project documentation
```

---

## 5. PostgreSQL Database Creation

1. Ensure the PostgreSQL service is running on your machine:
   - **Windows:** Start the `postgresql-x64-XX` service via `Services.msc` or Services manager.
   - **Linux/macOS:** `sudo systemctl start postgresql` or `brew services start postgresql`.
2. Open your terminal or `psql` console:
   ```bash
   psql -U postgres
   ```
3. Create the database:
   ```sql
   CREATE DATABASE healthcare_db;
   ```

---

## 6. Environment Configuration

1. Copy `.env.example` to create your local `.env`:
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env

   # On macOS/Linux:
   cp .env.example .env
   ```
2. Open `.env` and fill in your PostgreSQL credentials:
   ```env
   PORT=5000
   NODE_ENV=development

   # PostgreSQL Credentials
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=healthcare_db
   DB_USER=postgres
   DB_PASSWORD=your_actual_postgres_password

   # JWT Secret Key
   JWT_SECRET=super_secret_healthcare_backend_jwt_key_2026_production_ready
   JWT_EXPIRES_IN=1d
   ```

---

## 7. Dependency Installation

Install all required dependencies:
```bash
npm install
```

---

## 8. Database Setup & Schema Initialization

The application initializes its schema automatically via Sequelize upon startup (`sequelize.sync()`).
When you start the server, Sequelize creates all tables (`users`, `patients`, `doctors`, `patient_doctors`) along with all foreign key constraints and unique indexes.

---

## 9. Starting the Development Server

To run the server with live reloading (via Nodemon):
```bash
npm run dev
```

To run in standard mode:
```bash
npm start
```

Once started, the console will confirm:
```text
===============================================
 Healthcare Backend Server is running on port 5000
 Environment: development
 Health check: http://localhost:5000/health
===============================================
```

---

## 10. API Endpoint Reference

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and obtain JWT token | No |

### Patient Management Endpoints (`/api/patients`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/patients` | Create a patient record | Yes (Bearer) |
| `GET` | `/api/patients` | List patients owned by current user | Yes (Bearer) |
| `GET` | `/api/patients/:id` | Get single patient (ownership enforced) | Yes (Bearer) |
| `PUT` | `/api/patients/:id` | Update patient record (ownership enforced) | Yes (Bearer) |
| `DELETE` | `/api/patients/:id` | Delete patient & cascade mappings | Yes (Bearer) |

### Doctor Management Endpoints (`/api/doctors`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/doctors` | Register a new doctor | Yes (Bearer) |
| `GET` | `/api/doctors` | List all registered doctors | Yes (Bearer) |
| `GET` | `/api/doctors/:id` | Get details of a specific doctor | Yes (Bearer) |
| `PUT` | `/api/doctors/:id` | Update doctor details | Yes (Bearer) |
| `DELETE` | `/api/doctors/:id` | Delete doctor & cascade mappings | Yes (Bearer) |

### Patient-Doctor Mapping Endpoints (`/api/mappings`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/mappings` | Assign a doctor to a patient | Yes (Bearer) |
| `GET` | `/api/mappings` | List mappings for current user's patients | Yes (Bearer) |
| `GET` | `/api/mappings/:patient_id` | List doctors assigned to a patient | Yes (Bearer) |
| `DELETE` | `/api/mappings/:id` | Remove a doctor assignment | Yes (Bearer) |

---

## 11. Example Request Bodies and Responses

### 1. Register User
`POST /api/auth/register`
```json
// Request Body
{
  "name": "Dr. Sarah Connor",
  "email": "sarah.connor@hospital.com",
  "password": "SecurePassword123!"
}

// Response (201 Created)
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Dr. Sarah Connor",
    "email": "sarah.connor@hospital.com",
    "createdAt": "2026-10-28T10:00:00.000Z"
  }
}
```

### 2. Login User
`POST /api/auth/login`
```json
// Request Body
{
  "email": "sarah.connor@hospital.com",
  "password": "SecurePassword123!"
}

// Response (200 OK)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Dr. Sarah Connor",
      "email": "sarah.connor@hospital.com"
    }
  }
}
```

### 3. Create Patient
`POST /api/patients`
`Authorization: Bearer <TOKEN>`
```json
// Request Body
{
  "name": "John Doe",
  "age": 35,
  "dateOfBirth": "1991-03-22",
  "gender": "Male",
  "contact": "+1-555-0123",
  "address": "742 Evergreen Terrace, Springfield"
}

// Response (201 Created)
{
  "success": true,
  "message": "Patient created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "age": 35,
    "dateOfBirth": "1991-03-22",
    "gender": "Male",
    "contact": "+1-555-0123",
    "address": "742 Evergreen Terrace, Springfield",
    "userId": 1,
    "createdAt": "2026-10-28T10:05:00.000Z"
  }
}
```

### 4. Create Doctor
`POST /api/doctors`
`Authorization: Bearer <TOKEN>`
```json
// Request Body
{
  "name": "Dr. Gregory House",
  "specialization": "Diagnostic Medicine",
  "email": "dr.house@clinic.org",
  "contact": "+1-555-4321",
  "address": "Department of Diagnostics, Clinic Tower 3"
}

// Response (201 Created)
{
  "success": true,
  "message": "Doctor created successfully",
  "data": {
    "id": 1,
    "name": "Dr. Gregory House",
    "specialization": "Diagnostic Medicine",
    "email": "dr.house@clinic.org",
    "contact": "+1-555-4321",
    "address": "Department of Diagnostics, Clinic Tower 3",
    "createdAt": "2026-10-28T10:10:00.000Z"
  }
}
```

### 5. Assign Doctor to Patient
`POST /api/mappings`
`Authorization: Bearer <TOKEN>`
```json
// Request Body
{
  "patient_id": 1,
  "doctor_id": 1
}

// Response (201 Created)
{
  "success": true,
  "message": "Doctor assigned to patient successfully",
  "data": {
    "id": 1,
    "patientId": 1,
    "doctorId": 1,
    "createdAt": "2026-10-28T10:15:00.000Z",
    "patient": {
      "id": 1,
      "name": "John Doe"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Gregory House",
      "specialization": "Diagnostic Medicine"
    }
  }
}
```

---

## 12. Authentication & Authorization Walkthrough

1. Send `POST /api/auth/register` with `name`, `email`, and `password`.
2. Send `POST /api/auth/login` with your credentials.
3. Copy the `token` string from `data.token`.
4. On all protected requests (`/api/patients`, `/api/doctors`, `/api/mappings`), supply the header:
   ```text
   Authorization: Bearer <YOUR_JWT_TOKEN>
   ```
5. If the token is missing, expired, or invalid, the API returns HTTP 401:
   ```json
   {
     "success": false,
     "message": "Invalid or expired token",
     "errors": []
   }
   ```

---

## 13. How to Import and Use the Postman Collection

A ready-to-use Postman collection is included in the project root: `postman_collection.json`.

1. Open **Postman**.
2. Click the **Import** button in the top-left corner.
3. Select or drag-and-drop `postman_collection.json`.
4. The imported collection **Healthcare Management REST API** contains preconfigured requests for all endpoints with sample JSON request bodies.
5. In collection variables, `baseUrl` is preset to `http://localhost:5000`.
6. Run the **Login User** request. An automated collection test script extracts `data.token` and stores it into the collection variable `authToken`.
7. All subsequent protected requests automatically use `Authorization: Bearer {{authToken}}`.

---

## 14. API Testing with Postman

You can test the entire workflow systematically using the Postman collection:

1. **Test Registration:**
   - Call `POST /api/auth/register`. A new user is created and returned without password hash (HTTP 201).
   - Call `POST /api/auth/register` again with the same email. It returns HTTP 409 Conflict.
2. **Test Login:**
   - Call `POST /api/auth/login` with wrong password. It returns HTTP 401 Unauthorized.
   - Call `POST /api/auth/login` with correct credentials. It returns HTTP 200 with JWT token.
3. **Test Patient Management & Ownership:**
   - Call `POST /api/patients` to create a patient.
   - Call `GET /api/patients` to verify the patient is listed.
   - Register and login as a second user (User B). User B calling `GET /api/patients` will see an empty list, and calling `GET /api/patients/1` will receive HTTP 404 (ownership enforced).
4. **Test Doctor Management:**
   - Call `POST /api/doctors` to create a doctor.
   - Call `GET /api/doctors` to list all doctors.
   - Call `PUT /api/doctors/:id` to update doctor specialization.
5. **Test Patient-Doctor Mapping:**
   - Call `POST /api/mappings` with `{ "patient_id": 1, "doctor_id": 1 }`. Assignment is created (HTTP 201).
   - Call `POST /api/mappings` again with identical IDs. It returns HTTP 409 (duplicate assignment prevented).
   - Call `GET /api/mappings` to list current mappings with joined patient and doctor details.
   - Call `GET /api/mappings/:patient_id` to get all doctors assigned to that patient.
   - Call `DELETE /api/mappings/:id` to remove the assignment.

---

## 15. Common Errors & Troubleshooting

1. **`ConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:5432`**
   - Cause: PostgreSQL service is stopped or listening on another port.
   - Solution: Start the PostgreSQL service (`postgresql-x64-XX` in Windows Services, or `sudo service postgresql start` on Linux) and verify `DB_PORT` in `.env`.
2. **`password authentication failed for user "postgres"`**
   - Cause: Incorrect database password in `.env`.
   - Solution: Set `DB_PASSWORD` in `.env` to match your local PostgreSQL password.
3. **`database "healthcare_db" does not exist`**
   - Cause: Database has not yet been created in PostgreSQL.
   - Solution: Run `CREATE DATABASE healthcare_db;` in `psql`.
4. **`Email is already registered` (HTTP 409)**
   - Cause: Attempted to register with an email already taken.
   - Solution: Use a unique email or log in with the existing account.
5. **`Patient not found or not accessible` (HTTP 404)**
   - Cause: The requested patient record does not exist or was created by a different user.
   - Solution: Verify that the Bearer token belongs to the user who created the patient.
