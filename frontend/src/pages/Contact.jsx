import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Mail, Phone, MapPin, Clock, Send,
  MessageSquare, ArrowRight, HelpCircle, CheckCircle2, Menu, X,
} from "lucide-react";
import Footer from "../components/Footer";

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message sent! We'll get back to you soon.");
    e.target.reset();
  };

  const contactCards = [
    { icon: Mail, title: "Email", value: "support@cms.edu", sub: "We reply within 24 hours", color: "#2563EB", bg: "#EFF6FF" },
    { icon: Phone, title: "Phone", value: "+92 21 1234 5678", sub: "Mon-Fri, 9AM - 5PM", color: "#16A34A", bg: "#DCFCE7" },
    { icon: MessageSquare, title: "Live Chat", value: "Chat with support", sub: "Available 9AM - 5PM", color: "#7C3AED", bg: "#F3E8FF" },
    { icon: Clock, title: "Support Hours", value: "24/7 Online Support", sub: "For urgent issues", color: "#D97706", bg: "#FEF3C7" },
  ];

  const otherWays = [
    { icon: Mail, title: "Email", value: "support@cms.edu", sub: "We reply within 24 hours" },
    { icon: Phone, title: "Phone", value: "+92 21 1234 5678", sub: "Mon-Fri, 9AM - 5PM" },
    { icon: MapPin, title: "Visit Us", value: "Main Campus, Block A", sub: "123 University Road, Karachi" },
    { icon: MessageSquare, title: "Live Chat", value: "Chat with support", sub: "Available 9AM - 5PM" },
  ];

  const quickHelp = [
    "How do I check classroom availability?",
    "What do the status colors mean?",
    "How can I book/reserve a classroom?",
    "What if a camera is not working?",
    "How do I report a technical issue?",
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
              Get in <span style={{ color: "#2563EB" }}>Touch</span>
            </h1>
            <p className="lead-p-sm" style={{ marginTop: 20, maxWidth: 560 }}>
              Have a question, suggestion, or found an issue? We're here to
              help! Reach out to our team and we'll get back to you as soon as possible.
            </p>
            <div className="help-hero-btns">
              <a href="#contact-form" className="btn-primary">
                <Send size={15} /> Send Message
              </a>
              <Link to="/help" className="btn-secondary">Visit Help Center</Link>
            </div>
          </div>

          <div className="help-hero-card">
            <div className="help-hero-icon"><Mail size={30} /></div>
            <h3>Email Us Directly</h3>
            <p>Prefer email? Reach our support team at</p>
            <div className="contact-email-big">support@cms.edu</div>
            <a href="mailto:support@cms.edu" className="btn-primary">
              Open Mail App <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="contact-cards">
          {contactCards.map((c, i) => (
            <div key={i} className="contact-card">
              <div className="contact-card-icon" style={{ background: c.bg, color: c.color }}>
                <c.icon size={24} />
              </div>
              <div>
                <div className="lbl">{c.title}</div>
                <div className="v">{c.value}</div>
                <div className="s">{c.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* FORM + SIDE */}
        <section id="contact-form" className="help-bottom">
          <div className="help-form-card">
            <h2>Send us a Message</h2>
            <p>Fill out the form and we'll get back to you soon.</p>

            <form onSubmit={handleSubmit}>
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

              <div className="help-form-row">
                <div className="form-group">
                  <label>Issue Type *</label>
                  <select required>
                    <option value="">Select an issue type</option>
                    <option>General Inquiry</option>
                    <option>Technical Issue</option>
                    <option>Room Booking Problem</option>
                    <option>Feedback / Suggestion</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Student / Roll Number *</label>
                  <input placeholder="e.g., CS-2024-045" required />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea placeholder="Please describe your issue in detail..." required></textarea>
              </div>

              <button type="submit" className="btn-login" style={{ width: "auto", padding: "16px 36px" }}>
                <Send size={16} /> Submit Report
              </button>
            </form>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
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

            <div className="quick-help-card">
              <div className="quick-help-header">
                <div className="quick-help-icon"><HelpCircle size={20} /></div>
                <h2>Quick Help</h2>
              </div>
              <div className="quick-help-list">
                {quickHelp.map((q, i) => (
                  <Link key={i} to="/help" className="quick-help-item">
                    <CheckCircle2 size={14} color="#2563EB" />
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}