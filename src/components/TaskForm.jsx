import React, { useState } from "react";

export default function TaskForm({ onSubmit, initialData = {}, projectId }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [status, setStatus] = useState(initialData.status || "Pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      let res;
      if (initialData._id) {
        // Update task
        res = await API.put(
          `/tasks/${initialData._id}`,
          { title, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create task
        res = await API.post(
          `/tasks`,
          { title, status, projectId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSubmit(res.data);

      if (!initialData._id) {
        setTitle("");
        setStatus("Pending");
      }
    } catch (err) {
      console.error("Error saving task:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-5 py-3 rounded-xl font-semibold text-white shadow transition duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Saving..." : initialData._id ? "Update Task" : "Save Task"}
      </button>
    </form>
  );
}
