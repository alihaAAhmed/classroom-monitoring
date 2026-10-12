import { LogOut, X } from "lucide-react";

export default function LogoutModal({ open, onClose, onConfirm, panel = "Panel" }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <span className="title-icon">
              <LogOut size={16} />
            </span>
            Logout
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to logout from the <strong>{panel}</strong>?
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-logout-confirm" onClick={onConfirm}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}