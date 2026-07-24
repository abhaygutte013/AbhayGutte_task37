import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const API = import.meta.env.VITE_API_URL;

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  const clearForm = () => {
    setTitle("");
    setLoad("");
    setReps("");
    setEditing(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || load === "" || reps === "") {
      setError("Please fill all fields");
      return;
    }

    const workout = {
      title: title,
      load: load,
      reps: reps,
    };

    try {
      let response;

      if (editing) {
        response = await fetch(API + "/" + editing, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        });
      } else {
        response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        });
      }

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        if (editing) {
          dispatch({
            type: "UPDATE_WORKOUT",
            payload: json,
          });
        } else {
          dispatch({
            type: "CREATE_WORKOUT",
            payload: json,
          });
        }

        clearForm();
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{editing ? "Update Workout" : "Add Workout"}</h3>

      <label>Workout Title</label>

      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label>Load (kg)</label>

      <input
        type="number"
        value={load}
        onChange={(e) => {
          setLoad(e.target.value);
        }}
      />

      <label>Reps</label>

      <input
        type="number"
        value={reps}
        onChange={(e) => {
          setReps(e.target.value);
        }}
      />

      <button>
        {editing ? "Update Workout" : "Add Workout"}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
