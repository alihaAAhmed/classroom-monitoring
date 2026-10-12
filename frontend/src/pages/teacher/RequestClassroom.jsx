import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";

export default function RequestClassroom() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Request submitted! Pending admin approval.");
    navigate("/teacher/my-requests");
  };

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
          <h1>Request a <span className="accent">Classroom</span></h1>
          <p>Submit a booking request for admin approval.</p>
        </section>

        <div className="form-page">
          <div className="bottom-card form-card">
            <h2 className="form-card-title">Classroom Request Form</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Classroom *</label>
                <select required>
                  <option value="">Choose a classroom...</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.name} — {r.type}</option>
                  ))}
                </select>
              </div>

              <div className="resp-form-2col">
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Duration *</label>
                  <select required>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                  </select>
                </div>
              </div>

              <div className="resp-form-2col">
                <div className="form-group">
                  <label>Start Time *</label>
                  <input type="time" required />
                </div>
                <div className="form-group">
                  <label>End Time *</label>
                  <input type="time" required />
                </div>
              </div>

              <div className="resp-form-2col">
                <div className="form-group">
                  <label>Purpose *</label>
                  <select required>
                    <option>Lecture</option>
                    <option>Lab Session</option>
                    <option>Seminar</option>
                    <option>Workshop</option>
                    <option>Exam</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Expected Attendees *</label>
                  <input type="number" min="1" placeholder="e.g. 30" required />
                </div>
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea placeholder="Explain why you need this room..." />
              </div>

              <div className="form-actions">
                <Link to="/teacher/my-requests" className="btn-cancel btn-cancel-lg">Cancel</Link>
                <button type="submit" className="btn-login btn-inline">
                  <Send size={15} /> Submit Request
                </button>
              </div>
            </form>
          </div>
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