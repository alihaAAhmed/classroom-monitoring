import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LogOut, Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ onLogout, links = [] }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);       // nav links menu
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown
  const profileRef = useRef(null);

  // Load user
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cms_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  // Close nav menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Lock scroll when nav menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("cms_user");
      localStorage.removeItem("cms_token");
      window.location.href = "/login";
    }
  };

  // Get initials
  const getInitials = () => {
    if (user?.initials) return user.initials;
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="navbar">
        {/* Brand */}
        <div className="brand">
          <div className="logo">
            <GraduationCap size={18} />
          </div>
          <span>Classroom Monitoring System</span>
        </div>

        {/* Desktop nav links */}
        <nav className="nav-links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side: desktop user + mobile avatar + mobile hamburger */}
        <div className="nav-right">
          {/* Desktop user info */}
          <div className="nav-user">
            <span>{user?.name || "User"}</span>
            <div className="avatar">{getInitials()}</div>
            <button
              type="button"
              className="logout-nav-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Mobile avatar (profile dropdown) */}
          <div className="avatar-wrap" ref={profileRef}>
            <button
              type="button"
              className="mobile-avatar-btn"
              onClick={() => setProfileOpen((v) => !v)}
              aria-label="Open profile"
            >
              <div className="avatar">{getInitials()}</div>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="avatar big">{getInitials()}</div>
                  <div className="info">
                    <div className="name">{user?.name || "User"}</div>
                    <div className="role">{user?.role || "user"}</div>
                  </div>
                </div>
                <div className="profile-divider" />
                <button className="profile-item" onClick={handleLogout}>
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger (nav links) */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile nav menu (links only) */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button
              type="button"
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mobile-menu-links">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={location.pathname === l.to ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}