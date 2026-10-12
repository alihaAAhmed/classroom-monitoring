import { Link } from "react-router-dom";
import {
  GraduationCap, Target, Rocket, Users, UserCog,
  Shield, Camera, ArrowRight, Menu, X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div style={{ background: "#F4F7FC", minHeight: "100vh" }}>
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
        <Link to="/login" className="nav-login-btn nav-login-btn-mobile">Login</Link>
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

      <div className="container">

        {/* HERO */}
        <section className="about-hero">
          <h1 className="hero-big-h1">
            About <span style={{ color: "#2563EB" }}>Classroom Monitor</span>
          </h1>
          <p className="lead-p" style={{ marginTop: 24, maxWidth: 700, margin: "24px auto 0" }}>
            A smart and efficient university classroom availability system designed to help students,
            teachers and administrators find and monitor classrooms in real-time.
          </p>
        </section>

        {/* GOAL + MISSION */}
        <section className="section-pad">
          <div className="about-goal-grid">
            <div className="about-goal-card">
              <div className="about-goal-icon" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                <Target size={36} />
              </div>
              <div>
                <h3>Our Goal</h3>
                <p>
                  To ensure that university classrooms are utilized efficiently and that students and
                  teachers can find available rooms easily — making campus experience more convenient for everyone.
                </p>
              </div>
            </div>

            <div className="about-goal-card">
              <div className="about-goal-icon" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                <Rocket size={36} />
              </div>
              <div>
                <h3>Our Mission</h3>
                <p>
                  To build a reliable, user-friendly monitoring platform that combines modern technology
                  with real-time data to improve classroom utilization and enhance campus management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-pad">
          <div className="section-center">
            <h2 className="section-h2-sm">How It Works?</h2>
            <p className="lead-p-sm" style={{ marginTop: 14 }}>
              A simple process that turns camera data into useful information.
            </p>
          </div>

          <div className="how-it-works-card">
            {[
              { n: 1, title: "Camera Captures", desc: "Monitors capture live video of the classroom." },
              { n: 2, title: "AI Detects People", desc: "Computer vision detects number of people." },
              { n: 3, title: "Data is Saved", desc: "Results are saved to the database." },
              { n: 4, title: "Dashboard Updates", desc: "Users check classroom status in real-time." },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO USES IT */}
        <section className="section-pad">
          <div className="section-center">
            <h2 className="section-h2-sm">
              Who Uses <span style={{ color: "#2563EB" }}>It?</span>
            </h2>
            <p className="lead-p-sm" style={{ marginTop: 14 }}>
              Designed for everyone in the university community.
            </p>
          </div>

          <div className="about-users-grid">
            {[
              { icon: Users, title: "Students", desc: "Find available classrooms quickly and easily.", color: "#2563EB", bg: "#EFF6FF" },
              { icon: UserCog, title: "Teachers", desc: "Request classrooms and view availability.", color: "#7C3AED", bg: "#F3E8FF" },
              { icon: Shield, title: "Administration", desc: "Monitor overall usage and manage campus resources.", color: "#16A34A", bg: "#DCFCE7" },
            ].map((c, i) => (
              <div key={i} className="about-user-card">
                <div className="about-user-icon" style={{ background: c.bg, color: c.color }}>
                  <c.icon size={36} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="cta-banner">
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 800 }}>Smarter Classrooms. A Better Campus.</h3>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginTop: 7 }}>
                Together, we can build a more efficient and connected campus.
              </p>
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