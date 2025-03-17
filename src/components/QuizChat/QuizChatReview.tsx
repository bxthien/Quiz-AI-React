export interface QuizQuestion {
  question: string;
  answers: Record<string, string>;
  correct_answers: string[];
  short_explain_for_answer: Record<string, string>;
}
const QuizChatReview = ({ data }: { data: QuizQuestion[] }) => {
  const quizReviewData: QuizQuestion[] = data;
  return (
    <div className="overflow-y-auto max-h-200px">
      {quizReviewData ? (
        quizReviewData.map((element: QuizQuestion, index: number) => (
          <div key={index} className="p-4 border-b border-gray-300">
            <p className="font-bold">{element.question}</p>
            <div className="mt-2">
              {Object.entries(element.answers).map(([key, value]) => (
                <p key={key} className="text-gray-600">
                  {key}: {value as string}
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default QuizChatReview;
