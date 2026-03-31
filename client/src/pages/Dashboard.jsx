import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import API from "../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
    };

    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-white bg-[#0b0b0c]">
        Loading...
      </div>
    );

  const xpData =
    user?.xpHistory?.slice(-7).map((item) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short"
      }),
      xp: item.xp
    })) || [];

  return (
    <div className="flex bg-[#0b0b0c] min-h-screen">
      <Sidebar />

      <motion.div
        className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            XP Dashboard 📊
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Track your growth over time 🚀
          </p>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111113] border border-[#1f1f23] p-4 sm:p-6 rounded-2xl shadow-lg"
        >
          <div className="w-full h-[220px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpData}>
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;


