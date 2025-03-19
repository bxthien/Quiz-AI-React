import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";
import useQuizReview from "../../context/QuizReviewLogic";

const QuizReview = () => {
  const navigate = useNavigate();
  const { quizData, userAnswers, correctCount, isModalOpen, setIsModalOpen } =
    useQuizReview();

  return (
    <div className="text-left text-sm md:text-lg bg-[url('/background.png')]">
      <div className="max-w-2xl mx-auto p-4">
        <div className="relative bg-[#BDE0FE] rounded-lg shadow-lg p-6 text-left">
          <img
            alt="Quiz logo"
            className="absolute inset-x-0 mx-auto w-20 md:w-30 -top-10 md:-top-15"
            src="./logo.svg"
          />
          <h1 className="text-3xl text-center font-bold mb-2 mt-12">
            You answered {correctCount}/{quizData.length} questions correctly!
          </h1>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-[url('./home-btn.svg')] w-30 h-15 bg-contain bg-no-repeat"
              onClick={() => navigate("/")}
            ></button>
            <button
              className="bg-[url('./save-btn.svg')] w-30 h-15 bg-contain bg-no-repeat"
              onClick={() => setIsModalOpen(true)}
            ></button>
          </div>
        </div>

        <div className="bg-[#BDE0FE] rounded-2xl p-2 flex justify-center items-center mt-6 shadow-2xl">
          <div className="bg-white rounded-lg shadow-xl p-2 w-full">
            {quizData.map((questionData, index) => {
              const {
                question,
                answers,
                correct_answers,
                short_explain_for_answer,
              } = questionData;
              const userAnswer = userAnswers[index] || [];
              const isCorrect =
                Array.isArray(userAnswer) &&
                new Set(userAnswer).size === new Set(correct_answers).size &&
                userAnswer.every((ans) => correct_answers.includes(ans));

              return (
                <div key={index} className="bg-[#CAF0F8] rounded-lg p-2 mb-4">
                  <p className="text-sm md:text-lg font-bold mb-4">
                    {question}
                  </p>
                  <div className="flex justify-between text-left">
                    <ul className="list-none mb-4 text-sm md:text-lg">
                      {Object.entries(answers).map(([key, value]) => {
                        const isUserChoice = (userAnswer as string[]).includes(key);
                        const isCorrectChoice = correct_answers.includes(key);
                        let answerClass = isUserChoice
                          ? isCorrectChoice
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                          : isCorrectChoice
                          ? "text-green-600 font-bold"
                          : "";

                        return (
                          <li key={key} className={`mb-2 ${answerClass}`}>
                            {isUserChoice && (
                              <img
                                src={
                                  isCorrectChoice ? "./true.svg" : "./false.svg"
                                }
                                className="mr-1 inline-block"
                              />
                            )}
                            {key}. {value}
                          </li>
                        );
                      })}
                    </ul>
                    <img
                      alt="Review icon"
                      className="w-15 md:w-25"
                      src={isCorrect ? "./correct.svg" : "./wrong.svg"}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Giải thích:</p>
                    <p className="mt-2">
                      {typeof short_explain_for_answer === "object"
                        ? Object.values(short_explain_for_answer).join(" ")
                        : short_explain_for_answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          quizId={Date.now()} // Hoặc có thể truyền một giá trị cố định
          score={correctCount} // Truyền thêm điểm số
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuizReview;
