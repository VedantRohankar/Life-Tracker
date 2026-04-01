import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import API from "../api";


const Progress = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${API}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row bg-[#0b0b0c] min-h-screen">
      <Sidebar />

      <div className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white overflow-x-hidden bg-[#0f0f0f] p-6 text-white">

       <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          🎮 Progress
        </h1>
        <p className="text-gray-500 mb-6">
          Level up your daily performance
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 shadow-lg"
        >

          <p className="text-gray-400 text-sm">Total XP</p>
          <p className="text-4xl font-bold text-green-400">
            {user.xp}
          </p>

          <p className="text-gray-400 mt-4 text-sm">Current Level</p>
          <p className="text-xl font-semibold">
            {user.level}
          </p>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress to next level</span>
              <span>{user.xp % 100}%</span>
            </div>

            <div className="w-full h-3 bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-500 rounded-full transition-all duration-700 shadow-md shadow-green-500/30"
                style={{ width: `${user.xp % 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-[#0f0f0f] p-4 rounded-xl border border-[#27272a]">
              <p className="text-gray-400 text-sm">Next Level</p>
              <p className="text-lg font-semibold text-green-400">
                {user.level + 1}
              </p>
            </div>

            <div className="bg-[#0f0f0f] p-4 rounded-xl border border-[#27272a]">
              <p className="text-gray-400 text-sm">XP Needed</p>
              <p className="text-lg font-semibold">
                {100 - (user.xp % 100)}
              </p>
            </div>

          </div>

        </motion.div>

      </div>
      </div>
    </div>
  );
};

export default Progress;

