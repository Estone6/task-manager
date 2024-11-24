import TaskManager from "./components/TaskManager";

export const metadata = {
  title: "Task Management Dashboard",
  description: "Manage your tasks effectively with filters and actions",
};

const Home = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <TaskManager />
    </div>
  );
};

export default Home;
