import { useState, useEffect } from "react";
import { Camera, AlertCircle, Users, CheckCircle2, VideoOff, Power, RefreshCw } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";

export default function CameraMonitoring() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();

  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [aiStatus, setAiStatus] = useState({ occupancy: 0, status: "available", cameraOnline: false });

  // Jab camera start ho jaye, tabhi backend se live data fetch karo
  useEffect(() => {
    if (!isCameraStarted) return;

    const fetchData = async () => {
      try {
        const roomData = await apiRequest("/rooms");
        const room101 = roomData.find(r => r.name === "Room 101");
        if (room101) {
          setAiStatus({
            occupancy: room101.occupancy,
            status: room101.status,
            cameraOnline: room101.cameraOnline
          });
        }
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 2000); // Har 2 second update
    return () => clearInterval(interval);
  }, [isCameraStarted]);

  const isOccupied = aiStatus.occupancy > 0;

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/classrooms", label: "Classrooms" },
          { to: "/admin/cameras", label: "Camera Monitoring" },
          { to: "/admin/requests", label: "Classroom Requests" },
          { to: "/admin/users", label: "User Management" },
          { to: "/admin/analytics", label: "Analytics" },
        ]}
      />

      <div className="page-header page-header-flex">
        <div>
          <h1>Live AI Camera</h1>
          <p>Real-time room occupancy detection.</p>
        </div>
      </div>

      <div className="container admin-container">
        <div className="ai-detector-card" style={{ marginTop: 30, padding: "30px" }}>
          
          {/* Header */}
          <div className="ai-header" style={{ marginBottom: "20px" }}>
            <div className="ai-title" style={{ fontSize: "20px" }}>
              <Camera size={24} className="ai-icon-pulse" />
              <span>Camera Feed & Detection</span>
            </div>
            
            {/* Turn Off Button (Sirf tab dikhega jab camera on hoga) */}
            {isCameraStarted && (
              <button 
                onClick={() => setIsCameraStarted(false)}
                style={{
                  background: "#DC2626", color: "#fff", border: "none",
                  padding: "8px 16px", borderRadius: "8px", fontSize: "14px",
                  fontWeight: "700", display: "flex", alignItems: "center", 
                  gap: "6px", cursor: "pointer"
                }}
              >
                <Power size={16} /> Turn Off Camera
              </button>
            )}
          </div>

          {/* 🟢 STATE 1: Jab tak camera start nahi hua */}
          {!isCameraStarted ? (
            <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(0,0,0,0.2)", borderRadius: "16px" }}>
              <VideoOff size={64} style={{ opacity: 0.5, marginBottom: "20px", margin: "0 auto" }} />
              <h3 style={{ fontSize: "24px", marginBottom: "10px", color: "#fff" }}>Camera is Offline</h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
                Click the button below to start the AI detection.
              </p>
              
              <button 
                onClick={() => setIsCameraStarted(true)}
                style={{
                  background: "#16A34A", color: "#fff", border: "none",
                  padding: "16px 40px", borderRadius: "12px", fontSize: "18px",
                  fontWeight: "800", display: "inline-flex", alignItems: "center", 
                  gap: "10px", cursor: "pointer", boxShadow: "0 4px 15px rgba(22, 163, 74, 0.4)"
                }}
              >
                <Power size={22} /> Turn On Camera
              </button>
            </div>
          ) : (
            
            /* 🟢 STATE 2: Split Layout (Camera Left, Status Right) */
            <div className="camera-split-layout">
              
              {/* Left: Camera Video Box */}
              <div className="camera-video-wrapper">
                <img 
                  src="http://127.0.0.1:5001/video_feed" 
                  alt="Live Camera Feed" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<p style="color:#888; font-size:14px;">Connecting to camera feed... (Wait 5 seconds)</p>';
                  }}
                />
              </div>

              {/* Right: Detection Status Card */}
              <div className="camera-status-panel">
                <div style={{ marginBottom: "20px" }}>
                  {aiStatus.cameraOnline ? (
                    <span className={`status-pill ${isOccupied ? 'red' : 'green'} big`} style={{ fontSize: "14px", padding: "6px 14px" }}>
                      <span className="dot"></span>
                      {isOccupied ? 'Occupied' : 'Available'}
                    </span>
                  ) : (
                    <span className="status-pill gray big" style={{ fontSize: "14px", padding: "6px 14px" }}>
                      <span className="dot"></span> Waiting for Data
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: "28px", color: "#fff", marginBottom: "10px", lineHeight: "1.2" }}>
                  {isOccupied ? "Room is Occupied" : "Room is Empty"}
                </h3>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
                  {isOccupied ? "People detected in the room." : "No people detected. Room is available."}
                </p>

                <div style={{ marginTop: "auto" }}>
                  <div style={{ 
                    background: "#fff", padding: "20px", borderRadius: "14px", 
                    display: "flex", alignItems: "center", gap: "16px" 
                  }}>
                    {isOccupied ? (
                      <Users size={40} color="#DC2626" />
                    ) : (
                      <CheckCircle2 size={40} color="#16A34A" />
                    )}
                    <div>
                      <div style={{ fontSize: "32px", fontWeight: "800", color: isOccupied ? "#DC2626" : "#16A34A", lineHeight: "1" }}>
                        {aiStatus.occupancy}
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", marginTop: "4px" }}>
                        People Detected
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <Footer />
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          logout();
          window.location.href = "/login";
        }}
        panel="Admin Panel"
      />
    </>
  );
}