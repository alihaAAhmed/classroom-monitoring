import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School, Plus, Search, Eye, Camera,
  CheckCircle, AlertCircle, Users, X,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { getStatusInfo } from "../../utils/helpers";

export default function AdminClassrooms() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalRooms = rooms.length;
  const available = rooms.filter((r) => r.status === "available").length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const camerasOnline = rooms.filter((r) => r.cameraOnline).length;

  const stats = [
    { icon: School, value: totalRooms, label: "Total Classrooms", sub: "Across Campus", color: "blue" },
    { icon: CheckCircle, value: available, label: "Available", sub: "Currently Empty", color: "green" },
    { icon: AlertCircle, value: occupied, label: "Occupied", sub: "People detected", color: "red" },
    { icon: Camera, value: `${camerasOnline}/${totalRooms}`, label: "Cameras Online", sub: "1 need attention", color: "orange" },
  ];

  const filteredRooms = rooms.filter((r) => {
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (buildingFilter !== "all" && r.building !== buildingFilter) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    return true;
  });

  const buildings = [...new Set(rooms.map((r) => r.building))];
  const types = [...new Set(rooms.map((r) => r.type))];

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
          <h1>Classroom Management</h1>
          <p>
            Manage classrooms, monitor status, track information, capacity, and monitoring status.
          </p>
        </div>
        <button className="page-header-btn">
          <Plus size={16} />
          Add Classroom
        </button>
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
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="filter-bar">
          <div className="filter-search">
            <Search size={15} color="#94A3B8" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by room number, name..."
            />
          </div>

          <select value={buildingFilter} onChange={(e) => setBuildingFilter(e.target.value)}>
            <option value="all">All Buildings</option>
            {buildings.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="inuse">In Use</option>
            <option value="offline">Offline</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery("");
              setBuildingFilter("all");
              setTypeFilter("all");
              setStatusFilter("all");
            }}
            className="filter-reset"
          >
            <X size={14} />
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <div className="table-card-header">
            <School size={18} color="#4F6DDF" />
            <h2>
              All Classrooms{" "}
              <span className="table-count">{filteredRooms.length}</span>
            </h2>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {["Room", "Type", "Location", "Capacity", "People", "Camera", "Status", "Action"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => {
                  const status = getStatusInfo(room.status);
                  return (
                    <tr key={room.id}>
                      <td>
                        <div className="room-cell">
                          <img src={room.image} alt={room.name} />
                          <div>
                            <div className="room-name">{room.name}</div>
                            <div className="room-id">{room.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{room.type}</td>
                      <td>
                        <div className="loc-name">{room.building}</div>
                        <div className="loc-floor">{room.floor}</div>
                      </td>
                      <td>
                        <div className="cap-badge">
                          <Users size={12} />
                          {room.capacity} seats
                        </div>
                      </td>
                      <td>
                        <div className="people-count">{room.occupancy}/{room.capacity}</div>
                        <div className="people-pct">
                          {Math.round((room.occupancy / room.capacity) * 100)}%
                        </div>
                      </td>
                      <td>
                        <div className={`cam-badge ${room.cameraOnline ? "online" : "offline"}`}>
                          <Camera size={11} />
                          {room.cameraId}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${status.color}`}>
                          <span className="dot"></span>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <Link to={`/admin/cameras`} className="action-btn">
                          <Eye size={13} />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredRooms.length === 0 && (
              <div className="table-empty">No classrooms match your filters.</div>
            )}
          </div>
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