# Workout Buddy (MERN Stack)
## About

This is a simple MERN Stack project to manage workouts. Users can add, view and delete workout records. The frontend is made using React and the backend is made using Express.js, Node.js and MongoDB.

## Technologies Used

* React
* Vite
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Folder Structure

project
│
├── backend
└── frontend

## Backend Setup

1. Open terminal.
2. Go to backend folder:cd backend
3. Install packages:npm install
4. Create a `.env` file.

PORT=5000
MONGO_URI=your_mongodb_connection_string

5. Start backend:npm run dev
6.Backend runs on:http://localhost:5000

## Frontend Setup

1.Open another terminal.
2.Go to frontend folder:cd frontend
3.Install packages:npm install
4.Create a `.env` file:VITE_API_URL=http://localhost:5000
5.Run the frontend:npm run dev
6.Frontend runs on:http://localhost:5173

## Features

* View workouts
* Add new workout
* Delete workout
* Store data in MongoDB Atlas
