import { useState } from "react";
import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import LiveCameraView from "../../components/LiveCameraView";
import { useAuth } from "../../context/AuthContext";

export default function StudentCameraMonitoring() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/student/dashboard", label: "Dashboard" },
          { to: "/student/classrooms", label: "Classrooms" },
          { to: "/student/floor-map", label: "Floor Map" },
          { to: "/student/notifications", label: "Notifications" },
          { to: "/student/cameras", label: "Camera Monitoring" },
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
        panel="Student Panel"
      />
    </>
  );
}