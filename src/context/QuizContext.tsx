import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { QuizQuestion } from "../components/QuizChat/QuizChatReview";
import {
  QUIZ_ANSWERS_KEY,
  QUIZ_CURRRENT_KEY,
  QUIZ_DATA_KEY,
} from "../constrains/QuizDataKey";

export interface QuizDataContext {
  quizData: QuizQuestion[];
  userAnswers: string[];
  currentAnswer: number;
  setQuizData: Dispatch<SetStateAction<QuizQuestion[]>>;
  setUserAnswers: Dispatch<SetStateAction<string[]>>;
  setCurrentAnswer: Dispatch<SetStateAction<number>>;
}
export const QuizContext = createContext<QuizDataContext | null>(null);
const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number>(0);
  useEffect(() => {
    localStorage.setItem(QUIZ_DATA_KEY, JSON.stringify(quizData));
  }, [quizData]);
  useEffect(() => {
    localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(userAnswers));
  }, [userAnswers]);
  useEffect(() => {
    localStorage.setItem(QUIZ_CURRRENT_KEY, JSON.stringify(currentAnswer));
  }, [currentAnswer]);
  useEffect(() => {
    const storedQuizData = localStorage.getItem(QUIZ_DATA_KEY);
    const storedUserAnswers = localStorage.getItem(QUIZ_ANSWERS_KEY);
    const storedCurrentAnswer = localStorage.getItem(QUIZ_CURRRENT_KEY);

    if (storedQuizData) setQuizData(JSON.parse(storedQuizData));
    if (storedUserAnswers) setUserAnswers(JSON.parse(storedUserAnswers));
    if (storedCurrentAnswer) setCurrentAnswer(JSON.parse(storedCurrentAnswer));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        quizData,
        userAnswers,
        currentAnswer,
        setQuizData,
        setUserAnswers,
        setCurrentAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export const useQuizData = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizData must be used within a QuizDataProvider");
  }
  return context;
};
export default QuizProvider;
