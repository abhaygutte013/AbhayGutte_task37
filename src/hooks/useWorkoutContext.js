import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (context === null) {
    throw new Error("useWorkoutsContext must be used inside WorkoutContextProvider");
  }

  return context;
};
