import { createContext, useState, ReactNode } from "react";
import { QuizItem, QuizContextType } from "../types/quizTypes";
import { quizData as initialData } from "../utils/quizData";

// Create the context with a default value
export const QuizContext = createContext<QuizContextType | null>(null);

// Context Provider Component
interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizData, setQuizData] = useState<QuizItem[]>(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < quizData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <QuizContext.Provider
      value={{ quizData, currentIndex, nextQuestion, prevQuestion }}
    >
      {children}
    </QuizContext.Provider>
  );
};
