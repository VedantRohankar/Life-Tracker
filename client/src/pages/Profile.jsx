import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import API from "../api";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const res = await axios.get(
      `${API}/api/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUser(res.data);
    setNewName(res.data.username);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 Upload Avatar
  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("avatar", image);

    await axios.put(
      "http://localhost:5000/api/user/upload-avatar",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    fetchUser();
  };

  // ✏️ Update Name
  const handleNameUpdate = async () => {
    await axios.put(
      "http://localhost:5000/api/user/update-name",
      { username: newName },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setEditing(false);
    fetchUser();
  };

  if (!user) return null;

  return (
    <div className="flex">
      <Sidebar />

      <motion.div
        className="md:ml-64 w-full min-h-screen bg-[#0b0b0c] text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 👤 HEADER */}
        <div className="flex items-center gap-6 mb-10">

          {/* 🖼 Avatar */}
          <div className="relative">

            <img
              src={
                user.avatar ||
                "https://via.placeholder.com/100"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border border-gray-700"
            />

            {/* Upload */}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 text-sm"
            />

            <button
              onClick={handleUpload}
              className="mt-2 bg-green-500 px-3 py-1 rounded text-sm"
            >
              Upload
            </button>
          </div>

          {/* 👤 INFO */}
          <div>

            {editing ? (
              <div className="flex gap-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-gray-800 px-3 py-1 rounded"
                />
                <button
                  onClick={handleNameUpdate}
                  className="bg-green-500 px-3 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 className="text-3xl font-bold flex items-center gap-3">
                {user.username}

                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-400"
                >
                  ✏️
                </button>
              </h1>
            )}

            <p className="text-gray-400">
              Keep grinding 🚀
            </p>

          </div>
        </div>

        {/* 🎮 STATS */}
        <div className="grid grid-cols-3 gap-6">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-6 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 mb-2">XP</h3>
            <p className="text-2xl font-bold text-green-400">
              {user.xp}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-6 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 mb-2">Level</h3>
            <p className="text-2xl font-bold text-blue-400">
              {user.level}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-6 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 mb-2">Rank</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {user.rank}
            </p>
          </motion.div>

        </div>

        {/* 📊 PROGRESS */}
        <div className="mt-10 bg-[#111113] p-6 rounded-2xl border border-[#1f1f23]">
          <h3 className="mb-4 text-gray-300">XP Progress</h3>

          <div className="w-full bg-gray-800 h-4 rounded-full">
            <motion.div
              className="bg-green-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${user.xp % 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;


