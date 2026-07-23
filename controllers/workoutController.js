import mongoose from "mongoose";
import Workout from "../models/workoutModel.js";

// Get all workouts
export const getWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// Get one workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

// Create workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill all the fields",
      emptyFields,
    });
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

// Update workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};
