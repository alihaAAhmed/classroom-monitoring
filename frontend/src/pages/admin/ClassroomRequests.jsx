import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Clock, CheckCircle2, XCircle, Eye, Search, Users,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { getRequests } from "../../data/requests";
import { getStatusInfo } from "../../utils/helpers";

export default function ClassroomRequests() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const requests = getRequests();

  const totalRequests = requests.length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;

  const stats = [
    { icon: FileText, value: totalRequests, label: "Total Requests", sub: "All time", color: "blue" },
    { icon: CheckCircle2, value: approved, label: "Approved", sub: "Ready to schedule", color: "green" },
    { icon: Clock, value: pending, label: "Pending", sub: "Awaiting review", color: "orange" },
    { icon: XCircle, value: rejected, label: "Rejected", sub: "Declined", color: "red" },
  ];

  const filtered = requests.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.teacher.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(r.roomName || `Room ${r.roomId}`).toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="page-header">
        <h1>Classroom Requests</h1>
        <p>Review and manage teacher classroom booking requests.</p>
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
              placeholder="Search by request ID, teacher, or room..."
            />
          </div>

          {[
            { id: "all", label: `All (${totalRequests})` },
            { id: "pending", label: `Pending (${pending})` },
            { id: "approved", label: `Approved (${approved})` },
            { id: "rejected", label: `Rejected (${rejected})` },
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

        {/* TABLE */}
        <div className="table-card">
          <div className="table-card-header">
            <FileText size={18} color="#4F6DDF" />
            <h2>
              Request History{" "}
              <span className="table-count">{filtered.length}</span>
            </h2>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {["Request ID", "Teacher", "Room", "Date & Time", "Students", "Purpose", "Status", "Action"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="table-empty-cell">
                      <FileText size={48} />
                      No requests found
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => {
                    const status = getStatusInfo(r.status);
                    return (
                      <tr key={r.id}>
                        <td>
                          <div className="req-id">{r.id}</div>
                        </td>
                        <td>
                          <div className="teacher-cell">
                            <div className="teacher-avatar">
                              {r.teacher.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div className="teacher-name">{r.teacher}</div>
                          </div>
                        </td>
                        <td>
                          <div className="room-name">{r.roomName || `Room ${r.roomId}`}</div>
                        </td>
                        <td>
                          <div className="date-main">{r.date}</div>
                          <div className="date-sub">{r.time}</div>
                        </td>
                        <td>
                          <div className="students-cell">
                            <Users size={12} />
                            {r.students}
                          </div>
                        </td>
                        <td>
                          <div className="purpose-tag">{r.purpose}</div>
                        </td>
                        <td>
                          <span className={`status-pill ${status.color}`}>
                            <span className="dot"></span>
                            {status.label}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/request/${r.id}`} className="action-btn">
                            <Eye size={13} />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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