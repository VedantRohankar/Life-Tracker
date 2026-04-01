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

  // 🔄 Fetch User
  const fetchUser = async () => {
    const res = await axios.get(`${API}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setUser(res.data);
    setNewName(res.data.username);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🖼 Upload Avatar
  const handleUpload = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image); // FIXED

  try {
    await axios.put(`${API}/api/user/upload-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    setImage(null);
    fetchUser();
  } catch (err) {
    console.log("Upload error:", err);
  }
};


  // ✏️ Update Name
  const handleNameUpdate = async () => {
    try {
      await axios.put(
        `${API}/api/user/update-name`,
        { username: newName },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setEditing(false);
      fetchUser();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row bg-[#0b0b0c] min-h-screen">
      <Sidebar />

      <motion.div
        className="w-full md:ml-64 px-4 sm:px-6 md:px-10 py-6 text-white overflow-x-hidden bg-[#0b0b0c] text-white p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-screen-xl mx-auto">
        {/* 🔝 HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">

          {/* 🖼 Avatar Section */}
          <div className="flex flex-col items-center gap-3">

            <img
              src={
                user.avatar ||
                "https://via.placeholder.com/100"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border border-[#27272a]"
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-xs text-gray-400"
            />

            <button
              onClick={handleUpload}
              className="bg-green-500 px-4 py-1 rounded-lg text-sm font-semibold 
              hover:bg-green-600 transition"
            >
              Upload
            </button>
          </div>

          {/* 👤 USER INFO */}
          <div className="text-center md:text-left">

            {editing ? (
              <div className="flex gap-2 justify-center md:justify-start">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-[#18181b] px-3 py-2 rounded-lg border border-[#27272a]"
                />
                <button
                  onClick={handleNameUpdate}
                  className="bg-green-500 px-3 rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
                {user.username}

                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-green-400"
                >
                  ✏️
                </button>
              </h1>
            )}

            <p className="text-gray-400 text-sm mt-1">
              Keep grinding 🚀
            </p>

          </div>
        </div>

        {/* 🎮 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-5 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 text-sm mb-1">XP</h3>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {user.xp}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-5 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 text-sm mb-1">Level</h3>
            <p className="text-xl md:text-2xl font-bold text-blue-400">
              {user.level}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111113] p-5 rounded-2xl border border-[#1f1f23]"
          >
            <h3 className="text-gray-400 text-sm mb-1">Rank</h3>
            <p className="text-xl md:text-2xl font-bold text-yellow-400">
              {user.rank}
            </p>
          </motion.div>

        </div>

        {/* 📊 PROGRESS */}
        <div className="mt-8 bg-[#111113] p-5 md:p-6 rounded-2xl border border-[#1f1f23]">
          <h3 className="mb-3 text-gray-300 text-sm">
            XP Progress
          </h3>

          <div className="w-full bg-gray-800 h-3 rounded-full">
            <motion.div
              className="bg-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${user.xp % 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
            </div>
      </motion.div>
    </div>
  );
};

export default Profile;
