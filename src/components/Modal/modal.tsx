import React from "react";
import { useState } from "react";
import useQuizSave from "../../hooks/useQuizSave";
import Success from "../../components/Notification/Success"; // Import Success.tsx

const Modal = ({
  quizId,
  score,
  onClose,
}: {
  quizId: number;
  score: number;
  onClose: () => void;
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { title, setTitle, isExisting, handleSaveNew, handleUpdate } = useQuizSave(
    quizId,
    score,
    () => setShowSuccess(true) // Khi lưu xong, hiển thị Success.tsx
  );

  if (showSuccess) {
    return <Success onClose={() => setShowSuccess(false)} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-blue-500 p-2 rounded-lg shadow-lg w-96">
        <div className="bg-blue-300 p-2 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Save Quiz</h2>
          <p>Enter quiz title:</p>

          <input
            className="bg-white rounded-lg w-full h-10 p-2 mt-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex justify-end">
            <button className="mt-2 px-4 text-black font-bold rounded" onClick={onClose}>
              Close
            </button>

            {isExisting ? (
              <div>
                <p className="text-red-500">Quiz already exists! Update or create new?</p>
                <button className="bg-green-500 text-white p-2 rounded" onClick={handleSaveNew}>
                  Save new
                </button>
                <button className="bg-yellow-500 w-20 text-white p-2 rounded-4xl" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            ) : (
              <button className="bg-[#0077B6] w-20 text-white p-2 mt-4 rounded-4xl" onClick={handleSaveNew}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;