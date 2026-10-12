import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle2, AlertCircle, Camera, Clock, Shield, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";

export default function TeacherDashboard() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();

  const stats = [
    { label: "Available Rooms", value: rooms.filter(r => r.status === "available").length, color: "green", icon: CheckCircle2 },
    { label: "Occupied Rooms", value: rooms.filter(r => r.status === "occupied").length, color: "red", icon: AlertCircle },
    { label: "Monitored Rooms", value: rooms.length, color: "blue", icon: Camera },
    { label: "Pending Requests", value: 2, color: "orange", icon: Clock },
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
          { to: "/teacher/dashboard", label: "Dashboard" },
          { to: "/teacher/classrooms", label: "Classrooms" },
          { to: "/teacher/floor-map", label: "Floor Map" },
          { to: "/teacher/my-requests", label: "My Requests" },
        ]}
      />

      <div className="container">
        <section className="hero">
          <h1>Hello, <span className="accent">{user?.name || "Teacher"}!</span></h1>
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

        <div className="quick-row">
          <div className="quick-card amber">
            <div className="quick-left">
              <div className="quick-icon amber"><Clock size={20} /></div>
              <div className="quick-info">
                <h4>2 Pending Requests</h4>
                <p>Room change and equipment requests</p>
              </div>
            </div>
            <Link to="/teacher/my-requests" className="quick-btn amber">Review</Link>
          </div>
          <div className="quick-card blue">
            <div className="quick-left">
              <div className="quick-icon blue"><Shield size={20} /></div>
              <div className="quick-info">
                <h4>Need a Classroom?</h4>
                <p>Find and request an available room</p>
              </div>
            </div>
            <Link to="/teacher/request-classroom" className="quick-btn blue">Request</Link>
          </div>
        </div>

        <div className="section-title-row">
          <div className="section-title"><Camera size={18} /> Live Classroom Monitoring</div>
          <Link to="/teacher/classrooms" className="section-link">View All <ChevronRight size={13} /></Link>
        </div>

        <div className="live-grid">
          {filteredRooms.length === 0 ? (
            <p style={{ padding: "20px", color: "#888" }}>No rooms found.</p>
          ) : (
            filteredRooms.map(room => (
              <div key={room.id} className="live-card">
                <div className="live-thumb">
                  {room.image && <img src={room.image} alt={room.name} />}
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
                  <Link to={`/teacher/classroom/${room.id}`} className="live-btn">
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
        panel="Teacher Panel"
      />
    </>
  );
}