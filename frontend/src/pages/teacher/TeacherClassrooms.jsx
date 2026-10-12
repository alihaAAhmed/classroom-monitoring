import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import RoomCard from "../../components/RoomCard";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";

export default function TeacherClassrooms() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { logout } = useAuth();

  const filtered = rooms.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (
      search &&
      !r.name.toLowerCase().includes(search.toLowerCase()) &&
      !r.building?.toLowerCase().includes(search.toLowerCase())
    ) return false;
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
          <h1>All <span className="accent">Classrooms</span></h1>
          <p>Browse all classrooms and labs across the campus.</p>
          <div className="search-bar">
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
            <button className={`filter-tab ${filter === "available" ? "active" : ""}`} onClick={() => setFilter("available")}>Available</button>
            <button className={`filter-tab ${filter === "occupied" ? "active" : ""}`} onClick={() => setFilter("occupied")}>Occupied</button>
          </div>
        </section>

        <div className="live-grid" style={{ marginTop: 30 }}>
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} linkPrefix="/teacher/classroom" />
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