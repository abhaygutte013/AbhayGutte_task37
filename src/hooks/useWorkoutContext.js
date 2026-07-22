import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      "useWorkoutContext must be used inside a WorkoutsContextProvider"
    );
  }
  return context;
};
export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};
