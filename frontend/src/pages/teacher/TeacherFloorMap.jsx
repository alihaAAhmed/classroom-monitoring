import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, CheckCircle2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { getStatusInfo } from "../../utils/helpers";

export default function TeacherFloorMap() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [searchType, setSearchType] = useState("any");
  const [searchCapacity, setSearchCapacity] = useState("30");
  const [searchStatus, setSearchStatus] = useState("available");
  const [showResults, setShowResults] = useState(false);
  const { logout } = useAuth();

  const filteredRooms = rooms.filter((r) => {
    if (searchType !== "any" && r.type.toLowerCase() !== searchType.toLowerCase()) return false;
    if (r.capacity < parseInt(searchCapacity)) return false;
    if (searchStatus === "available" && r.status !== "available") return false;
    return true;
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
          <h1>Floor <span className="accent">Map</span></h1>
          <p>Explore classrooms by building and floor. View room type, location, and current availability.</p>
        </section>

        {/* Building Floor Map */}
        <div className="bottom-card floor-card">
          <div className="floor-header">
            <div className="floor-icon"><Building2 size={22} /></div>
            <div>
              <h2>Computer Science Block — 1st Floor</h2>
              <div className="sub">Click on any room to view details</div>
            </div>
          </div>

          <div className="floor-grid">
            {rooms.map((room) => {
              const status = getStatusInfo(room.status);
              return (
                <Link
                  key={room.id}
                  to={`/teacher/classroom/${room.id}`}
                  className="floor-tile"
                >
                  <div className="name">{room.name}</div>
                  <div className="type">{room.type}</div>
                  <div className={`status-badge ${status.color}`}>{status.label}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Find Available */}
        <div className="bottom-card find-card">
          <div className="find-header">
            <div className="find-icon"><Search size={20} /></div>
            <h3>Find an Available Classroom</h3>
          </div>

          <div className="find-grid">
            <div className="form-group">
              <label>Room Type</label>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="any">Any Type</option>
                <option value="Computer Lab">Computer Lab</option>
                <option value="General Classroom">General Classroom</option>
                <option value="Science Lab">Science Lab</option>
                <option value="Seminar Room">Seminar Room</option>
              </select>
            </div>
            <div className="form-group">
              <label>Min Capacity</label>
              <select value={searchCapacity} onChange={(e) => setSearchCapacity(e.target.value)}>
                <option value="20">Min 20</option>
                <option value="30">Min 30</option>
                <option value="40">Min 40</option>
                <option value="50">Min 50</option>
                <option value="60">Min 60</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
                <option value="available">Available</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="btn-login" style={{ width: "100%" }}>
            <Search size={15} /> Check Rooms
          </button>

          {showResults && (
            <div style={{ marginTop: 22 }}>
              <div className="find-results-header">
                <CheckCircle2 size={15} />
                {filteredRooms.length} available room{filteredRooms.length !== 1 ? "s" : ""} found
              </div>

              {filteredRooms.length === 0 ? (
                <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", padding: 20 }}>
                  No rooms match your criteria. Try changing filters.
                </p>
              ) : (
                <div className="find-results">
                  {filteredRooms.map((room) => (
                    <Link key={room.id} to={`/teacher/classroom/${room.id}`} className="find-result-item">
                      <div className="id-badge">{room.id}</div>
                      <div className="info">
                        <div className="name">{room.name}</div>
                        <div className="meta">{room.type} • {room.building} • {room.floor}</div>
                      </div>
                      <div className="cap">
                        <div className="lbl">CAPACITY</div>
                        <div className="val">{room.capacity} seats</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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