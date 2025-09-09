// src/pages/admin/AssignTaskPage.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AssignTaskPage = () => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");
  const [openUserId, setOpenUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        toast.error("Unexpected user data format");
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, task);
        toast.success("Task updated");
      } else {
        await API.post("/tasks/assign", task);
        toast.success("Task assigned");
      }
      setTask({ title: "", description: "", assignedTo: "", deadline: "" });
      setShowForm(false);
      setEditingTaskId(null);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setTask({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      deadline: task.deadline ? task.deadline.split("T")[0] : "",
    });
    setEditingTaskId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      toast.success("Task deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredUsers = users.filter((user) => {
    if (user.role !== "user") return false;
    const keyword = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.tasks?.some(
        (t) =>
          t.title.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      )
    );
  });

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left */}
        <div className="lg:w-2/3 w-full bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
            👥 User Task Overview
          </h2>

          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              placeholder="🔍 Search user or task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-2/3 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            />
            <select
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-sm text-gray-400">No results found.</p>
          ) : (
            filteredUsers.map((user) => {
              const pending =
                user.tasks?.filter((t) => t.status === "Pending").length || 0;
              const inProgress =
                user.tasks?.filter((t) => t.status === "In Progress").length ||
                0;
              const complete =
                user.tasks?.filter((t) => t.status === "Complete").length || 0;

              return (
                <div
                  key={user._id}
                  className="border rounded-2xl mb-4 bg-white shadow-sm"
                >
                  <div
                    onClick={() =>
                      setOpenUserId(openUserId === user._id ? null : user._id)
                    }
                    className="cursor-pointer flex justify-between items-center p-4 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-semibold text-lg text-blue-700">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Role: {user.role}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          🕒 Pending: {pending}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          ⚙️ In Progress: {inProgress}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          ✅ Completed: {complete}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500">
                      {openUserId === user._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </div>
                  </div>

                  {openUserId === user._id && (
                    <div className="p-4 pt-0 space-y-3">
                      {[...user.tasks]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .filter((task) =>
                          taskFilter === "All"
                            ? true
                            : task.status === taskFilter
                        )
                        .map((task) => (
                          <div
                            key={task._id}
                            className="bg-gray-50 border p-4 rounded-xl shadow-sm"
                          >
                            <div className="font-medium text-lg text-gray-800">
                              {task.title}
                            </div>
                            <div className="text-gray-600 text-sm">
                              {task.description}
                            </div>
                            {task.deadline && (
                              <div className="text-sm text-gray-500 mt-1">
                                Deadline:{" "}
                                <span className="text-gray-800 font-medium">
                                  {new Date(task.deadline).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-3">
                              <span
                                className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide cursor-default ${
                                  task.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : task.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {task.status}
                              </span>
                              <div className="space-x-4">
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(task._id)}
                                  className="text-sm text-red-600 hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right */}
        <div className="lg:w-1/3 w-full">
          {!showForm ? (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingTaskId(null);
                setTask({
                  title: "",
                  description: "",
                  assignedTo: "",
                  deadline: "",
                });
              }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl shadow hover:from-green-600 hover:to-green-700 transition-all cursor-pointer"
            >
              + Assign New Task
            </button>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                {editingTaskId ? "✏️ Edit Task" : "📝 Assign New Task"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm block mb-1 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1 font-medium">
                    Assign To
                  </label>
                  <select
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-lg border-gray-300 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select User</option>
                    {users
                      .filter((user) => user.role === "user")
                      .map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.role})
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm block mb-1 font-medium">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-lg border-gray-300 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition cursor-pointer"
                  >
                    {editingTaskId ? "Update" : "Assign"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setTask({
                        title: "",
                        description: "",
                        assignedTo: "",
                        deadline: "",
                      });
                      setEditingTaskId(null);
                    }}
                    className="flex-1 bg-gray-400 hover:bg-red-500 text-white font-medium py-2 px-6 rounded shadow transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignTaskPage;
