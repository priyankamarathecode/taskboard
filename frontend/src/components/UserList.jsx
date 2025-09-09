import { useEffect, useState } from "react";
import API from "../services/api";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Load Users Error:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border capitalize">{user.role}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
