"use client";

import React, { useState } from "react";

interface TaskFiltersProps {
  onSearchChange: (search: string) => void; // Callback for search input
  onStatusFilterChange: (statuses: string[]) => void; // Callback for status filters
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onSearchChange,
  onStatusFilterChange,
}) => {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const handleStatusFilter = (status: string) => {
    const updatedFilters = statusFilter.includes(status)
      ? statusFilter.filter((s) => s !== status)
      : [...statusFilter, status];
    setStatusFilter(updatedFilters);
    onStatusFilterChange(updatedFilters); // Notify parent about the change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value); // Notify parent about the search change
  };

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <input
        type="text"
        placeholder="Search by title or description"
        value={search}
        onChange={handleSearchChange}
        className="border rounded-md p-2"
      />
      <div className="flex space-x-2">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`px-4 py-2 rounded-md ${
              statusFilter.includes(status)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;
