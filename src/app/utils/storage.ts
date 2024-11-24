import { Task } from "./types";

const TASKS_KEY = "tasks";

export const getTasks = (): Task[] => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }
  return [];
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
};
