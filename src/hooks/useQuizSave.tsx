import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useQuizSave = (quizId: number, score: number, onSuccess: () => void) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [title, setTitle] = useState("");
  const [isExisting, setIsExisting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      const db = (event.target as IDBOpenDBRequest).result;
      setDb(db);

      const transaction = db.transaction(["quizzes"], "readonly");
      const store = transaction.objectStore("quizzes");
      const getRequest = store.get(quizId);

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          setIsExisting(true);
        }
      };
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", (event.target as IDBOpenDBRequest).error);
    };
  }, [quizId]);

  const handleSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/saved-quiz"); // ✅ Chuyển hướng sau 1.5 giây
    }, 1500);
  };

  const handleSaveNew = () => {
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    const quizData = JSON.parse(localStorage.getItem("quiz") || "[]");
    if (!Array.isArray(quizData) || quizData.length === 0) {
      alert("No quiz data found in localStorage!");
      return;
    }

    const correctCount = parseInt(localStorage.getItem("correctCount") || "0", 10);

    if (db) {
      const transaction = db.transaction(["quizzes"], "readwrite");
      const store = transaction.objectStore("quizzes");
      const dataToSave = { title, questions: quizData, score: correctCount };

      const addRequest = store.add(dataToSave);
      addRequest.onsuccess = () => {
        console.log("Quiz saved:", dataToSave);
        localStorage.removeItem("quiz");
        localStorage.removeItem("correctCount");
        handleSuccess(); // ✅ Hiển thị Success.tsx và chuyển hướng sau 1.5s
        onSuccess();
      };

      addRequest.onerror = (event) => {
        console.error("Error saving quiz:", (event.target as IDBRequest).error);
      };
    }
  };

  const handleUpdate = () => {
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    const correctCount = parseInt(localStorage.getItem("correctCount") || "0", 10);

    if (db) {
      const transaction = db.transaction(["quizzes"], "readwrite");
      const store = transaction.objectStore("quizzes");

      const getRequest = store.get(quizId);
      getRequest.onsuccess = () => {
        const existingQuiz = getRequest.result;
        if (existingQuiz) {
          existingQuiz.title = title;
          existingQuiz.score = correctCount;

          const updateRequest = store.put(existingQuiz);
          updateRequest.onsuccess = () => {
            console.log("Quiz updated:", existingQuiz);
            localStorage.removeItem("correctCount");
            handleSuccess(); // ✅ Hiển thị Success.tsx và chuyển hướng sau 1.5s
            onSuccess();
          };
        }
      };

      getRequest.onerror = () => {
        alert("Error retrieving quiz from IndexedDB.");
      };
    }
  };

  return {
    title,
    setTitle,
    isExisting,
    handleSaveNew,
    handleUpdate,
    showSuccess,
    setShowSuccess,
  };
};

export default useQuizSave;
