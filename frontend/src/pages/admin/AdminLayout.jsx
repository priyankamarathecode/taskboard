// src/pages/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
