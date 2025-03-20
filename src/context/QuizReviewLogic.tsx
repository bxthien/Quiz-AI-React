import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizData } from "./QuizContext";


const useQuizReview = () => {
  const { quizData, userAnswers } = useQuizData();
  const [correctCount, setCorrectCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!storedQuiz && storedAnswers === null) {
    //   navigate("/hahahaha"); // Không có dữ liệu, chuyển hướng về trang chủ
    //   return;
    // }

    let correct = 0;
    quizData.forEach((question, index) => {
      const userAnswer = userAnswers[index] || [];
      const isCorrect =
        new Set(userAnswer).size === new Set(question.correct_answers).size &&
        Array.isArray(userAnswer) &&
        userAnswer.every((ans) => question.correct_answers.includes(ans));

      if (isCorrect) correct++;
    });

    setCorrectCount(correct);
    localStorage.setItem("correctCount", correct.toString());
  }, [navigate]);

  const quizId = Date.now(); // Tạo một ID tạm thời

  return {
    quizId,
    quizData,
    userAnswers,
    correctCount,
    isModalOpen,
    setIsModalOpen,
  };
};

export default useQuizReview;
