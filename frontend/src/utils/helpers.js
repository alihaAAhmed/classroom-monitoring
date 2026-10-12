// Status ke liye color aur text
export const getStatusInfo = (status) => {
  const map = {
    available: { label: "Available", color: "green", className: "available" },
    occupied: { label: "Occupied", color: "red", className: "occupied" },
    inuse: { label: "In Use", color: "orange", className: "inuse" },
    offline: { label: "Offline", color: "gray", className: "offline" },
    pending: { label: "Pending", color: "orange", className: "pending" },
    approved: { label: "Approved", color: "green", className: "approved" },
    rejected: { label: "Rejected", color: "red", className: "rejected" },
  };
  return map[status] || { label: status, color: "gray", className: "gray" };
};

// Occupancy percentage
export const getOccupancyPercent = (occupancy, capacity) => {
  if (!capacity) return 0;
  return Math.round((occupancy / capacity) * 100);
};

// Date format: 06 Oct 2026
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

// Time format
export const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Short ID: REQ-001
export const generateRequestId = (num) => `REQ-${String(num).padStart(3, "0")}`;