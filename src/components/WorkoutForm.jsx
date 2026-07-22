import { useState } from "react";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title || !reps || !load) {
      setError("Please fill all fields");
      return;
    }

    const workout = {
      title,
      reps,
      load,
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

      if (!response.ok) {
        setError(data.error);
      } else {
        setTitle("");
        setReps("");
        setLoad("");
        setError("");

        window.location.reload();
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <label>Load (kg)</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <button>Add Workout</button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default WorkoutForm;
