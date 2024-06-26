# ZEECARE

Book appointments with doctors who visit you at home. Conveniently browse available doctors, choose the best fit, and schedule visits with just a few clicks. Experience personalized healthcare without leaving your home.


<b>Some ScreenShots(Actual App Even Looks Better 😃):</b></br><br>
![App Screenshot](dashboard/public/Screenshot%20(120).png)
![App Screenshot](frontend/public/Screenshot%20(128).png)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Project Overview

This project is a comprehensive medical web application built using MongoDB, React.js, Node.js, and Express.js. It features JWT token-based authentication and authorization for secure access. The application includes two main panels: a user panel for patients to book appointments and manage their schedules, and an admin panel for overseeing the system and managing doctors. There is also potential for a future third panel dedicated to doctors. The app aims to facilitate seamless appointment bookings and home visits by medical professionals, providing a convenient and efficient healthcare solution.

## User Roles

There are three distinct user roles within the system:

#### Admin: 
- Doctor Management :->  Admins can add new doctors to the system,
- Appointment Management :-> Admins can review, accept, update, or mark appointments as pending, ensuring efficient scheduling and patient care.
- Message Management :-> Admins handle all incoming messages from patients, addressing their concerns, and facilitating communication between patients and doctors.
#### User: 
- Users can browse available doctors, select the one they wish to consult, and book appointments for home visits.



## Features

- [x] User authentication and authorization (JWT)
- [x] User profile creation and management
- [x] Role-Based Access Control
- [x] Context-based authentication
- [x] Admin dashboard
- [x] user dashboard



## Technologies

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication




## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB or MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/nz-m/SocialEcho.git
```
2. Go to the project directory and install dependencies for both the client and server

```bash
cd client
npm install
```

```bash
cd server
npm install
```

3. Create a `.env` file in both the `client` and `server` directories and add the environment variables as shown in the `.env.example` files.
4. Start the server

```bash
cd server
npm run dev
```

5. Start the client

```bash
cd client
npm run dev
```

#### `.env` Variables

For email service of context-based authentication, the following variables are required:

```bash
PORT=

MONGO_URI=

FRONTEND_URL=

DASHBOARD_URL=

JWT_SECRET_KEY=
JWT_EXPIRES=

COOKIE_EXPIRES=

CLOUDINARY_COUD_NAME=

CLOUDINARY_API_SECRET=

CLOUDINARY_API_KEY=

```



## Usage

### Admin

Admin panel should be run by going to the dashboard directory then install necessary dependencies
### Patient

Patient panel should be run by going to the frontend directory then install necessary dependencies