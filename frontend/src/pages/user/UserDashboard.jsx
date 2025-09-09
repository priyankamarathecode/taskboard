// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

const UserDashboard = () => {
  const [summary, setSummary] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    API.get("/tasks/my-tasks").then((res) => {
      const tasks = res.data;
      setSummary({
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "Complete").length,
        pending: tasks.filter((t) => t.status === "Pending").length,
      });
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Tasks" count={summary.total} />
        <Card title="Completed" count={summary.completed} />
        <Card title="Pending" count={summary.pending} />
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div className="bg-white shadow p-6 rounded-lg text-center">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold mt-2 text-blue-600">{count}</p>
  </div>
);

export default UserDashboard;
