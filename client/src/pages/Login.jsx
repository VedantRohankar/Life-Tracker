import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate , Link} from "react-router-dom";



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
        "http://localhost:5000/api/auth/login",
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
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow-md w-80">

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* 🔗 Signup Redirect */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-semibold">
          Signup
        </Link>
      </p>

    </div>
  </div>
);


};

export default Login