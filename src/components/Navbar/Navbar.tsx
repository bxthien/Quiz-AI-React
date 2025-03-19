import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MenuProps, Dropdown, Avatar, Button } from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [isOpen, setIsOpen] = useState(false); // ✅ Thêm state cho menu mobile

  // Cập nhật user khi component render
  useEffect(() => {
    console.log("User từ AuthContext:", user);
    if (user) {
      setCurrentUser(user);
    } else {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("User từ localStorage:", parsedUser);
          setCurrentUser(parsedUser);
        } catch (error) {
          console.error("Lỗi parse user:", error);
        }
      }
    }
  }, [user]);

  // ✅ Định nghĩa menu theo đúng kiểu `MenuProps['items']`
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Link to="/user-profile">
          <UserOutlined className="mr-2" />
          Profile
        </Link>
      ),
    },
    { type: "divider" }, // ✅ Divider đúng kiểu
    {
      key: "logout",
      label: (
        <span className="text-red-500">
          <LogoutOutlined className="mr-2" />
          Đăng xuất
        </span>
      ),
      danger: true,
      onClick: () => {
        logout();
        setCurrentUser(null);
      },
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold text-gray-800">
          Quiz App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/saved-quiz" className="hover:text-blue-500 transition">
            Saved Quiz
          </Link>
          <Link to="/chat" className="hover:text-blue-500 transition">
            Generate Quiz
          </Link>
          <Link to="/user-profile" className="hover:text-blue-500 transition">
            User Profile
          </Link>
          <Link to="/quiz-review" className="block hover:text-blue-500">
            Quiz Review
          </Link>

          {/* Hiển thị thông tin User */}
          {currentUser ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <Avatar
                  size="large"
                  src={currentUser.avatar || <UserOutlined />}
                />
                <span className="ml-2 text-gray-700 font-medium">
                  {currentUser.username || "User"}
                </span>
                <DownOutlined className="ml-2 text-gray-500" />
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button type="primary">Đăng nhập</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu" // ✅ Thêm mô tả cho button
          title="Open menu" // ✅ Hiển thị khi hover
        >
          <MenuOutlined className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-3">
          <Link to="/home" className="block hover:text-blue-500">
            Home
          </Link>
          <Link to="/saved-quiz" className="block hover:text-blue-500">
            Saved Quiz
          </Link>

          <Link to="/chat" className="block hover:text-blue-500">
            Generate Quiz
          </Link>
          <Link to="/user-profile" className="block hover:text-blue-500">
            User Profile
          </Link>

          <div className="mt-4">
            {currentUser ? (
              <>
                <p className="text-gray-700 font-medium">
                  {currentUser.username}
                </p>
                <button
                  onClick={() => {
                    logout();
                    setCurrentUser(null);
                  }}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition block w-full text-center"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button type="primary" block>
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
