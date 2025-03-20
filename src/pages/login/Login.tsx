"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Checkbox, Spin } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { seedFakeUsers, getUserByEmail } from "../../utils/indexedDB";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 📌 Schema validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    seedFakeUsers();
  }, []);

  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // ✅ Lấy hàm login từ AuthContext

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type LoginForm = {
    email: string;
    password: string;
  };

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      setLoading(true);

      try {
        const user = (await getUserByEmail(data.email)) as {
          email: string;
          password: string;
          username: string;
          avatar?: string;
        } | null;

        if (!user) {
          alert("Email không tồn tại!");
          return;
        }

        if (user.password !== data.password) {
          alert("Mật khẩu không đúng!");
          return;
        }

        alert("Đăng nhập thành công!");

        // ✅ Gọi hàm login từ AuthContext để cập nhật state
        login({
          email: user.email,
          username: user.username,
          avatar: user.avatar || "",
        });

        // ✅ Chuyển hướng ngay sau khi login
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error);
        alert("Đã xảy ra lỗi khi đăng nhập!");
      } finally {
        setLoading(false);
      }
    },
    [login, navigate] // Thêm navigate vào dependencies
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="w-full max-w-md px-6 py-8 mx-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-center justify-center mb-8">
              <img src="/logo.png" alt="Quiz AI Logo" className="w-20" />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Welcome to</h2>
                <h1 className="text-2xl text-center font-extrabold text-blue-600">
                  Quiz AI
                </h1>
              </div>
            </div>

            <Form
              layout="vertical"
              onFinish={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email Field */}
              <Form.Item
                label={<span className="text-gray-700 font-medium">Email</span>}
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="example@gmail.com"
                      className="h-11 rounded-lg"
                    />
                  )}
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="******"
                      className="h-11 rounded-lg"
                    />
                  )}
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <Checkbox className="text-gray-600">Remember me</Checkbox>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  height: "44px",
                  borderRadius: "0.5rem",
                  backgroundColor: "#3b82f6",
                  borderColor: "#3b82f6",
                }}
                className="shadow-md hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Sign In"}
              </Button>
            </Form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Register
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-white text-sm opacity-80">
          © {new Date().getFullYear()} Quiz AI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
