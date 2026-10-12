import { useState, useEffect } from "react";
import {
  Users, Check, X, Search, UserCheck, UserX, Clock,
  GraduationCap, UserCog, Shield, AlertCircle, RefreshCw,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";

export default function UserManagement() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);
  const { logout } = useAuth();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load users:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await apiRequest(`/users/${userId}/approve`, { method: "PUT" });
      setUsers(users.map((u) => (u._id === userId ? { ...u, status: "active" } : u)));
      showMessage("✅ User approved successfully!", "green");
    } catch (error) {
      showMessage(`❌ ${error.message}`, "red");
    }
  };

  const handleReject = async (userId) => {
    if (!confirm("Reject this user? They won't be able to login.")) return;
    try {
      await apiRequest(`/users/${userId}/reject`, { method: "PUT" });
      setUsers(users.map((u) => (u._id === userId ? { ...u, status: "rejected" } : u)));
      showMessage("User rejected.", "red");
    } catch (error) {
      showMessage(`❌ ${error.message}`, "red");
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;
  const rejectedUsers = users.filter((u) => u.status === "rejected").length;

  const stats = [
    { icon: Users, value: totalUsers, label: "Total Users", sub: "Students + Teachers + Admins", color: "blue" },
    { icon: UserCheck, value: activeUsers, label: "Active", sub: "Approved accounts", color: "green" },
    { icon: Clock, value: pendingUsers, label: "Pending", sub: "Awaiting approval", color: "orange" },
    { icon: UserX, value: rejectedUsers, label: "Rejected", sub: "Access denied", color: "red" },
  ];

  const filtered = users.filter((u) => {
    if (filter !== "all" && u.status !== filter) return false;
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (
      searchQuery &&
      !u.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.email?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.username?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const getRoleIcon = (role) => {
    if (role === "student") return GraduationCap;
    if (role === "teacher") return UserCog;
    return Shield;
  };

  const getRoleColors = (role) => {
    if (role === "student") return { bg: "#EFF6FF", color: "#2563EB" };
    if (role === "teacher") return { bg: "#F3E8FF", color: "#7C3AED" };
    return { bg: "#DCFCE7", color: "#16A34A" };
  };

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
          <h1>User Management</h1>
          <p>Approve or reject new student and teacher registrations.</p>
        </div>
        <button className="page-header-btn" onClick={loadUsers}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="container admin-container">
        {message && (
          <div className={`msg-banner ${message.type}`}>
            {message.text}
          </div>
        )}

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

        <div className="filter-bar">
          <div className="filter-search">
            <Search size={15} color="#94A3B8" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or username..."
            />
          </div>

          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>

          {[
            { id: "all", label: `All (${totalUsers})` },
            { id: "active", label: `Active (${activeUsers})` },
            { id: "pending", label: `Pending (${pendingUsers})` },
            { id: "rejected", label: `Rejected (${rejectedUsers})` },
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

        <div className="table-card">
          <div className="table-card-header">
            <Users size={18} color="#4F6DDF" />
            <h2>
              All Users{" "}
              <span className="table-count">{filtered.length}</span>
            </h2>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {["User", "Email", "Role", "Status", "Joined", "Action"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="table-empty-cell">
                      Loading users...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="table-empty-cell">
                      <Users size={48} />
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => {
                    const RoleIcon = getRoleIcon(u.role);
                    const roleColors = getRoleColors(u.role);
                    return (
                      <tr key={u._id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {u.initials ||
                                u.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="user-name">{u.name}</div>
                              <div className="user-username">@{u.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted">{u.email}</td>
                        <td>
                          <span
                            className="role-pill"
                            style={{ background: roleColors.bg, color: roleColors.color }}
                          >
                            <RoleIcon size={11} />
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              u.status === "active"
                                ? "green"
                                : u.status === "rejected"
                                ? "red"
                                : "orange"
                            }`}
                          >
                            <span className="dot"></span>
                            {u.status}
                          </span>
                        </td>
                        <td className="text-muted">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                        <td>
                          <div className="action-group">
                            {u.status !== "active" && (
                              <button
                                onClick={() => handleApprove(u._id)}
                                className="action-btn action-btn-green"
                              >
                                <Check size={12} />
                                Approve
                              </button>
                            )}
                            {u.status !== "rejected" && (
                              <button
                                onClick={() => handleReject(u._id)}
                                className="action-btn action-btn-red"
                              >
                                <X size={12} />
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-banner">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Approval Workflow:</strong> Students are auto-approved on
            signup. Teachers need admin approval before they can login and
            request classrooms.
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