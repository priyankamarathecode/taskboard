// src/pages/user/UserProfile.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    API.get("/profile").then((res) => setUser(res.data));
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await API.put("/profile", user);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">👤 Edit Profile</h2>
      <div className="space-y-4 max-w-md">
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded bg-gray-300"
          readOnly
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
