import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera, Search, RefreshCw, Video, VideoOff,
  AlertCircle, Eye, Clock, Users, Maximize2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { getStatusInfo } from "../../utils/helpers";

export default function CameraMonitoring() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const onlineCameras = rooms.filter((r) => r.cameraOnline).length;
  const offlineCameras = rooms.filter((r) => !r.cameraOnline).length;
  const occupiedRooms = rooms.filter(
    (r) => r.status === "occupied" || r.status === "inuse"
  ).length;
  const totalOccupancy = rooms.reduce((sum, r) => sum + r.occupancy, 0);

  const stats = [
    { icon: Video, value: onlineCameras, label: "Cameras Online", sub: `Out of ${rooms.length} total`, color: "green" },
    { icon: VideoOff, value: offlineCameras, label: "Cameras Offline", sub: offlineCameras > 0 ? "Need attention" : "All working", color: "red" },
    { icon: AlertCircle, value: occupiedRooms, label: "Active Rooms", sub: "With people detected", color: "orange" },
    { icon: Users, value: totalOccupancy, label: "Total People", sub: "Across all rooms", color: "blue" },
  ];

  const filtered = rooms.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (
      searchQuery &&
      !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.cameraId.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

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
          <p>Monitor all classroom cameras and view real-time occupancy.</p>
        </div>
        <button className="page-header-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          Refresh All
        </button>
      </div>

      <div className="container admin-container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-icon ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-search">
            <Search size={15} color="#94A3B8" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by room number or camera ID..."
            />
          </div>

          {[
            { id: "all", label: `All (${rooms.length})` },
            { id: "available", label: `Available (${rooms.filter((r) => r.status === "available").length})` },
            { id: "occupied", label: `Occupied (${rooms.filter((r) => r.status === "occupied").length})` },
            { id: "inuse", label: `In Use (${rooms.filter((r) => r.status === "inuse").length})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`filter-tab ${filter === f.id ? "active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="live-grid">
          {filtered.map((room) => {
            const status = getStatusInfo(room.status);
            return (
              <div key={room.id} className="live-card">
                <div className="live-thumb">
                  {room.cameraOnline && room.image ? (
                    <>
                      <img src={room.image} alt={room.name} />
                      <div className={`live-badge ${status.color}`}>
                        <span className="dot"></span>
                        LIVE
                      </div>
                      <button className="fullscreen-btn" title="Fullscreen">
                        <Maximize2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="no-signal">
                      <VideoOff size={40} />
                      <div className="no-signal-title">No Signal</div>
                    </div>
                  )}

                  <div className="cam-id-tag">{room.cameraId}</div>
                </div>

                <div className="live-body">
                  <div className="lb-title">
                    {room.name} — {room.type}
                  </div>
                  <div className="lb-meta">
                    {room.building} • {room.floor}
                  </div>

                  <div className="live-stats">
                    <div className="live-stat">
                      <Users size={13} />
                      {room.occupancy}/{room.capacity} people
                    </div>
                    <div className="live-stat">
                      <Clock size={13} />
                      {room.lastUpdated}
                    </div>
                  </div>

                  <div className="cam-footer">
                    <span className={`status-pill ${status.color}`}>
                      <span className="dot"></span>
                      {status.label}
                    </span>

                    <Link to={`/admin/classrooms`} className="action-btn">
                      <Eye size={13} />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="table-empty table-empty-lg">
            <Camera size={48} />
            <div>No cameras match your filters.</div>
          </div>
        )}
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