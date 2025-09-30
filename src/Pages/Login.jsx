import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-400 via-white to-green-200">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-2xl border border-blue-100">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-2 tracking-tight">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-8 text-base font-medium">
          Login to your Task Tracker account
        </p>
        {error && (
          <div className="bg-red-50 text-red-600 rounded-md text-center py-2 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="mail@example.com"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-green-400 text-white font-bold tracking-wider shadow-lg hover:scale-105 transition-all hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-600 mt-8">
          New user?
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-bold cursor-pointer hover:underline ml-2"
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
