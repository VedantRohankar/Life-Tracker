import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import API from "../api";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
const [streak, setStreak] = useState(0);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
    const fetchExtraData = async () => {
  const token = localStorage.getItem("token");

  // tasks
  const taskRes = await axios.get(`${API}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setTasks(taskRes.data);

  // streak
  const streakRes = await axios.get(`${API}/api/tasks/streak`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setStreak(streakRes.data.streak);
};

fetchExtraData();
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

    const completedToday = tasks.filter(t => t.completed).length;

const consistency = Math.min(streak * 5, 100);
const intensity = Math.min(completedToday * 20, 100);
const mindStrength = Math.min((streak * 3 + user.xp / 50), 100);

const pieData = [
  { name: "Consistency", value: consistency },
  { name: "Intensity", value: intensity },
  { name: "Mind", value: mindStrength }
];

const COLORS = ["#22c55e", "#facc15", "#a855f7"];
// 🧠 Insight logic-AI
const xpHistory = user?.xpHistory || [];

let improvement = 0;

if (xpHistory.length >= 7) {
  const lastWeek = xpHistory.slice(-7);

  const first = lastWeek[0].xp;
  const last = lastWeek[lastWeek.length - 1].xp;

  if (first !== 0) {
    improvement = ((last - first) / first) * 100;
  }
}
const getMessage = () => {
  if (improvement > 20) return "🔥 Insane growth! Keep dominating!";
  if (improvement > 10) return "🚀 Great progress! Stay consistent!";
  if (improvement > 0) return "👍 You're improving, keep going!";
  return "⚠️ Push harder this week!";
};


  return (
    <div className="flex flex-col md:flex-row bg-[#0b0b0c] min-h-screen">

      <Sidebar />

      <motion.div
  className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-screen-xl mx-auto">

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
          className="bg-[#111113]/80 backdrop-blur-lg border border-[#1f1f23] p-4 sm:p-6 rounded-2xl shadow-lg"

        >
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 
  border border-green-500/20 p-5 rounded-2xl mb-6
  backdrop-blur-lg"
>
  <h2 className="text-lg font-semibold text-green-400 mb-1">
    📈 Weekly Insight
  </h2>

  <p className="text-white text-sm sm:text-base">
    You improved{" "}
    <span className="text-green-400 font-bold">
      {improvement.toFixed(1)}%
    </span>{" "}
    this week 🚀
  </p>

  <p className="text-gray-400 text-xs mt-1">
  {getMessage()}
</p>

</motion.div>

            {/* 🔥 STATS */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">

  {/* XP */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#111113] border border-[#1f1f23] p-4 rounded-xl"
  >
    <p className="text-gray-400 text-sm">XP</p>
    <h2 className="text-2xl font-bold text-green-400">
      {user.xp}
    </h2>
  </motion.div>

  {/* STREAK */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#111113] border border-[#1f1f23] p-4 rounded-xl"
  >
    <p className="text-gray-400 text-sm">🔥 Streak</p>
    <h2 className="text-2xl font-bold text-orange-400">
      {streak}
    </h2>
  </motion.div>

  {/* TASKS */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#111113] border border-[#1f1f23] p-4 rounded-xl"
  >
    <p className="text-gray-400 text-sm">Tasks Done</p>
    <h2 className="text-2xl font-bold text-blue-400">
      {completedToday}
    </h2>
  </motion.div>

</div>

         <div className="w-full h-[220px] sm:h-[300px] overflow-hidden">
            <ResponsiveContainer width="99%" height="100%">

              
              <AreaChart data={xpData}>
                
                {/* Gradient */}
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#222" />

                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fill="url(#colorXp)"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

{/* PIE CHART */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
 className="bg-[#18181b]/80 backdrop-blur-lg border border-[#27272a] p-6 rounded-2xl shadow-lg mt-8"

>
  <h2 className="text-xl font-semibold mb-4">
    🧠 Growth Metrics
  </h2>

  <ResponsiveContainer width="100%" height={260}>
  <PieChart>

    <defs>
  {/* 🟢 Consistency (Main Neon Green) */}
  <linearGradient id="gradConsistency" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#4ade80" />
    <stop offset="50%" stopColor="#22c55e" />
    <stop offset="100%" stopColor="#166534" />
  </linearGradient>

  {/* ⚡ Intensity (Electric Green Mix) */}
  <linearGradient id="gradIntensity" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#22c55e" />
    <stop offset="50%" stopColor="#15803d" />
    <stop offset="100%" stopColor="#052e16" />
  </linearGradient>

  {/* 🧠 Mind Strength (Dark Emerald Glow) */}
  <linearGradient id="gradMind" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#86efac" />
    <stop offset="50%" stopColor="#16a34a" />
    <stop offset="100%" stopColor="#022c22" />
  </linearGradient>

  {/* ✨ Glow Effect */}
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>


    <Pie
     data={pieData}
  dataKey="value"
  outerRadius={100}
  innerRadius={60}
  paddingAngle={4}
  stroke="#0f0f0f"
  strokeWidth={2}
  filter="url(#glow)"
  activeOuterRadius={110} // 🔥 hover expand
    >
      {pieData.map((_, index) => {
        const gradients = [
          "url(#gradConsistency)",
          "url(#gradIntensity)",
          "url(#gradMind)"
        ];
        return <Cell key={index} fill={gradients[index]} />;
      })}
    </Pie>

    <Tooltip
  contentStyle={{
    background: "rgba(24, 24, 27, 0.9)",
    border: "1px solid #27272a",
    borderRadius: "10px",
    color: "#e5e7eb"
  }}
  cursor={{ fill: "transparent" }} // removes hover overlay
/>


    <Legend />

   <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  fill="#e5e7eb"
  fontSize="20"
  fontWeight="700"
>
  {Math.round((consistency + intensity + mindStrength) / 3)}%
</text>


  </PieChart>
</ResponsiveContainer>


</motion.div>
</div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
