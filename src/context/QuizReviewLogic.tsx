import { useState, useEffect } from "react";

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

  useEffect(() => {
    let storedQuiz = localStorage.getItem("quiz");
    let storedAnswers = localStorage.getItem("quiz-answers");

    if (!storedQuiz || !storedAnswers) {
      const sampleQuiz: QuestionData[] = [
        {
          question: "What is the capital of France?",
          answers: {
            A: "Berlin",
            B: "Madrid",
            C: "Paris",
            D: "Rome",
          },
          correct_answers: ["C"],
          short_explain_for_answer: "Paris is the capital of France.",
        },
        {
          question: "Which planet is known as the Red Planet?",
          answers: {
            A: "Earth",
            B: "Mars",
            C: "Jupiter",
            D: "Venus",
          },
          correct_answers: ["B"],
          short_explain_for_answer: "Mars is known as the Red Planet due to its reddish appearance.",
        },
      ];

      const sampleAnswers: Record<number, string[]> = {
        0: ["C"],
        1: ["A"],
      };

      localStorage.setItem("quiz", JSON.stringify(sampleQuiz));
      localStorage.setItem("quiz-answers", JSON.stringify(sampleAnswers));

      storedQuiz = JSON.stringify(sampleQuiz);
      storedAnswers = JSON.stringify(sampleAnswers);
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
  }, []);

  return { quizData, userAnswers, correctCount, isModalOpen, setIsModalOpen };
};

export default useQuizReview;
