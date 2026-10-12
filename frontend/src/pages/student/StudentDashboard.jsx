import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Camera, CheckCircle2, AlertCircle, Clock, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { notifications } from "../../data/notifications";

export default function StudentDashboard() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();

  const stats = [
    { label: "Available Rooms", value: rooms.filter(r => r.status === "available").length, color: "green", icon: CheckCircle2 },
    { label: "Occupied Rooms", value: rooms.filter(r => r.status === "occupied").length, color: "red", icon: AlertCircle },
    { label: "Monitored Rooms", value: rooms.length, color: "blue", icon: Camera },
    { label: "Notifications", value: notifications.filter(n => n.unread).length, color: "orange", icon: Clock },
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchesFilter = filter === "all" ? true : room.status === filter;
    const matchesSearch =
      search.trim() === "" ||
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.building?.toLowerCase().includes(search.toLowerCase()) ||
      room.floor?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <h1>Hello, <span className="accent">{user?.name || "Student"}!</span></h1>
          <p>Find an available classroom for your next activity.</p>

          <div className="search-bar">
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                placeholder="Search for a room, building, or floor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={`filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-tab ${filter === "available" ? "active" : ""}`}
              onClick={() => setFilter("available")}
            >
              Available
            </button>
            <button
              className={`filter-tab ${filter === "occupied" ? "active" : ""}`}
              onClick={() => setFilter("occupied")}
            >
              Occupied
            </button>
          </div>
        </section>

        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className={`stat-icon ${s.color}`}><s.icon size={22} /></div>
              <div className="stat-info">
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title-row">
          <div className="section-title"><Camera size={18} /> Live Classroom Monitoring</div>
          <Link to="/student/classrooms" className="section-link">View All <ChevronRight size={13} /></Link>
        </div>

        <div className="live-grid">
          {filteredRooms.length === 0 ? (
            <p style={{ padding: "20px", color: "#888" }}>No rooms found.</p>
          ) : (
            filteredRooms.slice(0, 4).map(room => (
              <div key={room.id} className="live-card">
                <div className="live-thumb">
                  {room.image ? <img src={room.image} alt={room.name} /> : null}
                  <div className={`live-badge ${room.status === "available" ? "green" : room.status === "occupied" ? "red" : "orange"}`}>
                    <span className="dot"></span> LIVE
                  </div>
                </div>
                <div className="live-body">
                  <div className="lb-title">{room.name} - {room.type}</div>
                  <div className="lb-meta">{room.building} • {room.floor}</div>
                  <div className="live-stats">
                    <div className="live-stat"><Camera size={13} /> {room.occupancy}/{room.capacity}</div>
                    <div className="live-stat"><Clock size={13} /> {room.status}</div>
                  </div>
                  <Link to={`/student/classroom/${room.id}`} className="live-btn">
                    View Room Details <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          )}
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