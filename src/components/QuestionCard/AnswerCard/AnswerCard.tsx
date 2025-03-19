import React from "react";

interface AnswerCardProps {
  answerKey: string;
  answer: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answerKey, answer }) => {
  return (
    <div className="bg-robo rounded-md flex justify-start items-center h-[80px] hover:shadow-md hover:bg-hover-answer  shadow-black transition duration-500 hover:ease-in-out md:p-7">
      <p className="text-center text-xl md:text-md md:me-4">
        {answerKey + "."}
      </p>
      <p className="text-center text-xl md:text-md">{answer}</p>
    </div>
  );
};

export default AnswerCard;
