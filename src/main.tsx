import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import QuizProvider from "./context/QuizContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <QuizProvider>
        <RouterProvider router={router} />
      </QuizProvider>
    </LoadingProvider>
  </StrictMode>
);
