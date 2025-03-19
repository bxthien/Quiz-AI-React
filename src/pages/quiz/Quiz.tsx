import { Button } from "antd";
import { QuestCard } from "../../components";
import "./quiz.css";
import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons";
import { useQuiz } from "../../hooks/useQuiz";

const Quiz = () => {
  const { quizData, currentIndex, nextQuestion, prevQuestion } = useQuiz();
  return (
    <div className="quizPage min-h-screen flex justify-center items-center">
      <Button
        size="large"
        className="md:me-2"
        onClick={prevQuestion}
        disabled={currentIndex === 0}
      >
        <LeftSquareFilled />
      </Button>
      {quizData.length > 0 ? (
        <QuestCard
          question={quizData[currentIndex].question}
          options={quizData[currentIndex].options}
        />
      ) : (
        <p>Loading.....</p>
      )}

      <Button
        size="large"
        className="md:ms-2"
        onClick={nextQuestion}
        disabled={currentIndex === quizData.length - 1}
      >
        <RightSquareFilled />
      </Button>
    </div>
  );
};

export default Quiz;
