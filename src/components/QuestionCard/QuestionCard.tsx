import React from "react";
import AnswerCard from "./AnswerCard/AnswerCard";
import { Col, Row } from "antd";

interface QuestCardProps {
  question: string;
  answers: Record<string, string>;
}

const QuestionCard: React.FC<QuestCardProps> = ({ question, answers }) => {
  return (
    <div className="bg-silver shadow-md shadow-black border-robo border-[10px] overflow-hidden h-[600px] w-sm flex flex-col justify-around p-6 rounded-md md:p-[25px] md:h-[400px] md:w-xl md:mx-0">
      <h2 className="text-center text-2xl">{question}</h2>
      <Row gutter={[16, 16]}>
        {Object.entries(answers).map(([aKey, value], index) => (
          <Col xs={24} md={12} key={index}>
            <AnswerCard answer={value} answerKey={aKey} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionCard;
