import { Link } from "react-router-dom";
import { Camera, Users, ChevronRight } from "lucide-react";
import { getStatusInfo, getOccupancyPercent } from "../utils/helpers";

export default function RoomCard({ room, linkPrefix = "/teacher/classroom" }) {
  const status = getStatusInfo(room.status);
  const percent = getOccupancyPercent(room.occupancy, room.capacity);

  return (
    <div className="live-card">
      <div className="live-thumb">
        {room.cameraOnline && room.image ? (
          <>
            <img src={room.image} alt={room.name} />
            <div className={`live-badge ${status.color}`}>
              <span className="dot"></span> {status.label}
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#94A3B8" }}>
            <Camera size={40} />
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", marginTop: 8 }}>No Signal</div>
          </div>
        )}
      </div>

      <div className="live-body">
        <div className="lb-title">{room.name} — {room.type}</div>
        <div className="lb-meta">{room.building} • {room.floor}</div>

        <div className="live-stats">
          <div className="live-stat">
            <Users size={13} />
            <span>Capacity: {room.capacity}</span>
          </div>
          <div className="live-stat">
            <span className={status.color}>{percent}% Full</span>
          </div>
        </div>

        <Link to={`${linkPrefix}/${room.id}`} className="live-btn">
          View Room Details <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}