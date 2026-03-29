import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import API from "../api";


const Streak = () => {
  const [streakData, setStreakData] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/api/tasks/streak`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStreak(res.data.streak);

      const last28Days = [];

      for (let i = 27; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);

        const formatted = d.toDateString();

        last28Days.push(
          res.data.dates.includes(formatted) ? 1 : 0
        );
      }

      setStreakData(last28Days);
    };

    fetchStreak();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="md:ml-64 w-full min-h-screen bg-[#0f0f0f] p-6 text-white">

        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          🔥 {streak} Day Streak
        </h1>
        <p className="text-gray-500 mb-6">
          Your daily consistency tracker
        </p>

        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 shadow-lg">

          <div className="grid grid-cols-7 gap-3">
            {streakData.map((day, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`w-8 h-8 rounded-md transition-all duration-300
                ${
                  day
                    ? "bg-green-500 shadow-md shadow-green-500/30 hover:scale-110"
                    : "bg-[#27272a]"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-500 mt-4 text-sm">
            Last 28 days activity
          </p>

        </div>

      </div>
    </div>
  );
};

export default Streak;

