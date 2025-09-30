import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";

export default function ProjectCard({ project, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedProject) => {
    onUpdate(updatedProject); // backend returns updated project
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between">
      {isEditing ? (
        <ProjectForm onSubmit={handleEdit} initialData={project} />
      ) : (
        <>
          <Link to={`/projects/${project._id}`} className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 line-clamp-3">{project.description}</p>
          </Link>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-1 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 shadow-md transition-colors"
              onClick={() => setIsEditing(true)}
              aria-label="Edit Project"
            >
              Edit
            </button>
            <button
              className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 shadow-md transition-colors"
              onClick={() => onDelete(project._id)}
              aria-label="Delete Project"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
