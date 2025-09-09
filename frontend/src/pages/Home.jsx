import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Welcome to Locktier TaskBoard Secure Access System
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0">
            Manage roles, control access, and enhance task collaboration in a
            secure environment.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            aria-label="Get started with Locktier TaskBoard"
          >
            Get Started
          </button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="/assets/security-hero.jpg" // Replace with your hosted image
            alt="Illustration of Locktier TaskBoard secure access system"
            className="w-full max-w-md mx-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0H8m4 0v4m-4-8v4m4-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-2 4-2 4m0 0H8m4 0v4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">
                Role-Based Access
              </h3>
            </div>
            <p className="text-gray-600">
              Admins, Managers, and Employees each have defined access for
              secure task workflows.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a2 2 0 00-2-2h-3m-2-2H7a2 2 0 01-2-2V4a2 2 0 012-2h6l3 3v9a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">
                Task Collaboration
              </h3>
            </div>
            <p className="text-gray-600">
              Assign, monitor, and share tasks across roles to boost
              productivity and visibility.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0H8m4 0v4m-4-8v4m4-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-2 4-2 4m0 0H8m4 0v4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">
                Secure Login System
              </h3>
            </div>
            <p className="text-gray-600">
              JWT-based authentication with password recovery to ensure safety
              and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Unlock Your Secure Dashboard Now and take full control of your system.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          aria-label="Login to Locktier TaskBoard dashboard"
        >
          Login Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-gray-100 text-center text-gray-600">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Locktier TaskBoard Secure Access. All
          rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="text-blue-600 hover:underline">
            About
          </a>
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact
          </a>
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
