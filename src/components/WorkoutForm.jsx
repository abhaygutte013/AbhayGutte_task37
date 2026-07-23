import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = ({ editWorkout, setEditWorkout }) => {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (editWorkout) {
      setTitle(editWorkout.title);
      setLoad(editWorkout.load);
      setReps(editWorkout.reps);
    }
  }, [editWorkout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const workout = {
      title,
      load,
      reps,
    };

    let response;

    if (editWorkout) {
      response = await fetch("/api/workouts/" + editWorkout._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });
    } else {
      response = await fetch("/api/workouts", {
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
      setEmptyFields(json.emptyFields || []);
      setLoading(false);
      return;
    }

    if (editWorkout) {
      dispatch({
        type: "UPDATE_WORKOUT",
        payload: json,
      });

      setEditWorkout(null);
    } else {
      dispatch({
        type: "CREATE_WORKOUT",
        payload: json,
      });
    }

    setTitle("");
    setLoad("");
    setReps("");

    setError(null);
    setEmptyFields([]);
    setLoading(false);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>
        {editWorkout ? "Edit Workout" : "Add Workout"}
      </h3>

      <label>Workout Title</label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load</label>

      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps</label>

      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button disabled={loading}>
        {loading
          ? "Saving..."
          : editWorkout
          ? "Update Workout"
          : "Add Workout"}
      </button>

      {editWorkout && (
        <button
          type="button"
          onClick={() => {
            setEditWorkout(null);
            setTitle("");
            setLoad("");
            setReps("");
          }}
        >
          Cancel
        </button>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
