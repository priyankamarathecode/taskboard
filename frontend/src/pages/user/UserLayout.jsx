// src/pages/user/UserLayout.jsx
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
