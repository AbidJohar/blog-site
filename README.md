# Full Stack Blog Application

A fully functional MERN stack blog application with secure authentication, CRUD operations for blog posts, and role-based access control. Users can register, log in, create blogs, edit or delete only their own posts, and view public blogs. This project is built for technical assessment.

---

## 🚀 Features

- User authentication using JWT
- Register, Login, Logout
- Create, Read, Update, Delete blog posts
- Users can edit/delete **only their own posts**
- Public users can **view blogs without login**
- State management for auth and blogs
- Optimistic UI updates.
- Secure API routes with authentication middleware
- Responsive UI and rich text blog editor

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router Dom
- React Quill Editor

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 📦 Folder Structure

```
project-root/
├── client/ # React frontend
│ ├── src/
│ │ ├── api/ # API calls
│ │ ├── app/ # Redux store setup
│ │ ├── assets/ # Images and static files
│ │ ├── components/ # Reusable UI components
│ │ ├── features/ # Redux slices
│ │ ├── pages/ # React pages
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── public/
│ └── package.json
│
├── server/ # Node.js backend
│ ├── config/ # Database configuration
│ ├── controllers/ # Route handlers
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication middleware
│ ├── validators/ # Request validation
│ ├── .env # Environment variables
│ └── server.js # App entry point
│
└── README.md

```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/blog-app.git
   cd blog-site
   ```

2. **Install dependencies:**
   ```
   cd blogserverside and then run npm install
   and
   cd blogclientside and then also run npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and define the following variables:
   ```
   server :
   PORT=<your port>
   MONGODB_URI=<your-db-url>
   JWT_SECRET= <your secret key>
   JWT_EXPIRES_IN=<expiry time>

   ```

4. **Run the application:**
   ```
    server:
    npm run dev
    
    client:
    npm run dev
   ```

 


## 🧪 API Testing (Postman)

You can test the API easily using the Postman collection below:

👉  Postman Collection link:
https://adnan2.postman.co/workspace/My-Workspace~702c5279-d53d-408c-809b-43c128a5b96c/collection/34705955-684f9eae-9ee2-4839-9928-59f23ff21248?action=share&source=copy-link&creator=34705955


## 📚 API Documentation

Base URL: `http://localhost:5000/api/v1`

---

### 🔐 Auth Routes

#### Register User
**POST** `/auth/register`  
**Description:** Register a new user  
**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login User
**POST** `/auth/register`  
**Description:** login  user  
**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### 📝 Blog Routes

#### Get All Blogs
**GET** `/blogs/get-all-blogs`  
**Description:** Fetch all blog posts (public)

---

#### Get Blog By ID
**GET** `/blogs/get-blog-ById/:id`  
**Description:** Fetch a single blog by its ID (public)  
**Example:** `/blogs/get-blog-ById/68f3e107fb5ed5b5804accaa`

---

#### update Blog By ID
**GET** `/blogs/update-blog-ById/:id`  
**Description:** update  blog by its ID (owner)  
**Example:** `/blogs/update-blog-ById/68f3e107fb5ed5b5804accaa`

---

#### delete Blog By ID
**GET** `/blogs/delete-blog-ById/:id`  
**Description:** delete blog by its ID (owner)  
**Example:** `/blogs/delete-blog-ById/68f3e107fb5ed5b5804accaa`

---

#### get user Blogs
**GET** `/blogs/get-user-blogs/:id`  
**Description:** get user blogs (owner)  
**Example:** `/blogs/get-user-blogs `

---


#### Create Blog
**POST** `/blogs/create-blog`  
**Description:** Create a new blog post (Authenticated users only)  
**Headers:**
Authorization: Bearer `<token>`  

**Request Body:**
```json
{
  "title": "My First Blog",
  "content": "This is my first blog content",
}
```
