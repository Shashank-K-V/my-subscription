import React from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token"); // 🧹 clear token
    navigate("/login");               // 🔁 redirect
  };

  return (
    <header className="w-full flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        🧠 My SUBscription
      </h1>

      <div className="flex items-center gap-4">
        {/* 🌗 Dark/Light Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:scale-105 transition"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-default">
  👤      {localStorage.getItem("username") || "My Account"}
        </button>


        {/* 🚪 Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          title="Logout"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
}
