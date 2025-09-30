import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import API from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 🔹 Add new project
  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // 🔹 Update existing project
  const updateProject = (updatedProject) => {
    setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
  };

  // 🔹 Delete project
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-2 py-10">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center tracking-tight drop-shadow-sm">
            Your Projects
          </h1>

          {/* 🔹 Add Project Form (card container style) */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 mb-10 mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-green-700 mb-2 tracking-wide">
              Add a New Project
            </h2>
            <p className="text-gray-400 mb-4">Kickstart by creating something amazing.</p>
            <ProjectForm onSubmit={addProject} />
          </div>

          {/* 🔹 Show Projects */}
          <div className="mt-8">
            {loading ? (
              <div className="bg-blue-50 text-blue-400 text-center py-5 font-medium rounded-xl shadow">
                Loading projects...
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onUpdate={updateProject}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center bg-gray-50 text-gray-400 py-10 rounded-xl border border-dashed">
                No projects found.<br />
                <span className="font-medium text-gray-600">Start by adding your first project above!</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
