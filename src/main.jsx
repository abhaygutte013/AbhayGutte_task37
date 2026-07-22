import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WorkoutContextProvider>
    <App />
  </WorkoutContextProvider>
);
