import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/tasks/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t._id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 px-8 py-8 mb-10">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-2 text-center tracking-tight">
            Project Tasks
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Manage all your tasks in one place
          </p>
          <div className="mb-6">
            <TaskForm onSubmit={addTask} projectId={projectId} />
          </div>
        </div>
        <div>
          {loading ? (
            <div className="bg-blue-50 text-blue-400 py-5 text-center font-semibold rounded-xl shadow">
              Loading tasks...
            </div>
          ) : tasks.length > 0 ? (
            <div className="space-y-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 text-gray-400 py-12 text-center rounded-xl border border-dashed border-gray-200">
              <span className="block mb-2 text-lg">No tasks found.</span>
              <span>Add some tasks to get started!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
