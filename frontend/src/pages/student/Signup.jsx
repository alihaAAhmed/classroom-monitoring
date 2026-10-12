import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, UserPlus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { signupUser } from "../../services/auth.service";

export default function StudentSignup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const departments = [
    "Computer Science", "Software Engineering", "Information Technology",
    "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
    "Business Administration", "Mathematics", "Physics", "Chemistry",
    "Biology", "English", "Other",
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await signupUser({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      role: "student",
      department: form.department,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/student/login"), 3000);
    } else {
      setError(result.message || "Signup failed");
    }
  };

  if (success) {
    return (
      <div className="login-page">
        <header className="simple-navbar">
          <div className="brand">
            <div className="logo"><GraduationCap size={20} /></div>
            <span>Classroom Monitoring System</span>
          </div>
        </header>
        <div className="login-card-wrapper">
          <div className="login-card" style={{ textAlign: "center" }}>
            <div className="success-circle green">
              <CheckCircle2 size={40} />
            </div>
            <h1 style={{ marginBottom: 12 }}>Account Created!</h1>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 24 }}>
              Your student account is ready. You can <strong>login immediately</strong> — no approval needed.
            </p>
            <p style={{ fontSize: 13, color: "#94A3B8" }}>Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <header className="simple-navbar">
        <div className="brand">
          <div className="logo"><GraduationCap size={20} /></div>
          <span>Classroom Monitoring System</span>
        </div>
      </header>

      <div className="login-card-wrapper">
        <div className="login-card-outer">
          <Link to="/login" className="back-role-btn">
            <ArrowLeft size={14} /> Back to Role Selection
          </Link>

          <div className="login-card">
            <h1>Create Student<br /><span className="accent">Account</span></h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name:</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input name="username" value={form.username} onChange={handleChange} placeholder="Choose a username" required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@gmail.com" required />
              </div>
              <div className="form-group">
                <label>Department:</label>
                <select name="department" value={form.department} onChange={handleChange} required>
                  <option value="">Select your department</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required />
              </div>

              {error && <div className="error-banner">{error}</div>}

              <button type="submit" className="btn-login" disabled={loading}>
                <UserPlus size={15} />
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="signup-section" style={{ marginTop: 22 }}>
              <p>Already have an account?</p>
              <Link to="/student/login" className="btn-signup">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}