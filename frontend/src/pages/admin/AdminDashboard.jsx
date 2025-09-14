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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#34D399", "#FBBF24", "#F87171"];

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboardData();
    fetchTaskDistribution();
    fetchTopPerformers();
  }, []);

  const fetchDashboardData = async () => {
    const res = await API.get("/dashboard/admin-stats");
    setData(res.data);
  };

  const fetchTaskDistribution = async () => {
    const res = await API.get("/dashboard/task-distribution");
    setDistribution(res.data);
  };

  const fetchTopPerformers = async () => {
    const res = await API.get("/dashboard/top-performers");
    setTopPerformers(res.data.performers);
  };

  const handleShowUsers = async () => {
    const res = await API.get("/dashboard/users");
    setUsers(res.data);
    setModalType("users");
  };

  const handleShowTasks = async (type) => {
    const res = await API.get(`/dashboard/${type}-tasks`);
    setTasks(res.data);
    setModalType(type);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value={data.totalUsers}
          color="bg-blue-100"
          icon={<FaUsers className="text-blue-600 text-2xl" />}
          onClick={handleShowUsers}
        />
        <DashboardCard
          title="Pending Tasks"
          value={data.pendingTasks}
          color="bg-yellow-100"
          icon={<FaHourglassHalf className="text-yellow-600 text-2xl" />}
          onClick={() => handleShowTasks("pending")}
        />
        <DashboardCard
          title="Completed Tasks"
          value={data.completedTasks}
          color="bg-green-100"
          icon={<FaCheckCircle className="text-green-600 text-2xl" />}
          onClick={() => handleShowTasks("completed")}
        />
        <DashboardCard
          title="In Progress Tasks"
          value={data.inProgressTasks}
          color="bg-orange-100"
          icon={<FaSpinner className="text-orange-600 animate-spin text-2xl" />}
          onClick={() => handleShowTasks("in-progress")}
        />
        <DashboardCard
          title="Overdue Tasks"
          value={data.overdueTasks}
          color="bg-red-100"
          icon={<FaCalendarTimes className="text-red-600 text-2xl" />}
        />
        <DashboardCard
          title="Today's Tasks"
          value={data.tasksToday}
          color="bg-sky-100"
          icon={<FaCalendarDay className="text-sky-600 text-2xl" />}
        />
        <DashboardCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          color="bg-teal-100"
          icon={<FaPercent className="text-teal-600 text-2xl" />}
        />
      </div>

      {/* Task Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">📊 Task Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={distribution}
              dataKey="count"
              nameKey="_id"
              outerRadius={120}
              label
            >
              {distribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers Bar Chart */}
      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">🏅 Top Performers</h2>
        {topPerformers.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topPerformers} barSize={40}>
              <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [`${value} tasks`, "Completed"]}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Bar
                dataKey="completedTasks"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>

      {/* Modals */}
      {modalType === "users" && (
        <UsersModal
          users={users}
          search={search}
          setSearch={setSearch}
          onClose={() => setModalType(null)}
        />
      )}
      {["pending", "completed", "in-progress"].includes(modalType) && (
        <TasksModal
          tasks={tasks}
          title={modalType}
          search={search}
          setSearch={setSearch}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
};

const DashboardCard = ({ title, value, color, icon, onClick }) => (
  <div
    className={`p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition duration-200 ${color}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const UsersModal = ({ users, search, setSearch, onClose }) => {
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ModalWrapper onClose={onClose} title="👥 User List">
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {filteredUsers.map((u) => (
          <li key={u._id} className="border-b pb-2">
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </ModalWrapper>
  );
};

const TasksModal = ({ tasks, title, search, setSearch, onClose }) => {
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ModalWrapper onClose={onClose} title={`⏳ ${title} Tasks`}>
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTasks.map((t) => (
          <li key={t._id} className="border-b pb-2">
            <strong>{t.title}</strong> — Assigned to:{" "}
            {t.assignedTo?.name || "N/A"}
          </li>
        ))}
      </ul>
    </ModalWrapper>
  );
};

const ModalWrapper = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Close
      </button>
    </div>
  </div>
);

export default AdminDashboard;
