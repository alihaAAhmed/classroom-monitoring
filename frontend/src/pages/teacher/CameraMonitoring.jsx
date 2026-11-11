import { useState } from "react";
import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import LiveCameraView from "../../components/LiveCameraView";
import { useAuth } from "../../context/AuthContext";

export default function TeacherCameraMonitoring() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/teacher/dashboard", label: "Dashboard" },
          { to: "/teacher/classrooms", label: "Classrooms" },
          { to: "/teacher/floor-map", label: "Floor Map" },
          { to: "/teacher/my-requests", label: "My Requests" },
          { to: "/teacher/cameras", label: "Camera Monitoring" },
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
        panel="Teacher Panel"
      />
    </>
  );
}