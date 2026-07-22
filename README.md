# Workout Budyyy

This is my MERN Stack project.

It is a simple workout tracker where we can add workouts, see all workouts and delete workouts.

## Features

- Add workout
- Show all workouts
- Delete workout
- MongoDB Atlas database
- React Context API
- useReducer
- Express API
- Mongoose

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Context API

## Folder Structure


WorkoutBuddy
│
├── backend
└── frontend

## Backend Setup

1.Go to backend folder:cd backend
2.Install packages:npm install
3.Create `.env`

PORT=5000
MONGO_URI=your_mongodb_connection_string

4.Start backend:npm run dev

## Frontend Setup

1.Go to frontend folder:cd frontend
2.Install packages:npm install
3.Start frontend:npm run dev

## Backend URL

http://localhost:5000

## Frontend URL

http://localhost:5173

## API

### Get Workouts

GET /api/workouts

### Add Workout

POST /api/workouts

### Delete Workout

DELETE /api/workouts/:id


## Output

- Add workout using the form.
- All workouts are shown on the left side.
- Delete button removes a workout.
- Data is stored in MongoDB Atlas.
