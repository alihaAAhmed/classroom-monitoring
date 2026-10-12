import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, BookOpen, LayoutDashboard, AlertCircle,
  Settings, ArrowRight, Send, MessageSquare, Mail, Clock, Shield,
  CheckCircle2, HelpCircle, Menu, X,
} from "lucide-react";
import Footer from "../components/Footer";

export default function Help() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const faqs = [
    { q: "How do I check classroom availability?", a: "Go to the Floor Map or Classrooms page. You'll see real-time status for every room." },
    { q: "What do the status colors mean?", a: "Green = Available, Red = Occupied, Orange = In Use, Gray = Camera Offline." },
    { q: "How can I book/reserve a classroom?", a: "Teachers can go to My Requests → Request a Classroom and fill out the booking form." },
    { q: "What if a camera is not working?", a: "If a camera shows Offline, please report it using the Contact form." },
    { q: "How do I report a technical issue?", a: "Fill out the Send us a Message form on the Contact page with 'Technical Issue' selected." },
  ];

  const helpCards = [
    { icon: BookOpen, title: "Getting Started", desc: "Learn how to create an account and log in.", color: "#2563EB", bg: "#EFF6FF" },
    { icon: LayoutDashboard, title: "Using Dashboard", desc: "Understand live classroom status and occupancy.", color: "#16A34A", bg: "#DCFCE7" },
    { icon: AlertCircle, title: "Reporting Issues", desc: "Report a problem with a classroom or camera.", color: "#D97706", bg: "#FEF3C7" },
    { icon: Settings, title: "Troubleshooting", desc: "Find solutions for common issues.", color: "#DC2626", bg: "#FEE2E2" },
  ];

  const otherWays = [
    { icon: Mail, title: "Email", value: "support@cms.edu", sub: "We reply within 24 hours" },
    { icon: MessageSquare, title: "Live Chat", value: "Chat with support", sub: "Available 9 AM - 5 PM" },
    { icon: Clock, title: "Support Hours", value: "Mon-Fri, 9 AM - 5 PM", sub: "Closed on public holidays" },
    { icon: Shield, title: "Report a Bug", value: "bugs@cms.edu", sub: "Report technical problems" },
  ];

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
        <button type="button" className="hamburger-btn dark" onClick={() => setMenuOpen(true)}>
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
        <section className="help-hero">
          <div>
            <h1 className="hero-med-h1">
              How can we <span style={{ color: "#2563EB" }}>Help You Today?</span>
            </h1>
            <p className="lead-p-sm" style={{ marginTop: 20, maxWidth: 560 }}>
              Find answers regarding classroom occupancy, camera monitoring,
              bookings, and account access. Browse the FAQs or reach out to our
              support team.
            </p>
            <div className="help-hero-btns">
              <Link to="/contact" className="btn-primary">
                <Send size={15} /> Contact Support
              </Link>
              <a href="#faqs" className="btn-secondary">View FAQs</a>
            </div>
          </div>

          <div className="help-hero-card">
            <div className="help-hero-icon"><MessageSquare size={30} /></div>
            <h3>Need More Help?</h3>
            <p>Our support team is ready to assist you with any issue.</p>
            <Link to="/contact" className="btn-primary">
              Contact Support <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* HELP CATEGORIES */}
        <section className="help-categories">
          {helpCards.map((c, i) => (
            <div key={i} className="help-cat-card">
              <div className="help-cat-icon" style={{ background: c.bg, color: c.color }}>
                <c.icon size={36} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section id="faqs" className="section-pad">
          <div className="faq-wrap">
            <div className="section-center" style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.85)", marginTop: 12 }}>
                Find instant answers to common questions.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="faq-item"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <div className="faq-q">
                    <span>{f.q}</span>
                    <span style={{ fontSize: 20 }}>{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM + OTHER WAYS */}
        <section className="help-bottom">
          <div className="help-form-card">
            <h2>Send us a Message</h2>
            <p>Fill out the form and we'll get back to you soon.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("✅ Message sent! We'll get back to you soon.");
              e.target.reset();
            }}>
              <div className="help-form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>University Email *</label>
                  <input type="email" placeholder="your.email@university.edu" required />
                </div>
              </div>
              <div className="form-group">
                <label>Student / Roll Number *</label>
                <input placeholder="e.g., CS-2024-045" required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea placeholder="Please describe your issue in detail..." required></textarea>
              </div>
              <button type="submit" className="btn-login" style={{ width: "auto", padding: "14px 30px" }}>
                <Send size={15} /> Submit Report
              </button>
            </form>
          </div>

          <div className="help-other-card">
            <h2>Other ways to reach</h2>
            {otherWays.map((c, i) => (
              <div key={i} className="help-other-item">
                <div className="help-other-icon"><c.icon size={22} /></div>
                <div>
                  <div className="t">{c.title}</div>
                  <div className="v">{c.value}</div>
                  <div className="s">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="cta-banner">
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                Ready to explore available classrooms?
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                Login to your account and check real-time availability.
              </p>
            </div>
            <Link to="/login" className="cta-banner-btn">
              Login to Dashboard <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}