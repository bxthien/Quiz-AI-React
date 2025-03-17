import React, { useContext, useState } from "react";
import { Button, Input, Select, Form } from "antd";
import { FaRobot } from "react-icons/fa";
import requestAPI from "../../services/GeminiApi";
import { QuizAIProb } from "../../constrains/GemeniQuizAIPrompt";
import QuizInputForm from "../../components/QuizChat/QuizInputForm";
import { useQuizData } from "../../context/QuizContext";
import QuizChatReview from "../../components/QuizChat/QuizChatReview";
const chat: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { quizData } = useQuizData();

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
        <div className="text-center mb-4">
          <FaRobot className="text-blue-500 text-4xl mx-auto" />
          <h2 className="text-xl font-bold mt-2">QUIZ</h2>
        </div>

        <QuizInputForm />
      </div>
      <div className="bg-blue-50 shadow-lg rounded-xl p-6 w-[600px] scroll-auto overflow-y-auto">
        <QuizChatReview data={quizData} />
      </div>
    </div>
  );
};

export default chat;
