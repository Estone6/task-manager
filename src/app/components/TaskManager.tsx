"use client";

import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import TaskFilters from "./TaskFilters";
import { Task } from "../utils/types";
import { getTasks } from "../utils/storage";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks || []);
    setFilteredTasks(storedTasks || []); // Initialize filtered tasks
  }, []);

  // Filter tasks whenever search or statusFilter changes
  useEffect(() => {
    let result = tasks;

    // Apply search filter
    if (search) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((task) => statusFilter.includes(task.status));
    }

    setFilteredTasks(result);
  }, [search, statusFilter, tasks]);

  return (
    <>
      <TaskFilters
        onSearchChange={setSearch} // Update search state
        onStatusFilterChange={setStatusFilter} // Update status filter state
      />
      <TaskTable initialTasks={filteredTasks} />
    </>
  );
};

export default TaskManager;
