import { useWorkoutContext } from "../hooks/useWorkoutContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts/${workout._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: "DELETE_WORKOUT",
          payload: data,
        });
      }
    } catch (error) {
      console.log("Delete failed");
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>

      <p>
        <strong>Load:</strong> {workout.load} kg
      </p>

      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default WorkoutDetails;
