import type { Quiz } from "../types/quiz";

const DB_NAME = "quizDB";
const DB_VERSION = 1;

// Store names
const USERS_STORE = "users";
const QUIZZES_STORE = "quizzes";
const CURRENT_USER_STORE = "currentUser"; // 🆕 Lưu user đang đăng nhập

// 🟢 Mở (hoặc tạo) IndexedDB
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const userStore = db.createObjectStore(USERS_STORE, {
          keyPath: "email",
        });
        userStore.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains(QUIZZES_STORE)) {
        db.createObjectStore(QUIZZES_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(CURRENT_USER_STORE)) {
        db.createObjectStore(CURRENT_USER_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Failed to open IndexedDB"));
  });
};

// 🟢 Đăng ký User (kèm Avatar)
export const addUser = async (user: {
  email: string;
  password: string;
  username: string;
  avatar?: string;
}) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USERS_STORE, "readwrite");
    const store = transaction.objectStore(USERS_STORE);

    // Kiểm tra user đã tồn tại chưa
    const checkRequest = store.get(user.email);
    checkRequest.onsuccess = () => {
      if (checkRequest.result) {
        reject(new Error("User already exists!"));
      } else {
        const addRequest = store.add(user);
        addRequest.onsuccess = () => resolve(true);
        addRequest.onerror = () => reject(new Error("Failed to register user"));
      }
    };
  });
};

// 🟢 Lấy user theo email
export const getUserByEmail = async (email: string) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USERS_STORE, "readonly");
    const store = transaction.objectStore(USERS_STORE);
    const request = store.get(email);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(new Error("Failed to fetch user"));
  });
};

// 🟢 Lưu User đang đăng nhập
export const setCurrentUser = async (user: {
  email: string;
  username: string;
  avatar?: string;
}) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_USER_STORE, "readwrite");
    const store = transaction.objectStore(CURRENT_USER_STORE);
    const request = store.put(user, "currentUser");

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(new Error("Failed to save current user"));
  });
};

// 🟢 Lấy User đang đăng nhập
export const getCurrentUser = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_USER_STORE, "readonly");
    const store = transaction.objectStore(CURRENT_USER_STORE);
    const request = store.get("currentUser");

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(new Error("Failed to fetch current user"));
  });
};

// 🟢 Lấy danh sách quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readonly");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Quiz[]);
    request.onerror = () => reject(new Error("Failed to fetch quizzes"));
  });
};

// 🟢 Lưu quiz mới
export const saveQuiz = async (quiz: Omit<Quiz, "id">): Promise<number> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readwrite");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.add(quiz);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(new Error("Failed to save quiz"));
  });
};

// 🔴 Xóa quiz
export const deleteQuiz = async (id: number): Promise<boolean> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readwrite");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(new Error("Failed to delete quiz"));
  });
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

// 🟠 Thêm user giả nếu chưa có
export const seedFakeUsers = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction(USERS_STORE, "readonly");
    const store = transaction.objectStore(USERS_STORE);
    const request = store.getAll();

    request.onsuccess = async () => {
      if (request.result.length > 0) {
        console.log("✅ Fake users already exist.");
        return;
      }

      const fakeUsers = [
        {
          email: "user1@gmail.com",
          password: "12345678",
          username: "mixihuyen",
          avatar: "https://i.pravatar.cc/150?u=user1",
        },
        {
          email: "user2@gmail.com",
          password: "12345678",
          username: "thinhnguyen",
          avatar: "https://i.pravatar.cc/150?u=user2",
        },
        {
          email: "admin@gmail.com",
          password: "12345678",
          username: "anhminh",
          avatar: "https://i.pravatar.cc/150?u=admin",
        },
      ];

      for (const user of fakeUsers) {
        await addUser(user);
      }

      console.log("✅ Fake users added to IndexedDB.");
    };

    request.onerror = () => console.error("❌ Failed to fetch users.");
  } catch (error) {
    console.error("❌ Failed to seed fake users:", error);
  }
};
