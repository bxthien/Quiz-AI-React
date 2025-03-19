import { Button } from "antd";
import { QuestCard } from "../../components";
import "./quiz.css";
import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons";
import { useQuizData } from "../../context/QuizContext";
import { QuizQuestion } from "../../components/QuizChat/QuizChatReview";

const Quiz = () => {
  const { quizData, currentAnswer, nextQuestion, prevQuestion } = useQuizData();
  return (
    <div className="quizPage min-h-screen flex justify-center items-center">
      <Button
        size="large"
        className="md:me-2"
        onClick={prevQuestion}
        disabled={currentAnswer === 0}
      >
        <LeftSquareFilled />
      </Button>

      {quizData.length > 0 ? (
        <QuestCard
          question={quizData[currentAnswer].question}
          answers={quizData[currentAnswer].answers}
        />
      ) : (
        <p>Loading.....</p>
      )}

      <Button
        size="large"
        className="md:ms-2"
        onClick={nextQuestion}
        disabled={currentAnswer === quizData.length - 1}
      >
        <RightSquareFilled />
      </Button>
    </div>
  );
};

export default Quiz;
