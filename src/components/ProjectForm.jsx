import React, { useState } from "react";
import API from "../api";

export default function ProjectForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      let res;
      if (initialData._id) {
        // Update existing project
        res = await API.put(
          `/projects/${initialData._id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new project
        res = await API.post(
          "/projects",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSubmit(res.data);

      if (!initialData._id) {
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      console.error("Error saving project:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl shadow-lg border border-blue-100 max-w-lg mx-auto space-y-6"
    >
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 outline-none text-lg font-semibold transition"
        required
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 outline-none resize-none min-h-[120px] text-gray-700 transition"
      ></textarea>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Saving..."
          : initialData._id
          ? "Update Project"
          : "Save Project"}
      </button>
    </form>
  );
}
