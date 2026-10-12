import { Link } from "react-router-dom";
import { GraduationCap, Users, UserCog, Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Login() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
        <button
          type="button"
          className="hamburger-btn dark"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="mobile-menu-links">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/help" onClick={() => setMenuOpen(false)}>Help</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </div>

      <div className="role-select-wrapper">
        <div className="role-select-card">
          <h1>
            Login To Classroom <span className="accent">Monitoring System</span>
          </h1>
          <p className="sub">Choose Your Role:</p>

          <div className="role-buttons">
            <Link to="/student/login" className="role-btn">
              <div className="r-icon student">
                <Users size={22} />
              </div>
              Login as Student
            </Link>

            <Link to="/teacher/login" className="role-btn">
              <div className="r-icon teacher">
                <UserCog size={22} />
              </div>
              Login as Teacher
            </Link>

            <Link to="/admin/login" className="role-btn">
              <div className="r-icon admin">
                <Shield size={22} />
              </div>
              Login as Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-simple">
        <div className="copyright">© 2026 Classroom Monitoring System. All rights reserved.</div>
        <div className="demo-mode-tag">
          <span className="dot"></span>
          Demo Environment — Sample Data
        </div>
      </div>
    </div>
  );
}