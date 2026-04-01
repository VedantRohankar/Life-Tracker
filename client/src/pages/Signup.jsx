import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";


const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/auth/register`,
        data
      );

      alert("User registered successfully!");

      // redirect to login
      navigate("/");

    } catch (err) {
      console.log(err.response.data);
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen 
  bg-[#0b0b0c] px-4 relative overflow-hidden">

    {/* 🌌 Background Glow */}
    <div className="absolute w-[500px] h-[500px] bg-green-500/20 
    blur-[120px] rounded-full top-[-100px] left-[-100px]" />

    <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 
    blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

    {/* 🧊 Glass Card */}
    <div className="relative z-10 w-full max-w-sm 
    bg-[#111113]/80 backdrop-blur-xl 
    border border-[#1f1f23] 
    p-6 rounded-2xl shadow-xl">

      {/* 🔥 Title */}
      <h2 className="text-2xl font-bold text-center mb-1 text-white">
        Create Account 🚀
      </h2>

      <p className="text-gray-400 text-center text-sm mb-6">
        Start your journey today 💪
      </p>

      <form onSubmit={handleSubmit}>
        
        {/* 👤 Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 p-3 
          bg-[#18181b] border border-[#27272a] 
          rounded-xl text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* 📧 Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 
          bg-[#18181b] border border-[#27272a] 
          rounded-xl text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* 🔒 Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 p-3 
          bg-[#18181b] border border-[#27272a] 
          rounded-xl text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* 🚀 Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 
          transition p-3 rounded-xl font-semibold 
          shadow-lg shadow-green-500/20"
        >
          Signup
        </button>
      </form>

      {/* 🔗 Login Redirect */}
      <p className="text-sm text-center mt-5 text-gray-400">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-green-400 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);

};

export default Signup;
