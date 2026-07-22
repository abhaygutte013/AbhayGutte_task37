import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title || !load || !reps) {
      setError("Please fill all fields");
      return;
    }

    if (isNaN(load) || isNaN(reps)) {
      setError("Load and Reps must be numbers");
      return;
    }

    setLoading(true);

    const workout = {
      title,
      load: Number(load),
      reps: Number(reps),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: "ADD_WORKOUT",
          payload: data,
        });

        setTitle("");
        setLoad("");
        setReps("");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Workout</h3>

      <label>Exercise Title</label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (kg)</label>

      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Reps</label>

      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Workout"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default WorkoutForm;
