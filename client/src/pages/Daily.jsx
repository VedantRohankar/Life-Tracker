import { useEffect, useState } from "react";
import axios from "axios";

const Daily = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // 🟢 Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

  // 🔄 Load tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add Task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      fetchTasks();

    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  // ✅ Toggle Complete
  const toggleTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();

    } catch (err) {
      console.log("Error toggling task:", err);
    }
  };

  // ❌ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();

    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🧠 Title */}
      <h1 className="text-2xl font-bold mb-6">Daily Tasks 📋</h1>

      {/* ➕ Add Task */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* 📋 Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
            >
              {/* Task Title */}
              <span
                onClick={() => toggleTask(task._id)}
                className={`cursor-pointer ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-black"
                }`}
              >
                {task.title}
              </span>

              {/* Buttons */}
              <div className="flex gap-3 items-center">
                <span className="text-sm text-gray-500">
                  +{task.xpValue} XP
                </span>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Daily;
