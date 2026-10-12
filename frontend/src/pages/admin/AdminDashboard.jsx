import { Link } from "react-router-dom";
import { useState } from "react";
import {
  School, Camera, ClipboardList, Users, BarChart3,
  TrendingUp, CheckCircle, AlertCircle, Clock, Activity,
  FileText,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { getRequests } from "../../data/requests";
import { notifications } from "../../data/notifications";

export default function AdminDashboard() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.status === "available").length;
  const occupiedRooms = rooms.filter((r) => r.status === "occupied").length;
  const totalStudents = 1234;

  const requests = getRequests();

  const stats = [
    { icon: School, label: "Total Rooms", value: totalRooms, color: "blue" },
    { icon: CheckCircle, label: "Available", value: availableRooms, color: "green" },
    { icon: AlertCircle, label: "Occupied", value: occupiedRooms, color: "red" },
    { icon: Users, label: "Total Students", value: totalStudents, color: "orange" },
  ];

  const quickActions = [
    { icon: School, label: "Add Classroom", link: "/admin/classrooms", color: "#4F6DDF" },
    { icon: Camera, label: "Manage Cameras", link: "/admin/cameras", color: "#16A34A" },
    { icon: FileText, label: "View Requests", link: "/admin/requests", color: "#D97706" },
    { icon: Users, label: "Manage Users", link: "/admin/users", color: "#7C3AED" },
    { icon: BarChart3, label: "System Settings", link: "/admin/analytics", color: "#DC2626" },
  ];

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

      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Real-time overview of classrooms and system activity</p>
      </div>

      <div className="container admin-container">
        {/* STATS */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-icon ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LIVE CAMERA MONITORING */}
        <div className="section-title-row">
          <div className="section-title">
            <Camera size={18} />
            Live Camera Monitoring
          </div>
          <Link to="/admin/cameras" className="section-link">
            View All →
          </Link>
        </div>

        <div className="live-grid">
          {rooms.slice(0, 4).map((room) => (
            <div key={room.id} className="live-card">
              <div className="live-thumb">
                <img src={room.image} alt={room.name} />
                <div
                  className={`live-badge ${
                    room.status === "available"
                      ? "green"
                      : room.status === "occupied"
                      ? "red"
                      : room.status === "inuse"
                      ? "orange"
                      : "gray"
                  }`}
                >
                  <span className="dot"></span>
                  {room.status === "available"
                    ? "Available"
                    : room.status === "occupied"
                    ? "Occupied"
                    : room.status === "inuse"
                    ? "In Use"
                    : "Offline"}
                </div>
              </div>
              <div className="live-body">
                <div className="lb-title">{room.name}</div>
                <div className="lb-meta">
                  {room.type} • {room.building} • {room.floor}
                </div>
                <div className="live-stats">
                  <div className="live-stat">
                    <Users size={13} />
                    {room.occupancy}/{room.capacity}
                  </div>
                  <div className="live-stat">
                    <Clock size={13} />
                    {room.lastUpdated}
                  </div>
                </div>
                <Link to={`/admin/cameras`} className="live-btn">
                  <Camera size={14} /> View Camera
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="bottom-grid">
          <div className="bottom-card">
            <div className="bottom-header">
              <h3>
                <Activity size={16} />
                Classroom Occupancy Overview
              </h3>
            </div>
            <div style={{ padding: "30px 24px" }}>
              <div className="occupancy-overview">
                <div
                  className="donut"
                  style={{
                    background: `conic-gradient(#16A34A 0% ${
                      (availableRooms / totalRooms) * 100
                    }%, #F1F5F9 ${(availableRooms / totalRooms) * 100}% 100%)`,
                  }}
                >
                  <div className="donut-inner">
                    <div className="donut-val">
                      {Math.round((availableRooms / totalRooms) * 100)}%
                    </div>
                    <div className="donut-lbl">Available</div>
                  </div>
                </div>

                <div className="occupancy-legend">
                  <div className="occ-row">
                    <div className="occ-left">
                      <span className="dot green"></span>
                      <span>Available</span>
                    </div>
                    <strong>{availableRooms}</strong>
                  </div>
                  <div className="occ-row">
                    <div className="occ-left">
                      <span className="dot red"></span>
                      <span>Occupied</span>
                    </div>
                    <strong>{occupiedRooms}</strong>
                  </div>
                  <div className="occ-row">
                    <div className="occ-left">
                      <span className="dot orange"></span>
                      <span>In Use</span>
                    </div>
                    <strong>
                      {rooms.filter((r) => r.status === "inuse").length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-card">
            <div className="bottom-header">
              <h3>
                <TrendingUp size={16} />
                System Activity (Last 7 Days)
              </h3>
            </div>
            <div style={{ padding: "30px 24px" }}>
              <svg viewBox="0 0 400 140" style={{ width: "100%", height: 140 }}>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4F6DDF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4F6DDF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,100 L 60,80 L 120,90 L 180,50 L 240,70 L 300,30 L 360,40 L 400,20"
                  fill="none"
                  stroke="#4F6DDF"
                  strokeWidth="3"
                />
                <path
                  d="M 0,100 L 60,80 L 120,90 L 180,50 L 240,70 L 300,30 L 360,40 L 400,20 L 400,140 L 0,140 Z"
                  fill="url(#grad)"
                />
              </svg>
              <div className="chart-days">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* REQUESTS + NOTIFICATIONS */}
        <div className="bottom-grid">
          <div className="bottom-card">
            <div className="bottom-header">
              <h3>
                <ClipboardList size={16} />
                Recent Classroom Requests
              </h3>
              <Link to="/admin/requests" className="view-all">
                View All →
              </Link>
            </div>
            <div className="bottom-body">
              {requests.slice(0, 3).map((req) => (
                <div key={req.id} className="mini-row">
                  <div className="mini-icon blue">
                    <ClipboardList size={18} />
                  </div>
                  <div className="mini-info">
                    <div className="mini-title">{req.roomName}</div>
                    <div className="mini-sub">{req.teacher} • {req.date}</div>
                  </div>
                  <span
                    className={`mini-status ${
                      req.status === "approved"
                        ? "green"
                        : req.status === "pending"
                        ? "orange"
                        : "red"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bottom-card">
            <div className="bottom-header">
              <h3>
                <AlertCircle size={16} />
                Recent Alerts & Notifications
              </h3>
            </div>
            <div className="bottom-body">
              {notifications.slice(0, 3).map((notif, i) => (
                <div key={i} className="mini-row">
                  <div className={`mini-icon ${notif.type || "default"}`}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="mini-info">
                    <div className="mini-title">{notif.title}</div>
                    <div className="mini-sub">{notif.desc}</div>
                    <div className="mini-time">{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="section-title-row" style={{ marginTop: 40 }}>
          <div className="section-title">
            <Activity size={18} />
            Quick Actions
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.link} className="quick-action-card">
              <div
                className="quick-action-icon"
                style={{ background: `${action.color}15`, color: action.color }}
              >
                <action.icon size={26} />
              </div>
              <div className="quick-action-label">{action.label}</div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          logout();
          window.location.href = "/login";
        }}
        panel="Admin Panel"
      />
    </>
  );
}