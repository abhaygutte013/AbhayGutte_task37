import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import workoutRoutes from "./routes/workouts.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
