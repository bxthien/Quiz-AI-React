import React from "react";

interface AnswerCardProps {
  answer: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  return (
    <div className="bg-robo rounded-md flex justify-center items-center h-[80px] hover:shadow-md  shadow-black transition duration-500 hover:ease-in-out">
      <p className="text-center text-xl md:text-md">{answer}</p>
    </div>
  );
};

export default AnswerCard;
