// src/components/UserSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiChevronDown } from "react-icons/fi";
import { FaTachometerAlt, FaTasks, FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // expanded or collapsed
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile overlay
  const [dropdownOpen, setDropdownOpen] = useState(false); // account menu
  const [userName, setUserName] = useState("User");
  const dropdownRef = useRef();

  useEffect(() => {
    // Prefer stored "name", fall back to stored "user" object
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
      return;
    }
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u?.name) setUserName(u.name);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (dropdownRef.current && !dropdownRef.current.contains(ev.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/user/profile");
  };

  const navItems = [
    { to: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/user/tasks", label: "My Tasks", icon: <FaTasks /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow p-2 rounded-lg"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ width: isOpen ? 260 : 80 }}
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ duration: 0.22 }}
        className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white min-h-screen flex flex-col shadow-lg fixed lg:static top-0 left-0 z-40 
          ${isMobileOpen ? "block" : "hidden"} lg:flex`}
      >
        {/* Main content grows so bottom area stays pinned */}
        <div className="p-4 flex-1">
          {/* Title & Toggle */}
          <div className="flex items-center justify-between mb-6">
            {isOpen && (
              <h2 className="text-2xl font-bold tracking-wide">User Panel</h2>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-blue-500 rounded"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          </div>

          {/* Nav items */}
          <nav className="space-y-2 mt-6">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-500 ${
                    isActive ? "bg-blue-500 font-semibold" : ""
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom: user row (clickable) */}
        <div
          ref={dropdownRef}
          className="relative p-4 border-t border-blue-500"
          style={{ zIndex: 60 }}
        >
          <button
            onClick={() => setDropdownOpen((s) => !s)}
            className="w-full flex items-center gap-3 hover:opacity-95"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaUserCircle size={22} />
            {isOpen && (
              <>
                <div className="flex-1 text-left truncate">{userName}</div>
                <FiChevronDown
                  className={`transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {/* Animated dropdown menu positioned above bottom row */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                // position depends on collapsed/expanded sidebar to avoid overflow
                style={{
                  position: "absolute",
                  bottom: "64px",
                  left: isOpen ? 12 : 72,
                  minWidth: 160,
                }}
                className="bg-white text-gray-900 rounded-md shadow-lg overflow-hidden"
              >
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaUserCircle /> <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile overlay that closes the sidebar when clicked */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
