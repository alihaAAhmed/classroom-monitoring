import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle2, Plus } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";

export default function MyRequests() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  const requests = [
    { id: "REQ-001", roomName: "Room 102", date: "06 Oct 2026", time: "10:00 AM – 12:00 PM", students: 45, purpose: "Practical Lab", status: "pending" },
    { id: "REQ-002", roomName: "Room 105", date: "07 Oct 2026", time: "01:00 PM – 03:00 PM", students: 60, purpose: "Guest Lecture", status: "approved" },
    { id: "REQ-003", roomName: "Room 101", date: "08 Oct 2026", time: "09:00 AM – 11:00 AM", students: 40, purpose: "Regular Lecture", status: "pending" },
  ];

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/teacher/dashboard", label: "Dashboard" },
          { to: "/teacher/classrooms", label: "Classrooms" },
          { to: "/teacher/floor-map", label: "Floor Map" },
          { to: "/teacher/my-requests", label: "My Requests" },
        ]}
      />

      <div className="container">
        <section className="hero section-title-row">
          <div>
            <h1>My <span className="accent">Requests</span></h1>
            <p>Track the status of all your classroom booking requests.</p>
          </div>
          <Link to="/teacher/request-classroom" className="btn-login btn-inline">
            <Plus size={15} /> New Request
          </Link>
        </section>

        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="stat-card">
            <div className="stat-icon blue"><FileText size={22} /></div>
            <div className="stat-info">
              <div className="stat-val">{requests.length}</div>
              <div className="stat-lbl">Total</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><Clock size={22} /></div>
            <div className="stat-info">
              <div className="stat-val">{requests.filter(r => r.status === "pending").length}</div>
              <div className="stat-lbl">Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><CheckCircle2 size={22} /></div>
            <div className="stat-info">
              <div className="stat-val">{requests.filter(r => r.status === "approved").length}</div>
              <div className="stat-lbl">Approved</div>
            </div>
          </div>
        </div>

        <div className="requests-list">
          {requests.map(r => (
            <div key={r.id} className="live-card request-item">
              <div className={`req-icon ${r.status === "approved" ? "green" : "orange"}`}>
                {r.status === "approved" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
              </div>
              <div className="req-content">
                <div className="req-room">{r.roomName}</div>
                <div className="req-meta">
                  📅 {r.date} • ⏰ {r.time} • 👥 {r.students} students
                </div>
              </div>
              <div className={`req-status ${r.status === "approved" ? "green" : "orange"}`}>
                {r.status}
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
        panel="Teacher Panel"
      />
    </>
  );
}