import React, { useContext, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import QuizInputForm from "../../components/QuizChat/QuizInputForm";
import { useQuizData } from "../../context/QuizContext";
import QuizChatReview, {
  QuizQuestion,
} from "../../components/QuizChat/QuizChatReview";
import { useLoading } from "../../hooks/useLoading";
import AppLoading from "../../components/Loading/AppLoading";
import { useLoadingContext } from "../../context/LoadingContext";
import { Button } from "antd";
const chat: React.FC = () => {
  const { isLoading, loading, stopLoading } = useLoadingContext();
  const { quizData } = useQuizData();

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100 overflow-hidden">
      <div className="bg-blue-200 shadow-[8px_8px_10px_rgba(0,0,0,0.5)]  p-6 w-[30%] h-[80%] max-h-[80%]">
        <div className="text-center mb-4">
          <FaRobot className="text-blue-500 text-4xl mx-auto" />
          <h2 className="text-xl font-bold mt-2">QUIZ</h2>
        </div>
        <AppLoading isShowLoading={isLoading} message="Gererating!!!" />
        <QuizInputForm />
      </div>
      {quizData && quizData[0] != null ? (
        <div className="shadow-[8px_8px_10px_rgba(0,0,0,0.5)] p-3 mx-10 w-[50%] bg-blue-200 h-[80%] scroll-auto overflow-hidden">
          <QuizChatReview />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default chat;
