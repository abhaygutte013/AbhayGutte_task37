import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  if (action.type === "SET_WORKOUTS") {
    return {
      workouts: action.payload,
    };
  }

  if (action.type === "ADD_WORKOUT") {
    return {
      workouts: [action.payload, ...state.workouts],
    };
  }

  if (action.type === "DELETE_WORKOUT") {
    return {
      workouts: state.workouts.filter(
        (workout) => workout._id !== action.payload._id
      ),
    };
  }

  return state;
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
  });

  return (
    <WorkoutContext.Provider
      value={{
        workouts: state.workouts,
        dispatch,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
