// src/components/AdminSidebar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-blue-600">Admin Panel</div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 ${
                  isActive("/admin/users") ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/assign-task"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-100"
              >
                <FaTasks className="mr-2" />
                Assign Work
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
