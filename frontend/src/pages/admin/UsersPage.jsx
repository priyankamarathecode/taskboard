import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import UserList from "../../components/UserList";
import UserForm from "../../components/UserForm";

const UsersPage = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setEditingUser(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            👥 User Management
          </h2>
          <UserList key={refresh} onEdit={handleEdit} />
        </div>

        {/* Add/Edit Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {!showForm ? (
            <button
              onClick={handleAddNew}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300"
            >
              <FaUserPlus className="text-lg" />+ Add New User
            </button>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <UserForm
                selectedUser={editingUser}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
