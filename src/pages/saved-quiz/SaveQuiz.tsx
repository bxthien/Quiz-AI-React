"use client";

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import QuizCard from "../../components/QuizCard/QuizCard";
import type { Quiz } from "../../types/quiz";
import { getQuizzes, deleteQuiz, seedDummyData } from "../../utils/indexedDB";

const QuizHistoryPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      await seedDummyData(); // 🟢 Thêm dữ liệu giả nếu chưa có
      const data = await getQuizzes();
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId: number) => {
    const success = await deleteQuiz(quizId);
    if (success) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    }
  };

  return (
    <div
      className="p-4 min-h-screen"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex flex-row">
          <div className="flex items-start gap-4 mb-8">
            <img
              src="../../../public/logo.png"
              alt="Quiz Robot Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="py-6">
            <Card className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                📚 Quiz History
              </h1>
              <p className="text-gray-700">
                List of quizzes you've saved to complete later
              </p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                savedDate={quiz.savedDate}
                score={quiz.score}
                onRetake={() => console.log("Retake quiz:", quiz.id)} // ✅ Thêm `onRetake`
                onDelete={() => handleDelete(quiz.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No quizzes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryPage;
