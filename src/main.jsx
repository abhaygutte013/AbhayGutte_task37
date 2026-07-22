import React from "react";
import ReactDOM from "react-dom/client";
import App from "/src/App.jsx";
import "/src/index.css";

import { WorkoutsContextProvider } from "./context/WorkoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);
