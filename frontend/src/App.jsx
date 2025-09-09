// src/App.jsx
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./pages/Header";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AssignTaskPage from "./pages/admin/AssignTaskPage";
import UserDashboard from "./pages/user/UserDashboard";
import MyTasks from "./pages/user/MyTasks";
import TaskDetails from "./pages/user/TaskDetails";
import UserProfile from "./pages/user/UserProfile";
import UserLayout from "./pages/user/UserLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <Routes>
        {/* Public routes with Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <Header />
              <ForgotPassword />
            </>
          }
        />

        <Route path="*" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin routes with Sidebar layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="assign-task" element={<AssignTaskPage />} />
        </Route>
        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="task/:id" element={<TaskDetails />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
