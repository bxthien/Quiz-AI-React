// 📌 src/utils/indexedDB.ts
import type { Quiz } from "../types/quiz";

const DB_NAME = "quizDB";
const STORE_NAME = "quizzes";
const DB_VERSION = 1;

// 🟢 Mở (hoặc tạo) IndexedDB
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Failed to open IndexedDB"));
  });
};

// 🟢 Lấy danh sách quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as Quiz[]);
      request.onerror = () => reject(new Error("Failed to fetch quizzes"));
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 🟢 Lưu quiz mới
export const saveQuiz = async (quiz: Omit<Quiz, "id">): Promise<number> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(quiz);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(new Error("Failed to save quiz"));
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
};

// 🔴 Xóa quiz
export const deleteQuiz = async (id: number): Promise<boolean> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error("Failed to delete quiz"));
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 🟠 Thêm dữ liệu giả nếu chưa có
export const seedDummyData = async () => {
  try {
    const quizzes = await getQuizzes();
    if (quizzes.length > 0) {
      console.log("✅ IndexedDB already contains data.");
      return;
    }

    const dummyQuizzes: Omit<Quiz, "id">[] = [
      { title: "Grade 10 Math Quiz", savedDate: "2025-05-15", score: "6/10" },
      {
        title: "Physics Semester 1 Quiz",
        savedDate: "2025-05-10",
        score: "8/10",
      },
      {
        title: "Chemistry Chapter 3 Exercise",
        savedDate: "2025-05-05",
        score: "7/10",
      },
      {
        title: "Mid-term Literature Quiz",
        savedDate: "2025-05-01",
        score: "9/10",
      },
      {
        title: "English Language Quiz",
        savedDate: "2025-04-28",
        score: "5/10",
      },
    ];

    for (const quiz of dummyQuizzes) {
      await saveQuiz(quiz);
    }
    console.log("✅ Dummy data added to IndexedDB.");
  } catch (error) {
    console.error("❌ Failed to seed dummy data:", error);
  }
};
