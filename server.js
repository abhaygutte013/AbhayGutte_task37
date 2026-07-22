require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("/config/db.js");
const workoutRoutes = require("/routes/workouts.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/workouts", workoutRoutes);
app.get("/", (req, res) => {
  res.send("Workout Buddy API Running");
});
connectDB();
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
