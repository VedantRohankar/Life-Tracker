import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate , Link} from "react-router-dom";
import API from "../api";




const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        data
      );

      console.log(res.data);

      // store token
      localStorage.setItem("token", res.data.token);

       // ✅ redirect AFTER success
      navigate("/dashboard");

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

      <form onSubmit={handleSubmit}>
        
        {/* 🔥 Title */}
        <h2 className="text-2xl font-bold text-center mb-1 text-white">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 text-center text-sm mb-6">
          Login to continue your journey 🚀
        </p>

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
          className="w-full mb-4 p-3 
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
          Login
        </button>
      </form>

      {/* 🔗 Signup */}
      <p className="text-sm text-center mt-5 text-gray-400">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-green-400 font-semibold hover:underline"
        >
          Signup
        </Link>
      </p>

    </div>
  </div>
);



};

export default Login