import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import SaveQuiz from "../pages/saved-quiz/SaveQuiz";
import QuizReview from "../pages/quiz-review/QuizReview";
import Quiz from "../pages/quiz/Quiz";
import Layout from "../layout/Layout";
import Login from "../pages/login/Login";
import { Error404 } from "../components";
import { AuthProvider } from "../context/AuthContext";

// Tạo một Root component để bọc AuthProvider
const Root = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <Root />, // Bọc tất cả routes trong AuthProvider
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />, // Redirect root to login
      },
      {
        path: "/login",
        element: <Login />, // Login page without layout
      },
      {
        element: <ProtectedRoute />, // Protected route wrapper
        children: [
          {
            element: <Layout />, // Layout for all protected pages
            children: [
              { path: "home", element: <Home /> },
              { path: "chat", element: <Chat /> },
              { path: "quiz", element: <Quiz /> },
              { path: "saved-quiz", element: <SaveQuiz /> },
              { path: "quiz-review", element: <QuizReview /> },
            ],
          },
        ],
      },
      { path: "*", element: <Error404 /> }, // 404 page for invalid URLs
    ],
  },
]);

export default router;
