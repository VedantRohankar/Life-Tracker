import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Dashboard = () => {
  const [user, setUser] = useState(null);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
   <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="min-h-screen bg-gray-900 text-white p-6"
>


      {/* 🧑 Header */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user.username} 👋
      </h1>

      {/* 🎮 Stats Card */}
    <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 200 }}
  className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md 
           hover:shadow-green-500/20"
>



        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Your Progress</h2>

        <p className="mb-2 text-gray-300">⚡ XP: {user.xp}</p>
        <p className="mb-2 text-gray-300">📈 Level: {user.level}</p>
        <p className="mb-4 text-gray-300">🏆 Rank: {user.rank}</p>


        {/* 🔥 XP Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4">
        <motion.div
        className="bg-green-500 h-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${user.xp % 100}%` }}
        transition={{ duration: 0.8 }}
        ></motion.div>

        </div>

      </motion.div>


      {/* 📋 Button to Tasks */}
      <Link to="/daily">
      <div className="mt-6">
        <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-blue-500 text-white px-5 py-2 rounded-xl"
>
  Go to Daily Tasks
</motion.button>

      </div>
      </Link>

    </motion.div>

  );
};

export default Dashboard;
