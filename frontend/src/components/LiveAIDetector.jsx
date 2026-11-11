import { useState, useEffect } from "react";
import { Camera, Users, CheckCircle2, AlertCircle, Play, VideoOff } from "lucide-react";
import { apiRequest } from "../services/api";

export default function LiveAIDetector() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveStatus = async () => {
    try {
      const rooms = await apiRequest("/rooms");
      const room101 = rooms.find(r => r.name === "Room 101");
      if (room101) {
        setRoomData(room101);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching live status:", err);
    }
  };

  useEffect(() => {
    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !roomData) return null;

  const isOccupied = roomData.occupancy > 0;
  const isCameraOn = roomData.cameraOnline; // Check if Python is sending data

  const openCameraFeed = () => {
    window.open("http://localhost:5001/video_feed", "_blank");
  };

  // 🚨 Agar Camera Offline Hai (Python band hai)
  if (!isCameraOn) {
    return (
      <div className="ai-detector-card" style={{ background: "#475569", opacity: 0.9 }}>
        <div className="ai-header">
          <div className="ai-title">
            <VideoOff size={18} />
            <span>Live AI Camera Detection</span>
          </div>
          <div className="ai-status-badge" style={{ background: "#F1F5F9", color: "#64748B" }}>
            Camera Offline
          </div>
        </div>
        <div className="ai-content" style={{ justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "30px" }}>
           <p style={{ fontSize: "16px", fontWeight: "600" }}>Waiting for Camera Feed...</p>
           <p style={{ fontSize: "13px", opacity: 0.8, marginTop: "8px" }}>Please start the Python AI script to see live detection.</p>
        </div>
      </div>
    );
  }

  // ✅ Agar Camera ON Hai (Python chal raha hai)
  return (
    <div className="ai-detector-card">
      <div className="ai-header">
        <div className="ai-title">
          <Camera size={18} className="ai-icon-pulse" />
          <span>Live AI Camera Detection</span>
        </div>
        <div className={`ai-status-badge ${isOccupied ? 'occupied' : 'available'}`}>
          {isOccupied ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
          {isOccupied ? 'Occupied' : 'Available'}
        </div>
      </div>

      <div className="ai-content">
        {/* Room Name hata diya hai, sirf Status dikhayenge */}
        <div className="ai-room-info">
          <h3>{isOccupied ? "Room is Occupied" : "Room is Empty"}</h3>
          <p>Real-time AI Detection</p>
        </div>

        {/* Agar occupied hai to logon ka count dikhao */}
        {isOccupied && (
          <div className={`ai-people-count text-red`}>
            <Users size={32} />
            <span>{roomData.occupancy} People Detected</span>
          </div>
        )}

        {/* Agar empty hai to Green available box dikhao */}
        {!isOccupied && (
          <div className={`ai-people-count text-green`}>
            <CheckCircle2 size={32} />
            <span>0 People Detected</span>
          </div>
        )}

        <button 
          onClick={openCameraFeed}
          style={{
            background: "#fff", color: "#1E2A5A", border: "none",
            padding: "12px 24px", borderRadius: "12px", fontSize: "15px",
            fontWeight: "800", display: "flex", alignItems: "center", 
            gap: "8px", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}
        >
          <Play size={18} fill="#1E2A5A" /> Open Live Camera
        </button>

        <div className="ai-footer" style={{width: "100%"}}>
          <span>Last updated: {roomData.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}