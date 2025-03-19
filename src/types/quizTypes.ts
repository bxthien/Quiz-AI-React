export interface QuizItem {
  question: string;
  options: string[];
}

export interface QuizContextType {
  quizData: QuizItem[];
  currentIndex: number;
  nextQuestion: () => void;
  prevQuestion: () => void;
}
