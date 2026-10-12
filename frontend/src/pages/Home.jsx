import { Link } from "react-router-dom";
import {
  GraduationCap, Camera, Clock, Bell, Shield,
  ArrowRight, Users, BookOpen,
  Monitor, ChevronRight, Menu, X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div style={{ background: "#F4F7FC", minHeight: "100vh" }}>
      {/* ═══════════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════════ */}
      <header className="simple-navbar">
        <div className="brand">
          <div className="logo"><GraduationCap size={20} /></div>
          <span>Classroom Monitoring System</span>
        </div>

        {/* Desktop only: nav links */}
        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Login — DESKTOP + MOBILE dono pe dikhega */}
        <Link to="/login" className="nav-login-btn nav-login-btn-mobile">Login</Link>

        {/* Mobile only: hamburger */}
        <button
          type="button"
          className="hamburger-btn dark"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile slide-in menu (only nav links) */}
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
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/help" onClick={() => setMenuOpen(false)}>Help</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════ */}
      <div className="container">

        {/* HERO */}
        <section className="hero-section">
          <div>
            <h1 className="hero-big-h1">
              Find an <span style={{ color: "#2563EB" }}>Available</span> Classroom Before You Walk There.
            </h1>
            <p className="lead-p" style={{ marginTop: 26, maxWidth: 600 }}>
              Check current classroom availability and monitor occupancy using camera-based classroom data.
            </p>
            <Link to="/login" className="cta-btn">
              Get Started <ArrowRight size={17} />
            </Link>
          </div>

          <div className="hero-preview">
            <div className="hero-preview-thumb">
              <img src="/images/computer-lab.png" alt="Classroom" />
              <div className="hero-preview-room">Room 101</div>
              <div className="hero-preview-status">● Occupied</div>
            </div>
            <div className="hero-preview-grid">
              <div className="hero-preview-stat">
                <div className="lbl">TYPE</div>
                <div className="val">Computer Lab</div>
              </div>
              <div className="hero-preview-stat">
                <div className="lbl">FLOOR</div>
                <div className="val">1st Floor</div>
              </div>
              <div className="hero-preview-stat">
                <div className="lbl">CAPACITY</div>
                <div className="val">30</div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section-pad">
          <div className="section-center">
            <h2 className="section-h2">
              Why Choose Our <span style={{ color: "#2563EB" }}>System?</span>
            </h2>
            <p className="lead-p-sm" style={{ marginTop: 14, maxWidth: 760, margin: "14px auto 0" }}>
              A smarter way to manage classrooms, improve productivity, and make the most of your campus resources.
            </p>
          </div>

          <div className="resp-4col">
            {[
              { icon: Camera, title: "Live Camera Monitoring", desc: "View classroom occupancy through live camera feeds.", color: "blue" },
              { icon: Clock, title: "Real-Time Availability", desc: "Check if a classroom is free or occupied.", color: "green" },
              { icon: Bell, title: "Instant Notifications", desc: "Get notified when classrooms become available.", color: "orange" },
              { icon: Shield, title: "Secure Management", desc: "Admins manage classrooms and users easily.", color: "purple" },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className={`feature-icon ${f.color}`}>
                  <f.icon size={36} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-pad">
          <div className="section-center">
            <h2 className="section-h2">
              How It <span style={{ color: "#2563EB" }}>Works?</span>
            </h2>
            <p className="lead-p-sm" style={{ marginTop: 14 }}>
              A simple process that turns camera data into useful information.
            </p>
          </div>

          <div className="how-it-works-card">
            {[
              { icon: Camera, title: "Camera Captures", desc: "Monitors or cameras in classrooms capture live video." },
              { icon: Users, title: "AI Detects People", desc: "Computer vision model detects number of people." },
              { icon: BookOpen, title: "Data is Saved", desc: "Results are saved to the database for later analysis." },
              { icon: Monitor, title: "Dashboard Updates", desc: "Users can check classroom status in real-time." },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-icon">
                  <s.icon size={32} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLASSROOM TYPES */}
        <section className="section-pad">
          <div className="classroom-types-card">
            <div className="classroom-types-grid">
              {[
                { img: "/images/general-room-1.png", label: "General Classroom" },
                { img: "/images/computer-lab.png", label: "Computer Lab" },
                { img: "/images/science-lab-1.png", label: "Science Lab" },
              ].map((c, i) => (
                <div key={i} className="classroom-type-tile">
                  <img src={c.img} alt={c.label} />
                  <div className="classroom-type-label">{c.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="eyebrow">Real Classroom, Real-Time Insights.</div>
              <h3 className="section-h2-sm" style={{ marginBottom: 12 }}>
                Different Rooms, Different Needs
              </h3>
              <p className="lead-p-sm" style={{ marginBottom: 24, fontSize: 15.5, lineHeight: 1.75 }}>
                From general classrooms to computer labs and science labs, our system identifies each room
                type and shows occupancy status in real time — helping you find the right space instantly.
              </p>

              <div className="legend-list">
                <div className="legend-item">
                  <span className="dot" style={{ background: "#16A34A" }}></span>
                  <strong style={{ color: "#1E2A5A" }}>Available</strong> — No activity detected
                </div>
                <div className="legend-item">
                  <span className="dot" style={{ background: "#DC2626" }}></span>
                  <strong style={{ color: "#1E2A5A" }}>Occupied</strong> — People detected
                </div>
                <div className="legend-item">
                  <span className="dot" style={{ background: "#D97706" }}></span>
                  <strong style={{ color: "#1E2A5A" }}>In Use</strong> — Reserved or ongoing
                </div>
              </div>

              <Link to="/login" className="cta-btn small">
                Get Started <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="cta-banner">
            <div className="cta-banner-left">
              <div className="cta-banner-icon">
                <GraduationCap size={38} />
              </div>
              <div>
                <h3>Make Your Campus Smarter</h3>
                <p>Join Classroom Monitoring System.</p>
              </div>
            </div>
            <Link to="/login" className="cta-banner-btn">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}