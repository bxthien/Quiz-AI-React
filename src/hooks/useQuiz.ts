import { useContext } from "react";
import { QuizContext } from "../context/QuizContext2";
import { QuizContextType } from "../types/quizTypes";

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
