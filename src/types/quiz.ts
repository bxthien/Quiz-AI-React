// Define TypeScript interfaces for our data
export interface Quiz {
  id: number;
  title: string;
  savedDate: string;
  score: string;
}

export interface QuizCardProps {
  title: string;
  savedDate: string;
  score: string;
  onRetake: () => void;
  onDelete: () => void;
}
