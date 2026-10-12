import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FileText, Clock, CheckCircle2, XCircle, ArrowLeft,
  Calendar, Users, User, Building2, Mail, MessageSquare,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { getRequests } from "../../data/requests";
import { getStatusInfo } from "../../utils/helpers";

export default function RequestDetails() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const requests = getRequests();
  const request = requests.find((r) => r.id === id) || requests[0];
  const status = getStatusInfo(request.status);

  const handleApprove = () => {
    alert("✅ Request approved! Teacher will be notified.");
    navigate("/admin/requests");
  };

  const handleReject = () => {
    if (!confirm("Reject this request?")) return;
    alert("Request rejected.");
    navigate("/admin/requests");
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

      <div className="page-header">
        <h1>Request Details</h1>
        <p>Review booking request information before making a decision.</p>
      </div>

      <div className="container admin-container">
        <Link to="/admin/requests" className="back-link">
          <ArrowLeft size={14} /> Back to Requests
        </Link>

        {/* Header card */}
        <div className="request-detail-header">
          <div className="rq-left">
            <div className="rq-id-badge">{request.id}</div>
            <div>
              <div className="rq-room">{request.roomName || `Room ${request.roomId}`}</div>
              <div className="rq-type">{request.purpose}</div>
            </div>
          </div>
          <span className={`status-pill ${status.color} big`}>
            <span className="dot"></span>
            {status.label}
          </span>
        </div>

        <div className="detail-grid">
          {/* Left: main info */}
          <div className="detail-side">
            <div className="bottom-card" style={{ padding: 26 }}>
              <h3 className="detail-card-title">
                <User size={16} /> Requested By
              </h3>
              <div className="teacher-card">
                <div className="teacher-avatar big">
                  {request.teacher.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="teacher-info">
                  <div className="t-name">{request.teacher}</div>
                  <div className="t-role">Teacher • Computer Science</div>
                </div>
              </div>
              <div className="detail-row">
                <span><Mail size={14} /> Email</span>
                <strong>teacher@university.edu</strong>
              </div>
              <div className="detail-row last">
                <span><Building2 size={14} /> Department</span>
                <strong>Computer Science</strong>
              </div>
            </div>

            <div className="bottom-card" style={{ padding: 26 }}>
              <h3 className="detail-card-title">
                <Calendar size={16} /> Booking Details
              </h3>
              <div className="detail-row">
                <span><Calendar size={14} /> Date</span>
                <strong>{request.date}</strong>
              </div>
              <div className="detail-row">
                <span><Clock size={14} /> Time</span>
                <strong>{request.time}</strong>
              </div>
              <div className="detail-row">
                <span><Users size={14} /> Students</span>
                <strong>{request.students} students</strong>
              </div>
              <div className="detail-row">
                <span><FileText size={14} /> Purpose</span>
                <strong>{request.purpose}</strong>
              </div>
              <div className="detail-row last">
                <span><Building2 size={14} /> Room</span>
                <strong>{request.roomName || `Room ${request.roomId}`}</strong>
              </div>
            </div>

            <div className="bottom-card" style={{ padding: 26 }}>
              <h3 className="detail-card-title">
                <MessageSquare size={16} /> Message from Teacher
              </h3>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7 }}>
                "I need this classroom for a special seminar with a guest speaker.
                We expect around {request.students} attendees. Please approve if possible."
              </p>
            </div>
          </div>

          {/* Right: actions */}
          <div className="detail-side">
            <div className="bottom-card" style={{ padding: 22 }}>
              <h3 className="detail-card-title">Actions</h3>

              {request.status === "pending" ? (
                <div className="action-stack">
                  <button className="btn-approve" onClick={handleApprove}>
                    <CheckCircle2 size={16} /> Approve Request
                  </button>
                  <button className="btn-reject" onClick={handleReject}>
                    <XCircle size={16} /> Reject Request
                  </button>
                </div>
              ) : (
                <div className={`request-final-status ${request.status}`}>
                  {request.status === "approved" ? (
                    <>
                      <CheckCircle2 size={22} />
                      <div>
                        <div className="final-title">Approved</div>
                        <div className="final-sub">This request has been approved.</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle size={22} />
                      <div>
                        <div className="final-title">Rejected</div>
                        <div className="final-sub">This request was rejected.</div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="bottom-card" style={{ padding: 22 }}>
              <h3 className="detail-card-title">Request Info</h3>
              <div className="detail-row">
                <span>Request ID</span>
                <strong>{request.id}</strong>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <strong style={{ textTransform: "capitalize" }}>{request.status}</strong>
              </div>
              <div className="detail-row last">
                <span>Submitted</span>
                <strong>2 days ago</strong>
              </div>
            </div>
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