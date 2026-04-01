import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import API from "../api";


const Daily = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
  if (!title.trim()) return;

  await axios.post(
    `${API}/api/tasks`,   // ✅ FIXED
    { title },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setTitle("");
  fetchTasks();
};

const toggleTask = async (id) => {
  await axios.put(
    `${API}/api/tasks/${id}`,   // ✅ FIXED
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  fetchTasks();
};

const deleteTask = async (id) => {
  await axios.delete(
    `${API}/api/tasks/${id}`,   // ✅ FIXED
    { headers: { Authorization: `Bearer ${token}` } }
  );

  fetchTasks();
};


  return (
   <div className="flex flex-col md:flex-row bg-[#0b0b0c] min-h-screen">

      <Sidebar />

      <div className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white overflow-x-hidden bg-[#0f0f0f] p-6 text-white">
          <div className="max-w-screen-xl mx-auto">

        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          📋 Daily Tasks
        </h1>
        <p className="text-gray-500 mb-6">
          Complete tasks to earn XP ⚡
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 bg-[#18181b] border border-[#27272a] 
            rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addTask}
            className="bg-green-500 px-5 rounded-xl font-semibold 
            shadow-md shadow-green-500/30"
          >
            Add
          </motion.button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No tasks yet 🚀 Start by adding one!
            </p>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#18181b] border border-[#27272a] 
                p-4 rounded-2xl flex justify-between items-center
                shadow-md hover:shadow-green-500/10 transition-all"
              >
                <span
                  onClick={() => toggleTask(task._id)}
                  className={`cursor-pointer text-lg ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex gap-3 items-center">

                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    +{task.xpValue} XP
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => deleteTask(task._id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✖
                  </motion.button>

                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
      </div>

    </div>
  );
};

export default Daily;

