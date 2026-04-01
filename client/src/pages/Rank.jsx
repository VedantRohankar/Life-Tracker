import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";


const Rank = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${API}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));
  }, []);

  const ranks = [
    { name: "Beginner", level: "1 – 5", color: "border-gray-500", glow: "shadow-gray-500/20" },
    { name: "Intermediate", level: "6 – 10", color: "border-blue-500", glow: "shadow-blue-500/20" },
    { name: "Advanced", level: "11 – 20", color: "border-purple-500", glow: "shadow-purple-500/20" },
    { name: "Pro", level: "21+", color: "border-yellow-500", glow: "shadow-yellow-500/20" }
  ];

  const getUserRank = (level) => {
    if (level <= 5) return "Beginner";
    if (level <= 10) return "Intermediate";
    if (level <= 20) return "Advanced";
    return "Pro";
  };

  const currentRank = user ? getUserRank(user.level) : "";

  return (
    <div className="flex flex-col md:flex-row bg-[#0b0b0c] min-h-screen">
      <Sidebar />

      <div className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white overflow-x-hidden bg-[#0f0f0f] p-6 text-white">

         <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          🏆 Rank System
        </h1>
        <p className="text-gray-500 mb-6">
          Level up to unlock higher tiers
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {ranks.map((rank, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`bg-[#18181b] border ${rank.color} ${rank.glow}
              rounded-2xl p-6 transition-all duration-300
              ${currentRank === rank.name ? "ring-2 ring-green-500 scale-105" : ""}
              `}
            >
              <h2 className="text-xl font-semibold mb-2">
                {rank.name}
              </h2>

              <p className="text-gray-400">
                Level {rank.level}
              </p>

              {currentRank === rank.name && (
                <p className="text-green-400 text-sm mt-2">
                  🚀 Your Current Rank
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
      </div>
    </div>
  );
};

export default Rank;

