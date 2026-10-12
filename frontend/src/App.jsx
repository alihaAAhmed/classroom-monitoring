import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

// Student pages
import StudentLogin from "./pages/student/Login";
import StudentSignup from "./pages/student/Signup";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentClassrooms from "./pages/student/Classrooms";
import StudentClassroomDetails from "./pages/student/ClassroomDetails";
import StudentFloorMap from "./pages/student/FloorMap";
import StudentNotifications from "./pages/student/Notifications";

// Teacher pages
import TeacherLogin from "./pages/teacher/Login";
import TeacherSignup from "./pages/teacher/Signup";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherClassrooms from "./pages/teacher/TeacherClassrooms";
import TeacherClassroomDetails from "./pages/teacher/TeacherClassroomDetails";
import TeacherFloorMap from "./pages/teacher/TeacherFloorMap";
import MyRequests from "./pages/teacher/MyRequests";
import RequestClassroom from "./pages/teacher/RequestClassroom";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClassrooms from "./pages/admin/AdminClassrooms";
import CameraMonitoring from "./pages/admin/CameraMonitoring";
import ClassroomRequests from "./pages/admin/ClassroomRequests";
import RequestDetails from "./pages/admin/RequestDetails";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />

      {/* Student Routes */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/classrooms" element={<ProtectedRoute role="student"><StudentClassrooms /></ProtectedRoute>} />
      <Route path="/student/classroom/:id" element={<ProtectedRoute role="student"><StudentClassroomDetails /></ProtectedRoute>} />
      <Route path="/student/floor-map" element={<ProtectedRoute role="student"><StudentFloorMap /></ProtectedRoute>} />
      <Route path="/student/notifications" element={<ProtectedRoute role="student"><StudentNotifications /></ProtectedRoute>} />

      {/* Teacher Routes */}
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/signup" element={<TeacherSignup />} />
      <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/classrooms" element={<ProtectedRoute role="teacher"><TeacherClassrooms /></ProtectedRoute>} />
      <Route path="/teacher/classroom/:id" element={<ProtectedRoute role="teacher"><TeacherClassroomDetails /></ProtectedRoute>} />
      <Route path="/teacher/floor-map" element={<ProtectedRoute role="teacher"><TeacherFloorMap /></ProtectedRoute>} />
      <Route path="/teacher/my-requests" element={<ProtectedRoute role="teacher"><MyRequests /></ProtectedRoute>} />
      <Route path="/teacher/request-classroom" element={<ProtectedRoute role="teacher"><RequestClassroom /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/classrooms" element={<ProtectedRoute role="admin"><AdminClassrooms /></ProtectedRoute>} />
      <Route path="/admin/cameras" element={<ProtectedRoute role="admin"><CameraMonitoring /></ProtectedRoute>} />
      <Route path="/admin/requests" element={<ProtectedRoute role="admin"><ClassroomRequests /></ProtectedRoute>} />
      <Route path="/admin/request/:id" element={<ProtectedRoute role="admin"><RequestDetails /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute role="admin"><Analytics /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}