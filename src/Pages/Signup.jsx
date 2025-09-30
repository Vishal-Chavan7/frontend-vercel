import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-white to-blue-400">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-2xl border border-green-100">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-2 tracking-tight">
          Welcome to Task Tracker
        </h2>
        <p className="text-center text-gray-500 mb-8 text-base font-medium">
          Fill the form to create your account
        </p>
        {error && (
          <div className="bg-red-50 text-red-600 rounded-md text-center py-2 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-green-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-green-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="mail@example.com"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-green-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-tr from-green-600 via-green-500 to-blue-500 text-white font-bold tracking-wider shadow-lg hover:scale-105 transition-all hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm text-gray-600 mt-8">
          Already registered?
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-bold cursor-pointer hover:underline ml-2"
          >
            Login Now
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
