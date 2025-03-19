import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const request = indexedDB.open("quizDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("quizzes")) {
        db.createObjectStore("quizzes", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      setDb((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      console.error("Lỗi mở IndexedDB:", (event.target as IDBOpenDBRequest).error);
    };
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề!");
      return;
    }

    const quizData = JSON.parse(localStorage.getItem("quiz") || "[]");

    if (!Array.isArray(quizData) || quizData.length === 0) {
      alert("Không tìm thấy dữ liệu quiz trong localStorage!");
      return;
    }

    if (db) {
      const transaction = db.transaction(["quizzes"], "readwrite");
      const store = transaction.objectStore("quizzes");

      const dataToSave = { title, questions: quizData };

      const addRequest = store.add(dataToSave);

      addRequest.onsuccess = () => {
        console.log("Đã lưu vào IndexedDB:", dataToSave);
        localStorage.removeItem("quiz");
        alert("Quiz đã được lưu!");
        onClose();
        navigate("/saved-quiz");
      };

      addRequest.onerror = (event) => {
        console.error("Lỗi khi lưu vào IndexedDB:", (event.target as IDBRequest).error);
      };
    }
  };

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

          <div className="flex justify-end gap-2">
            <button className="mt-2 px-4 text-black font-bold rounded" onClick={onClose}>
              Close
            </button>
            <button
              className="bg-[url('./save-btn.svg')] w-30 h-15 bg-contain bg-no-repeat mt-8 px-4"
              onClick={handleSave}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
