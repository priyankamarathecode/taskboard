import { useEffect, useState } from "react";
import axios from "axios";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchMyTasks = async () => {
      const res = await axios.get("/api/tasks/my-tasks"); // Protected route
      setTasks(res.data);
    };
    fetchMyTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Assigned Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <span className="text-sm text-gray-600">Status: {task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
