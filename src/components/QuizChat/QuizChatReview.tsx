import { Button } from "antd";
import { useQuizData } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../context/LoadingContext";

export interface QuizQuestion {
  question: string;
  answers: Record<string, string>;
  correct_answers: string[];
  short_explain_for_answer: Record<string, string>;
}
const QuizChatReview = () => {
  const { isLoading } = useLoadingContext();
  const { quizData, storeQuizData } = useQuizData();
  const navigate = useNavigate();
  const startQuiz = () => {
    storeQuizData();
    navigate("/quiz");
  };
  return (
    <div className="h-full bg-white rounded-xl overflow-hidden">
      <div className="h-full overflow-y-auto p-4 space-y-4">
        {quizData ? (
          quizData.map((element: QuizQuestion, index: number) => (
            <div key={index} className="p-4 rounded-xl my-3 bg-green-200">
              <p className="font-bold">{element.question}</p>
              <div>
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
        {quizData && quizData[0] && (
          <button
            onClick={startQuiz}
            disabled={isLoading}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "65%",
              transform: "translateX(-50%)",
              borderRadius: 20,
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            className="w-50 h-30 transition-transform duration-300 hover:scale-110 active:scale-90 "
          >
            <img
              src={"/start.svg"}
              alt="Submit Button"
              className="w-full h-full object-fit"
            />
          </button>
        )}
      </div>
    </div>
  );
};
export default QuizChatReview;
