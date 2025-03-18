"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  email: string;
  username: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra trạng thái đăng nhập khi app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Lỗi khi parse user:", error);
        localStorage.removeItem("user"); // Xóa dữ liệu lỗi
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    // Nếu chưa đăng nhập và không ở trang login, chuyển hướng về login
    if (!storedUser && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]); // Lắng nghe thay đổi đường dẫn để xử lý

  // Lắng nghe thay đổi từ localStorage (đồng bộ giữa các tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Hàm đăng nhập
  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu đúng JSON
    setUser(userData);
    setIsAuthenticated(true);
    navigate("/home"); // Chuyển hướng sau khi đăng nhập
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login", { replace: true }); // Chuyển hướng sau khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
