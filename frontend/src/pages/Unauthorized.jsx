// pages/Unauthorized.jsx
const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          403 - Unauthorized
        </h1>
        <p>You do not have permission to access this page.</p>
        <a href="/login" className="text-blue-600 mt-4 block">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
