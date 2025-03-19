import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type QuestionData = {
  question: string;
  answers: Record<string, string>;
  correct_answers: string[];
  short_explain_for_answer: string | Record<string, string>;
};

const useQuizReview = () => {
  const [quizData, setQuizData] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuiz = localStorage.getItem("quiz");
    const storedAnswers = localStorage.getItem("quiz-answers");

    if (!storedQuiz || !storedAnswers) {
      navigate("/"); // Không có dữ liệu, chuyển hướng về trang chủ
      return;
    }

    const parsedQuiz: QuestionData[] = JSON.parse(storedQuiz);
    const parsedAnswers: Record<number, string[]> = JSON.parse(storedAnswers);
    setQuizData(parsedQuiz);
    setUserAnswers(parsedAnswers);

    let correct = 0;
    parsedQuiz.forEach((question, index) => {
      const userAnswer = parsedAnswers[index] || [];
      const isCorrect =
        new Set(userAnswer).size === new Set(question.correct_answers).size &&
        userAnswer.every((ans) => question.correct_answers.includes(ans));

      if (isCorrect) correct++;
    });

    setCorrectCount(correct);
    localStorage.setItem("correctCount", correct.toString());
  }, [navigate]);

  const quizId = Date.now(); // Tạo một ID tạm thời

  return { quizId, quizData, userAnswers, correctCount, isModalOpen, setIsModalOpen };
};

export default useQuizReview;