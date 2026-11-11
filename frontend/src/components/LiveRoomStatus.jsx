import { useState, useEffect } from "react";
import { Video, Users, CheckCircle2, AlertCircle, Radio, ExternalLink } from "lucide-react";
import { apiRequest } from "../services/api";

export default function LiveRoomStatus() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveStatus = async () => {
    try {
      const rooms = await apiRequest("/rooms");
      const targetRoom = rooms.find(r => r.name === "Room 101");
      if (targetRoom) {
        setRoomData(targetRoom);
      }
      setLoading(false);
    } catch (err) {
      console.error("AI Feed Error:", err);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !roomData) return null;

  const isOccupied = roomData.occupancy > 0;

  return (
    <div className="live-room-widget">
      <div className="lrw-left">
        <div className={`lrw-camera-icon ${isOccupied ? 'occupied' : 'available'}`}>
          <Video size={22} />
          <div className="lrw-live-dot"></div>
        </div>
        <div>
          <h4>Live AI Camera — {roomData.name}</h4>
          <p className="lrw-sub">
            <Radio size={12} className="pulse-icon" /> Real-time occupancy detection
          </p>
        </div>
      </div>

      <div className="lrw-right">
        <div className={`lrw-badge ${isOccupied ? 'red' : 'green'}`}>
          {isOccupied ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          {isOccupied ? 'Occupied' : 'Available'}
        </div>
        <div className="lrw-people">
          <Users size={16} />
          <strong>{roomData.occupancy}</strong> People
        </div>
        <button 
          onClick={() => window.open("http://localhost:5001/video_feed", "_blank")}
          style={{
            background: "#F1F5F9", border: "none", color: "#4F6DDF",
            padding: "8px 12px", borderRadius: "8px", fontSize: "12px",
            fontWeight: "700", cursor: "pointer", display: "flex", 
            alignItems: "center", gap: "4px"
          }}
        >
          View Feed <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}