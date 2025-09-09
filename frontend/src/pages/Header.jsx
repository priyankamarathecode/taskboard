// components/Header.jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo / Project Name */}
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
          TaskBoard
        </Link>

        {/* Navigation */}
        <nav className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
