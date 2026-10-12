// Request data + localStorage helpers

export const initialRequests = [
  {
    id: "REQ-001",
    teacher: "Sarah Khan",
    roomId: 102,
    roomName: "Room 102",
    date: "06 Oct 2026",
    time: "10:00 AM – 12:00 PM",
    students: 45,
    purpose: "Practical Lab",
    status: "pending",
    submitted: "06 Oct 2026",
  },
  {
    id: "REQ-002",
    teacher: "Ahmed Raza",
    roomId: 105,
    roomName: "Room 105",
    date: "07 Oct 2026",
    time: "01:00 PM – 03:00 PM",
    students: 60,
    purpose: "Guest Lecture",
    status: "approved",
    submitted: "07 Oct 2026",
  },
  {
    id: "REQ-003",
    teacher: "Ayesha Siddiqui",
    roomId: 101,
    roomName: "Room 101",
    date: "08 Oct 2026",
    time: "09:00 AM – 11:00 AM",
    students: 40,
    purpose: "Regular Lecture",
    status: "pending",
    submitted: "08 Oct 2026",
  },
];

// Get all requests (from localStorage or default)
export const getRequests = () => {
  const stored = localStorage.getItem("cms_requests");
  return stored ? JSON.parse(stored) : initialRequests;
};

// Save requests to localStorage
export const saveRequests = (requests) => {
  localStorage.setItem("cms_requests", JSON.stringify(requests));
};

// Add new request
export const addRequest = (req) => {
  const list = getRequests();
  const newReq = {
    ...req,
    id: `REQ-${String(list.length + 1).padStart(3, "0")}`,
    status: "pending",
    submitted: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
  const updated = [newReq, ...list];
  saveRequests(updated);
  return newReq;
};

// Update request status
export const updateRequestStatus = (id, status) => {
  const list = getRequests();
  const updated = list.map((r) => (r.id === id ? { ...r, status } : r));
  saveRequests(updated);
};

// Delete request
export const deleteRequest = (id) => {
  const list = getRequests();
  const updated = list.filter((r) => r.id !== id);
  saveRequests(updated);
};