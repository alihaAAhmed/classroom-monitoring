import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="brand">
          <div className="logo">
            <GraduationCap size={16} />
          </div>
          Classroom Monitoring System
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </div>

        <div className="socials">
          <a href="#">FB</a>
          <a href="#">TW</a>
          <a href="#">IN</a>
        </div>
      </footer>

      <div className="bottom-bar">
        <div className="copyright">© 2026 Classroom Monitoring System. All rights reserved.</div>
        <div className="demo-mode-tag">
          <span className="dot"></span>
          Demo Environment — Sample Data
        </div>
      </div>
    </>
  );
}