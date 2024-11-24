"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../utils/types";
import TaskFormModal from "./TaskFormModal";
import { saveTasks } from "../utils/storage";

interface TaskTableProps {
  initialTasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleSubmitTask = (task: Task) => {
    let updatedTasks;
    if (editingTask) {
      updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    } else {
      updatedTasks = [...tasks, { ...task, id: Date.now() }];
    }
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {setEditingTask(null);setIsModalVisible(true)}}
          className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-[6.6rem]"
        >
          + Add Task
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-300 px-4 py-2">{task.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {task.description || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{task.dueDate}</td>
              <td className="border border-gray-300 px-4 py-2">{task.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setEditingTask(task);
                    setIsModalVisible(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TaskFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmitTask}
        initialTask={editingTask}
      />
    </div>
  );
};

export default TaskTable;
