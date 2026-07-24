import { useEffect, useState } from "react";
import WorkoutDetails from "../components/Workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const API = import.meta.env.VITE_API_URL;

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      setLoading(true);

      try {
        const response = await fetch(API);
        const json = await response.json();

        if (response.ok) {
          dispatch({
            type: "SET_WORKOUTS",
            payload: json,
          });
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {loading ? (
          <h3>Loading workouts...</h3>
        ) : (
          workouts &&
          workouts.map((workout) => {
            return (
              <WorkoutDetails
                key={workout._id}
                workout={workout}
              />
            );
          })
        )}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
