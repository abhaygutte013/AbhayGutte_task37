import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkoutContext must be inside WorkoutsContextProvider");
  }

  return context;
};
