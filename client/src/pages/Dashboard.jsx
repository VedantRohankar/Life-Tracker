import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

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

  if (!user) return <h2 className="text-center mt-10">Loading...</h2>;

  const xpData = user?.xpHistory
    ?.slice(-7)
    .map((item) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short"
      }),
      xp: item.xp
    })) || [];

  return (
    <div className="flex">
  <Sidebar />

  <motion.div
    className="md:ml-64 w-full min-h-screen bg-[#0f0f0f] text-white p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-3xl font-bold mb-1 tracking-tight">
      XP Dashboard 📊
    </h1>
    <p className="text-gray-500 mb-6">
      Track your growth over time
    </p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl shadow-lg"
    >
      <ResponsiveContainer width="100%" height={300}>
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
    </motion.div>

  </motion.div>
</div>

  );
};

export default Dashboard;

