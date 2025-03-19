import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QuizProvider } from "./context/QuizContext2.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <RouterProvider router={router} />
      </QuizProvider>
    </AuthProvider>
  </StrictMode>
);
