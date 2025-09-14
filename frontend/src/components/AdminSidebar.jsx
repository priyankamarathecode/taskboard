import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaTasks,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setIsMobileOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 w-64 bg-white shadow-md flex flex-col min-h-screen transform transition-transform duration-300 ease-in-out
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header + Close for Mobile */}
        <div className="flex items-center justify-between p-6 border-b lg:border-none">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setIsMobileOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto px-4">
          <ul className="space-y-2 mt-4">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 transition ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 transition ${
                  isActive("/admin/users") ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/assign-task"
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 transition ${
                  isActive("/admin/assign-task")
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <FaTasks /> Assign Work
              </Link>
            </li>
          </ul>
        </div>

        {/* Sticky Logout */}
        <div className="sticky bottom-0 bg-white border-t p-4 shadow-inner">
          <button
            onClick={() => {
              setIsMobileOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
