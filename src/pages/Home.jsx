import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const getWorkouts = async () => {
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
        console.log("Error fetching workouts");
      }
    };

    getWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
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
