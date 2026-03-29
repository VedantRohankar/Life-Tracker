import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaFire,
  FaUserAlt,
  FaTrophy,
  FaTasks
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 🔥 mobile toggle

  // 🧑 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(res.data);
    };

    fetchUser();
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 📌 Menu
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
    { name: "Streak", path: "/streak", icon: <FaFire /> },
    { name: "Progress", path: "/progress", icon: <FaUserAlt /> },
    { name: "Rank", path: "/rank", icon: <FaTrophy /> },
    { name: "Daily", path: "/daily", icon: <FaTasks /> },
    { name: "Profile", path: "/profile", icon: <FaUserAlt /> }
  ];

  return (
    <>
      {/* ☰ Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden 
        bg-[#18181b] p-2 rounded-lg text-white shadow-lg"
      >
        <div className="flex flex-col gap-[4px]">
          <span
            className={`w-5 h-[2px] bg-white transition ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`w-5 h-[2px] bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-5 h-[2px] bg-white transition ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* 🌑 Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* 📦 Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 
        bg-[#0f0f0f] border-r border-[#1f1f23] 
        text-white p-5 flex flex-col justify-between
        transform transition-transform duration-300 z-40

        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >

        {/* 🔝 Top Section */}
        <div>
          <div className="mb-10">

            {/* 👤 Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#18181b] mb-6">
              <div className="w-10 h-10 rounded-full 
              bg-gradient-to-tr from-green-400 to-emerald-600 
              flex items-center justify-center font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm text-gray-400">Welcome</p>
                <p className="font-semibold text-white">
                  {user?.username || "User"}
                </p>
              </div>
            </div>

            {/* 🔥 Logo */}
            <h2 className="text-xl font-semibold tracking-tight">
              <span className="text-green-400">●</span> Life Tracker
            </h2>
          </div>

          {/* 📌 Menu */}
          <ul className="space-y-2">
            {menu.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  to={item.path}
                  key={index}
                  onClick={() => setIsOpen(false)} // 🔥 close on mobile
                >
                  <motion.li
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                    ${
                      isActive
                        ? "text-green-400 bg-[#18181b]"
                        : "text-gray-400 hover:text-white hover:bg-[#18181b]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-r-full" />
                    )}

                    <span className="text-lg opacity-80">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </div>

        {/* 🔻 Bottom Section */}
        <div>
          {/* 🚪 Logout */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl
            text-red-400 bg-[#18181b] hover:bg-red-500/10
            transition-all duration-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>

          <p className="text-xs text-gray-600 mt-3 text-center">
            Built by Vedant 🚀
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;



