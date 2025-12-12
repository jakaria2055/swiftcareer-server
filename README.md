````markdown
# SwiftCareer Server

**SwiftCareer Server** is the backend for SwiftCareer, a modern job portal platform.
 It allows users to register, login, apply for jobs, manage companies, post jobs, and handle applications.
The backend is built with **Node.js**, **Express**, **MongoDB**, and supports JWT authentication and file uploads.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [API Routes](#api-routes)  
  - [User Routes](#user-routes)  
  - [Company Routes](#company-routes)  
  - [Job Routes](#job-routes)  
  - [Application Routes](#application-routes)  
- [Middleware](#middleware)  
- [Deployment](#deployment)  
- [License](#license)  
- [Author](#author)

---

## Features

- User registration, login, and logout with JWT authentication.  
- User profile update with image/file upload.  
- Company registration and management.  
- Job posting, retrieval, and filtering by company.  
- Job application management with status updates.  
- Secure CORS configuration for frontend integration.  
- Compatible with local development and Vercel serverless deployment.  

---

## Technologies Used

- **Node.js** (v20.x)  
- **Express.js** (v5.x)  
- **MongoDB** with **Mongoose**  
- **JWT** for authentication  
- **bcryptjs** for password hashing  
- **Multer** for file uploads  
- **Cloudinary** for storing uploaded files  
- **CORS** for cross-origin requests  
- **dotenv** for environment variables  

---

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/swiftcareer-server.git
cd swiftcareer-server
````

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file** in the root directory (see [Environment Variables](#environment-variables)).

4. **Run the server locally:**

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port defined in `.env`).

---

## Environment Variables

Create a `.env` file in the root folder and add:

```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## API Routes

### User Routes

| Method | Endpoint                    | Description                     | Auth Required |
| ------ | --------------------------- | ------------------------------- | ------------- |
| POST   | `/api/users/register`       | Register a new user             | No            |
| POST   | `/api/users/login`          | Login user                      | No            |
| POST   | `/api/users/logout`         | Logout user                     | Yes           |
| POST   | `/api/users/update/profile` | Update user profile (with file) | Yes           |

---

### Company Routes

| Method | Endpoint                       | Description                     | Auth Required |
| ------ | ------------------------------ | ------------------------------- | ------------- |
| POST   | `/api/company/register`        | Register a new company          | Yes           |
| GET    | `/api/company/get`             | Get all companies               | Yes           |
| GET    | `/api/company/getAllCompanies` | Get all registered companies    | Yes           |
| GET    | `/api/company/get/:id`         | Get company by ID               | Yes           |
| PUT    | `/api/company/update/:id`      | Update company info (with file) | Yes           |

---

### Job Routes

| Method | Endpoint                     | Description             | Auth Required |
| ------ | ---------------------------- | ----------------------- | ------------- |
| POST   | `/api/job/post`              | Post a new job          | Yes           |
| GET    | `/api/job/get`               | Get all jobs            | Yes           |
| GET    | `/api/job/getadminjobs`      | Get admin-specific jobs | Yes           |
| GET    | `/api/job/getCompanyJob/:id` | Get jobs by company ID  | Yes           |
| GET    | `/api/job/get/:id`           | Get job by ID           | Yes           |

---

### Application Routes

| Method | Endpoint                             | Description                  | Auth Required |
| ------ | ------------------------------------ | ---------------------------- | ------------- |
| GET    | `/api/application/apply/:id`         | Apply to a job               | Yes           |
| GET    | `/api/application/get`               | Get all applied jobs         | Yes           |
| GET    | `/api/application/:id/applicants`    | Get all applicants for a job | Yes           |
| POST   | `/api/application/status/:id/update` | Update application status    | Yes           |

---

## Middleware

* **authToken**: Protects routes by validating JWT tokens.
* **singleUpload / upload**: Handles file/image uploads for users and companies.
* **CORS**: Allows requests from `https://swiftcareer-client.vercel.app`.
* **cookieParser**: Parses cookies for session management.

---

## Deployment

The server is compatible with **Vercel serverless deployment**:

```js
export default app; // Already configured in index.js
```

For production, set `NODE_ENV=production` and configure `PORT` as needed.

---

---

## Author

**Jakaria Ahmed**
Student & Developer
Green University of Bangladesh

```

---

