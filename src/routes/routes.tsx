import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import SaveQuiz from "../pages/saved-quiz/SaveQuiz";
import QuizReview from "../pages/quiz-review/QuizReview";
import Quiz from "../pages/quiz/Quiz";
import Layout from "../layout/Layout";
import Login from "../pages/login/Login";
import { Error404 } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
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
    ],
  },
]);

export default router;
