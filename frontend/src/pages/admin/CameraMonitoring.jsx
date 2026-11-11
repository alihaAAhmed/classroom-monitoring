import { useState } from "react";
import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import LiveCameraView from "../../components/LiveCameraView";
import { useAuth } from "../../context/AuthContext";

export default function CameraMonitoring() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/classrooms", label: "Classrooms" },
          { to: "/admin/cameras", label: "Camera Monitoring" },
          { to: "/admin/requests", label: "Classroom Requests" },
          { to: "/admin/users", label: "User Management" },
          { to: "/admin/analytics", label: "Analytics" },
        ]}
      />

      <div className="page-header page-header-flex">
        <div>
          <h1>Camera Monitoring</h1>
          <p>Real-time room occupancy detection.</p>
        </div>
      </div>

      <div className="container admin-container">
        <LiveCameraView />
      </div>

      <Footer />
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => { logout(); window.location.href = "/login"; }}
        panel="Admin Panel"
      />
    </>
  );
}