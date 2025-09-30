import React, { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedTask) => {
    onUpdate(updatedTask); // Pass full task object with _id
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 transition hover:shadow-lg">
      {isEditing ? (
        <TaskForm onSubmit={handleEdit} initialData={task} />
      ) : (
        <>
          <div className="flex flex-col text-gray-800">
            <h4 className="text-lg font-semibold leading-tight">{task.title}</h4>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">Status:</span> {task.status}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
              aria-label="Edit Task"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
              aria-label="Delete Task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
