import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LogIn, AlertCircle, ArrowLeft } from "lucide-react";
import { loginUser } from "../../services/auth.service";

export default function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser(username, password);

      if (!result) {
        setError("⚠️ Server did not respond. Please try again.");
        setLoading(false);
        return;
      }

      if (result.success) {
        if (result.user.role === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          setError(`This is a ${result.user.role} account. Please login from the correct page.`);
          setLoading(false);
        }
      } else {
        const msg = result.message || "";
        if (msg.toLowerCase().includes("invalid")) {
          setError("❌ Wrong username or password. Please try again.");
        } else if (msg.toLowerCase().includes("pending")) {
          setError("⏳ Your account is pending admin approval. Please wait.");
        } else if (msg.toLowerCase().includes("rejected")) {
          setError("🚫 Your account was rejected by admin.");
        } else if (msg.toLowerCase().includes("not found")) {
          setError("❌ Account does not exist. Please sign up first.");
        } else {
          setError(msg || "Login failed. Please try again.");
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Login exception:", err);
      setError("⚠️ Cannot connect to server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="simple-navbar">
        <div className="brand">
          <div className="logo"><GraduationCap size={20} /></div>
          <span>Classroom Monitoring System</span>
        </div>
        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="login-card-wrapper">
        <div className="login-card-outer">
          <Link to="/login" className="back-role-btn">
            <ArrowLeft size={14} /> Back to Role Selection
          </Link>

          <div className="login-card">
            <h1>Teacher<br /><span className="accent">Dashboard Login</span></h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Teacher Username / Email:</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username / email"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="error-banner">
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn-login" disabled={loading}>
                <LogIn size={15} />
                {loading ? "Logging in..." : "Login as Teacher"}
              </button>
            </form>

            <a href="#" className="forgot-link">Forgot Password?</a>

            <div className="signup-section">
              <p>Don't have an account?</p>
              <Link to="/teacher/signup" className="btn-signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}