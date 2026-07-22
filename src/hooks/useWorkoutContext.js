import { useContext } from "react";
import { WorkoutsContext } from "/src/context/WorkoutContext.jsx";

const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      "useWorkoutContext must be used inside a WorkoutsContextProvider"
    );
  }
  return context;
};
export default useWorkoutContext;
