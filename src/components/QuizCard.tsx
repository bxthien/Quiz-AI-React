"use client";

import React from "react";
import { Card, Button, Popconfirm } from "antd";
import { RedoOutlined, DeleteOutlined } from "@ant-design/icons";
import type { QuizCardProps } from "../types/quiz";

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  savedDate,
  score,
  onRetake,
  onDelete,
}) => {
  return (
    <Card
      title={<span className="text-white">{title}</span>}
      className="shadow-md rounded-lg"
      headStyle={{
        background: "linear-gradient(to right, #3b82f6, #06b6d4)",
        color: "white",
      }}
    >
      <p className="text-gray-600">📅 Saved on: {savedDate}</p>
      <p className="text-gray-600">🏆 Score: {score}</p>

      <div className="mt-4 flex gap-3 justify-between">
        <Button
          className="flex-1 !bg-green-500 hover:!bg-green-600 hover:!border-green-500 !text-white rounded-md w-full flex items-center justify-center gap-2"
          icon={<RedoOutlined />}
          onClick={onRetake}
        >
          Retake
        </Button>

        <Popconfirm
          title="Are you sure you want to delete this quiz?"
          onConfirm={onDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="flex-1 border !border-red-300 !text-red-500 hover:!bg-red-50 py-2 px-4 rounded-md flex items-center justify-center gap-2"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default QuizCard;
