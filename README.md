# Chat App

A real-time chat application built with **React**, **Node.js**, **Express**, **Socket.io**, and **MongoDB**.  
It allows users to sign up, log in, and chat in real-time with join/leave notifications and chat history.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)


---

## About
This project is a real-time chat platform that supports multiple users, user authentication, and live messaging.  
It’s designed to demonstrate the use of **Socket.io** for real-time communication and **JWT** for secure login.

---

## Features
- User registration and login
- Real-time messaging
- Join and leave notifications
- Chat history for all users
- Secure authentication with JWT
- Responsive design for desktop and mobile

---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Real-time Communication:** Socket.io
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Environment Management:** `.env` file

---

##  Installation

### 1. Clone the repository
```bash
git clone https://github.com/nyl11/Demo-chatApp.git
cd Demo-chatApp
```

### 2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the **backend** folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Create a `.env` file in the **front** folder with the following variables:
```env
REACT_APP_BACKEND_URL=backend url
```
### 4. Start the development servers
```bash
# Backend
cd backend
npm run dev

# Frontend (in a new terminal)
cd frontend
npm start
```

The application should now be running:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---
