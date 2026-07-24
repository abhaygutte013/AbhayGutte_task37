import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      const newWorkouts = state.workouts.filter(function (item) {
        return item._id !== action.payload._id;
      });

      return {
        workouts: newWorkouts,
      };

    case "UPDATE_WORKOUT":
      const updatedWorkouts = state.workouts.map(function (item) {
        if (item._id === action.payload._id) {
          return action.payload;
        }

        return item;
      });

      return {
        workouts: updatedWorkouts,
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
  });

  return (
    <WorkoutContext.Provider
      value={{
        workouts: state.workouts,
        dispatch: dispatch,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
