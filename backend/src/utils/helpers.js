export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const getStatusColor = (status) => {
  const map = {
    available: "green",
    occupied: "red",
    inuse: "orange",
    offline: "gray",
    pending: "orange",
    approved: "green",
    rejected: "red",
  };
  return map[status] || "gray";
};

export const generateInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};