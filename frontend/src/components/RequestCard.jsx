import { Link } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, Eye, Trash2 } from "lucide-react";
import { getStatusInfo } from "../utils/helpers";

export default function RequestCard({ request, onDelete, showActions = true, linkPrefix = "/teacher/classroom" }) {
  const status = getStatusInfo(request.status);

  const StatusIcon =
    request.status === "approved" ? CheckCircle2 :
    request.status === "rejected" ? XCircle : Clock;

  return (
    <div className="request-card">
      <div className={`req-icon ${status.color}`}>
        <StatusIcon size={24} />
      </div>

      <div className="req-content">
        <div className="req-top">
          <span className="req-room">{request.roomName || `Room ${request.roomId}`}</span>
          <span className="req-type-tag blue">{request.purpose}</span>
        </div>
        <div className="req-meta">
          📅 {request.date} • ⏰ {request.time} • 👥 {request.students} students
        </div>
      </div>

      {showActions && (
        <div className="req-side">
          <div className={`req-status ${status.className}`}>{status.label}</div>

          {request.status === "pending" && onDelete && (
            <button onClick={() => onDelete(request.id)} className="req-action cancel">
              <Trash2 size={12} /> Cancel
            </button>
          )}

          {request.status === "approved" && (
            <Link to={`${linkPrefix}/${request.roomId}`} className="req-action view">
              <Eye size={12} /> View Room
            </Link>
          )}
        </div>
      )}
    </div>
  );
}