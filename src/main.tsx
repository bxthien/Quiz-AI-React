import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import QuizProvider from "./context/QuizContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <QuizProvider>
          <RouterProvider router={router} />
        </QuizProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>
);
