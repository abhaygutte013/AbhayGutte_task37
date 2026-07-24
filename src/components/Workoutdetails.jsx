import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const API = import.meta.env.VITE_API_URL;
fetch(API);

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(API + "/" + workout._id, {
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
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const date = new Date(workout.createdAt);

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>

      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>

      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>

      <p>{date.toLocaleString()}</p>

      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default WorkoutDetails;
