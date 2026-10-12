import { useState } from "react";
import { Bell } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { notifications } from "../../data/notifications";

export default function StudentNotifications() {
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
        ]}
      />

      <div className="container">
        <section className="hero">
          <h1>Notifications</h1>
          <p>Stay updated with classroom availability and alerts.</p>
        </section>

        <div className="notif-list">
          {notifications.map(n => (
            <div
              key={n.id}
              className="live-card notif-card"
              style={{
                borderLeft: n.unread ? "4px solid #4F6DDF" : "1px solid #EEF2F9",
              }}
            >
              <div className="notif-inner">
                <div className={`notif-icon type-${n.type || "default"}`}>
                  <Bell size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-desc">{n.desc}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
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