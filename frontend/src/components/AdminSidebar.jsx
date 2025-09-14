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
    <aside className="w-64 bg-white shadow-md flex flex-col min-h-screen">
      {/* Scrollable menu section */}
      <div className="flex-1 overflow-y-auto">
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
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 ${
                  isActive("/admin/assign-task")
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
              >
                <FaTasks /> Assign Work
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sticky logout button */}
      <div className="sticky bottom-0 bg-white border-t p-4 shadow-inner">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
