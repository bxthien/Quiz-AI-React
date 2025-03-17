import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import SaveQuiz from "../pages/saved-quiz/SaveQuiz";
import QuizReview from "../pages/quiz-review/QuizReview";
import Quiz from "../pages/quiz/Quiz";
import Layout from "../layout/Layout";
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";
import AuthGuard from "../guards/AuthGuard";
import UserProfile from "../pages/profile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/saved-quiz",
        element: <SaveQuiz />,
      },
      {
        path: "/quiz-review",
        element: <QuizReview />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "user-profile",
        element: (
          <AuthGuard>
            <UserProfile />
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default router;
