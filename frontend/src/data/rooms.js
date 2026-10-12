// Rooms data — 8 rooms with your local images
export const rooms = [
  {
    id: 101,
    name: "Room 101",
    type: "Computer Lab",
    building: "Computer Science Block",
    floor: "1st Floor",
    capacity: 30,
    occupancy: 22,
    status: "occupied",
    cameraId: "CAM-01",
    cameraOnline: true,
    image: "/images/computer-lab.png",
    lastUpdated: "2 min ago",
    schedule: [
      { time: "09:00 AM", subject: "Data Structures", teacher: "Dr. Ahmed Raza", state: "ongoing" },
      { time: "11:30 AM", subject: "Operating Systems", teacher: "Prof. Sana Khan", state: "upcoming" },
    ],
    activity: [
      { time: "10:24 AM", text: "22 people detected", color: "red" },
      { time: "10:00 AM", text: "Class started", color: "" },
      { time: "09:45 AM", text: "18 people detected", color: "red" },
    ]
  },
  {
    id: 102,
    name: "Room 102",
    type: "General Classroom",
    building: "Computer Science Block",
    floor: "1st Floor",
    capacity: 35,
    occupancy: 0,
    status: "available",
    cameraId: "CAM-02",
    cameraOnline: true,
    image: "/images/general-room-1.png",
    lastUpdated: "1 min ago",
    schedule: [
      { time: "10:00 AM", subject: "Linear Algebra", teacher: "Dr. Ahmed Raza", state: "ongoing" },
      { time: "12:30 PM", subject: "Discrete Math", teacher: "Prof. Sana Khan", state: "upcoming" },
    ],
    activity: [
      { time: "10:20 AM", text: "Room is empty", color: "green" },
      { time: "10:00 AM", text: "Previous class ended", color: "green" },
    ]
  },
  {
    id: 103,
    name: "Room 103",
    type: "General Classroom",
    building: "Computer Science Block",
    floor: "2nd Floor",
    capacity: 40,
    occupancy: 18,
    status: "inuse",
    cameraId: "CAM-03",
    cameraOnline: true,
    image: "/images/general-room-2.png",
    lastUpdated: "just now",
    schedule: [
      { time: "11:00 AM", subject: "Physics", teacher: "Dr. Fatima Noor", state: "upcoming" },
      { time: "02:00 PM", subject: "Chemistry", teacher: "Dr. Usman Ali", state: "" },
    ],
    activity: [
      { time: "10:15 AM", text: "18 people detected", color: "red" },
      { time: "09:50 AM", text: "Room opened", color: "" },
    ]
  },
  {
    id: 104,
    name: "Room 104",
    type: "General Classroom",
    building: "Science Block",
    floor: "1st Floor",
    capacity: 35,
    occupancy: 0,
    status: "offline",
    cameraId: "CAM-04",
    cameraOnline: false,
    image: "/images/general-room-3.png",
    lastUpdated: "Unavailable",
    schedule: [],
    activity: [
      { time: "10:12 AM", text: "Camera connection lost", color: "red" },
      { time: "09:00 AM", text: "Room was empty", color: "green" },
    ]
  },
  {
    id: 105,
    name: "Room 105",
    type: "General Classroom",
    building: "Science Block",
    floor: "2nd Floor",
    capacity: 40,
    occupancy: 32,
    status: "occupied",
    cameraId: "CAM-05",
    cameraOnline: true,
    image: "/images/general-room-4.png",
    lastUpdated: "30 sec ago",
    schedule: [
      { time: "10:00 AM", subject: "Software Architecture", teacher: "Prof. Sana Khan", state: "ongoing" },
      { time: "12:30 PM", subject: "Computer Networks", teacher: "Dr. Usman Ali", state: "upcoming" },
    ],
    activity: [
      { time: "10:15 AM", text: "32 people detected", color: "red" },
      { time: "10:00 AM", text: "Session started", color: "" },
    ]
  },
  {
    id: 106,
    name: "Room 106",
    type: "Science Lab",
    building: "Science Block",
    floor: "1st Floor",
    capacity: 30,
    occupancy: 0,
    status: "available",
    cameraId: "CAM-06",
    cameraOnline: true,
    image: "/images/science-lab-1.png",
    lastUpdated: "1 min ago",
    schedule: [
      { time: "11:00 AM", subject: "Organic Chemistry Lab", teacher: "Dr. Fatima Noor", state: "upcoming" },
      { time: "02:00 PM", subject: "Applied Physics Lab", teacher: "Dr. Usman Ali", state: "" },
    ],
    activity: [
      { time: "10:15 AM", text: "Room is empty", color: "green" },
      { time: "09:40 AM", text: "Lab session ended", color: "green" },
    ]
  },
  {
    id: 107,
    name: "Room 107",
    type: "Science Lab",
    building: "Science Block",
    floor: "2nd Floor",
    capacity: 30,
    occupancy: 12,
    status: "inuse",
    cameraId: "CAM-07",
    cameraOnline: true,
    image: "/images/science-lab-2.png",
    lastUpdated: "20 sec ago",
    schedule: [
      { time: "09:00 AM", subject: "Chemistry Practical", teacher: "Dr. Fatima Noor", state: "ongoing" },
    ],
    activity: [
      { time: "10:05 AM", text: "12 people detected", color: "red" },
    ]
  },
  {
    id: 108,
    name: "Room 108",
    type: "Seminar Room",
    building: "Main Block",
    floor: "1st Floor",
    capacity: 60,
    occupancy: 45,
    status: "occupied",
    cameraId: "CAM-08",
    cameraOnline: true,
    image: "/images/seminar-room.png",
    lastUpdated: "just now",
    schedule: [
      { time: "10:00 AM", subject: "Guest Lecture", teacher: "Dr. Ahmed Raza", state: "ongoing" },
      { time: "03:00 PM", subject: "Research Seminar", teacher: "Prof. Sana Khan", state: "upcoming" },
    ],
    activity: [
      { time: "10:15 AM", text: "45 people detected", color: "red" },
    ]
  },
];

// Helper functions
export const getRoomById = (id) => rooms.find(r => r.id === parseInt(id)) || rooms[0];
export const getAvailableRooms = () => rooms.filter(r => r.status === "available" && r.cameraOnline);
export const getOccupiedRooms = () => rooms.filter(r => r.status === "occupied");
export const getInUseRooms = () => rooms.filter(r => r.status === "inuse");