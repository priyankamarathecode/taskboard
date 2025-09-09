import { useEffect, useState } from "react";
import API from "../services/api";

const UserForm = ({ selectedUser, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await API.put(`/users/${selectedUser._id}`, formData);
      } else {
        await API.post("/users", formData);
      }
      onSuccess();
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        {selectedUser ? "Edit User" : "Add New User"}
      </h2>

      <div className="space-y-4">
        {/* Input field */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={!!selectedUser}
            className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-500 border-gray-300"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded shadow transition cursor-pointer"
          >
            {selectedUser ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded shadow transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
