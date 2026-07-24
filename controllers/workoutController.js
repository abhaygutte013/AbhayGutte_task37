import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// Get all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({
      error: "Unable to get workouts",
    });
  }
};

// Get one workout
export const getWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Workout not found",
    });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        error: "Workout not found",
      });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

// Create workout
export const createWorkout = async (req, res) => {
  const title = req.body.title;
  const load = req.body.load;
  const reps = req.body.reps;

  if (!title || !load || !reps) {
    return res.status(400).json({
      error: "Please fill all fields",
    });
  }

  try {
    const workout = await Workout.create({
      title: title,
      load: load,
      reps: reps,
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
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Workout not found",
    });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({
        error: "Workout not found",
      });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
};

// Update workout
export const updateWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Workout not found",
    });
  }

  const title = req.body.title;
  const load = req.body.load;
  const reps = req.body.reps;

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      {
        title: title,
        load: load,
        reps: reps,
      },
      {
        new: true,
      }
    );

    if (!workout) {
      return res.status(404).json({
        error: "Workout not found",
      });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
