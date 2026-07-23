import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_WORKOUT",
        payload: json,
      });
    }

    setLoading(false);
  };

  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>

      <p>
        <strong>Load :</strong> {workout.load} kg
      </p>

      <p>
        <strong>Reps :</strong> {workout.reps}
      </p>

      <p>{new Date(workout.createdAt).toLocaleString()}</p>

      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "🗑"}
      </button>
    </div>
  );
};

export default WorkoutDetails;
