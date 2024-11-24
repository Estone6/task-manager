"use client";

import React, { useState, useEffect } from "react";
import { Task } from "../utils/types";

interface TaskFormModalProps {
  visible: boolean; // Whether the modal is open or not
  onClose: () => void; // Callback to close the modal
  onSubmit: (task: Task) => void; // Callback for submitting a new or edited task
  initialTask?: Task | null; // Initial task data for editing (optional)
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">("Pending");
  const [error, setError] = useState<string>("");

  // Initialize fields when modal opens
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setDueDate(initialTask.dueDate);
      setStatus(initialTask.status);
    } else {
      resetForm();
    }
  }, [initialTask]);

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
    setError("");
  };

  // Validate that the due date is today or in the future
  const validateDueDate = (date: string): boolean => {
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return selectedDate >= today; // Returns true if the date is valid
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !dueDate) {
      setError("Title and Due Date are required!");
      return;
    }

    if (!validateDueDate(dueDate)) {
      setError("Due date cannot be in the past.");
      return;
    }

    onSubmit({
      id: initialTask?.id || Date.now(),
      title,
      description,
      dueDate,
      status,
    });

    resetForm();
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">{initialTask ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Pending" | "In Progress" | "Completed")
              }
              className="w-full border rounded-md p-2"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {initialTask ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm(); // Reset fields when closing
                onClose();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
