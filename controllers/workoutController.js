const Workout = require("../models/workoutModel");

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Unable to get workouts" });
  }
};

// Get one workout
const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Invalid workout id" });
  }
};

// Create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  if (!title || !reps || !load) {
    return res.status(400).json({
      error: "Please fill all fields"
    });
  }

  try {
    const workout = await Workout.create({
      title,
      reps,
      load
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Could not create workout" });
  }
};

// Delete workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Invalid workout id" });
  }
};

// Update workout
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Could not update workout" });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
