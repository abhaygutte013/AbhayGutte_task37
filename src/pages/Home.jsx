import { useEffect, useState } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/workouts`
        );

        const data = await response.json();

        if (response.ok) {
          dispatch({
            type: "SET_WORKOUTS",
            payload: data,
          });
        }
      } catch (error) {
        console.log("Could not fetch workouts");
      }

      setLoading(false);
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">

      <div className="workouts">

        {loading && <h3>Loading...</h3>}

        {!loading &&
          workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
            />
          ))}

      </div>

      <WorkoutForm />

    </div>
  );
}

export default Home;
