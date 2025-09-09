// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
  FaSpinner,
  FaCalendarTimes,
  FaCalendarDay,
  FaPercent,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    tasksToday: 0,
    completionRate: 0,
  });

  const [selectedCard, setSelectedCard] = useState(null); // ⬅️ for detailed info modal

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/dashboard/admin-stats");
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  const detailsMap = {
    "Total Users": {
      icon: <FaUsers className="text-2xl text-blue-600" />,
      description: "All registered users in the system.",
    },
    "Total Tasks": {
      icon: <FaTasks className="text-2xl text-green-600" />,
      description: "Total number of tasks created across all users.",
    },
    "Completed Tasks": {
      icon: <FaCheckCircle className="text-2xl text-purple-600" />,
      description: "All tasks marked as completed by users.",
    },
    "Pending Tasks": {
      icon: <FaHourglassHalf className="text-2xl text-yellow-600" />,
      description: "Tasks that are yet to be started.",
    },
    "In Progress Tasks": {
      icon: <FaSpinner className="text-2xl text-orange-600 animate-spin" />,
      description: "Tasks currently being worked on.",
    },
    "Overdue Tasks": {
      icon: <FaCalendarTimes className="text-2xl text-red-600" />,
      description: "Tasks that are past their deadline.",
    },
    "Today's Tasks": {
      icon: <FaCalendarDay className="text-2xl text-sky-600" />,
      description: "Tasks scheduled for today.",
    },
    "Completion Rate": {
      icon: <FaPercent className="text-2xl text-teal-600" />,
      description: "Overall task completion percentage.",
    },
  };

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value={data.totalUsers}
          color="bg-blue-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Total Tasks"
          value={data.totalTasks}
          color="bg-green-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Completed Tasks"
          value={data.completedTasks}
          color="bg-purple-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Pending Tasks"
          value={data.pendingTasks}
          color="bg-yellow-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="In Progress Tasks"
          value={data.inProgressTasks}
          color="bg-orange-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Overdue Tasks"
          value={data.overdueTasks}
          color="bg-red-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Today's Tasks"
          value={data.tasksToday}
          color="bg-sky-100"
          onClick={handleCardClick}
        />
        <DashboardCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          color="bg-teal-100"
          onClick={handleCardClick}
        />
      </div>

      {/* 📌 Coming Soon Section */}
      <div className="mt-10 p-6 bg-white rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🚀 Coming Soon
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>📈 User activity graph</li>
          <li>🏅 Top performers</li>
          <li>🗂️ Task distribution by user</li>
          <li>📊 Interactive reports & filters</li>
        </ul>
      </div>

      {/* 🪟 Modal or Detail Box */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold mb-1 text-gray-800">
                {selectedCard}
              </div>
              {detailsMap[selectedCard]?.icon}
            </div>
            <p className="text-gray-700 text-sm">
              {detailsMap[selectedCard]?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({ title, value, color, onClick }) => (
  <div
    className={`p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition duration-200 ${color}`}
    onClick={() => onClick(title)}
  >
    <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default AdminDashboard;
