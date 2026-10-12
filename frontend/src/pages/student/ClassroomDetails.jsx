import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { getRoomById } from "../../data/rooms";
import { getStatusInfo } from "../../utils/helpers";

export default function StudentClassroomDetails() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { id } = useParams();
  const { logout } = useAuth();
  const room = getRoomById(id);
  const status = getStatusInfo(room.status);

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
        <Link to="/student/classrooms" className="back-link">
          <ArrowLeft size={14} /> Back to Classrooms
        </Link>

        <section className="hero">
          <h1>{room.name} — <span className="accent">{room.type}</span></h1>
          <p>{room.building} • {room.floor} • Capacity: {room.capacity}</p>
        </section>

        <div className="detail-grid">
          <div className="live-card" style={{ marginBottom: 30 }}>
            <div className="live-thumb detail-thumb">
              {room.image && <img src={room.image} alt={room.name} />}
              <div className={`live-badge ${status.color}`}>
                <span className="dot"></span> {status.label}
              </div>
            </div>
            <div className="live-body">
              <div className="lb-title">{room.name}</div>
              <div className="lb-meta">{room.building} • {room.floor}</div>
            </div>
          </div>

          <div className="detail-side">
            <div className="bottom-card" style={{ padding: 22 }}>
              <h3 className="detail-card-title">Room Information</h3>
              <div className="detail-row">
                <span>Room Number</span><strong>{room.name}</strong>
              </div>
              <div className="detail-row">
                <span>Type</span><strong>{room.type}</strong>
              </div>
              <div className="detail-row">
                <span>Capacity</span><strong>{room.capacity}</strong>
              </div>
              <div className="detail-row last">
                <span>Camera</span><strong>{room.cameraId}</strong>
              </div>
            </div>

            <div className="bottom-card" style={{ padding: 22 }}>
              <h3 className="detail-card-title">Today's Schedule</h3>
              {room.schedule?.length > 0 ? room.schedule.map((s, i) => (
                <div key={i} className="detail-schedule-row">
                  <div className="subject">{s.subject}</div>
                  <div className="meta">{s.time} • {s.teacher}</div>
                </div>
              )) : <p style={{ fontSize: 12, color: "#94A3B8" }}>No schedule today</p>}
            </div>
          </div>
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