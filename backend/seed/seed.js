import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";
import Room from "../src/models/Room.js";
import Request from "../src/models/Request.js";
import Notification from "../src/models/Notification.js";

dotenv.config();

// ═══════════════════════════════════════════════
// ROOMS DATA — 8 rooms
// ═══════════════════════════════════════════════
const rooms = [
  {
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
    ],
  },
  {
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
    ],
    activity: [
      { time: "10:20 AM", text: "Room is empty", color: "green" },
    ],
  },
  {
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
    ],
    activity: [
      { time: "10:15 AM", text: "18 people detected", color: "red" },
    ],
  },
  {
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
      { time: "10:12 AM", text: "Camera offline", color: "red" },
    ],
  },
  {
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
    ],
    activity: [
      { time: "10:15 AM", text: "32 people detected", color: "red" },
    ],
  },
  {
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
    ],
    activity: [
      { time: "10:15 AM", text: "Room is empty", color: "green" },
    ],
  },
  {
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
    ],
  },
  {
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
    ],
    activity: [
      { time: "10:15 AM", text: "45 people detected", color: "red" },
    ],
  },
];

// ═══════════════════════════════════════════════
// NOTIFICATIONS DATA
// ═══════════════════════════════════════════════
const notifications = [
  { type: "red", title: "Room 101 is now occupied", desc: "The room has been marked as occupied. Current: 22/30 students.", time: "2 minutes ago", unread: true, tag: "Critical" },
  { type: "blue", title: "Room 102 still occupied", desc: "Extended duration: 22/25 students.", time: "10 minutes ago", unread: true, tag: "Update" },
  { type: "green", title: "Room 106 is now available", desc: "The room has been cleared and is ready for use.", time: "15 minutes ago", unread: false, tag: "Available" },
  { type: "blue", title: "Room 107 monitoring updated", desc: "Camera feed has been refreshed.", time: "30 minutes ago", unread: false, tag: "Camera" },
  { type: "orange", title: "Room 108 is currently in use", desc: "Expected free at 3:30 PM.", time: "1 hour ago", unread: true, tag: "In Use" },
  { type: "gray", title: "System update completed", desc: "All monitoring features are online.", time: "Yesterday", unread: false, tag: "System" },
];

// ═══════════════════════════════════════════════
// USERS DATA — Passwords will be AUTO-HASHED by model
// ═══════════════════════════════════════════════
const users = [
  {
    username: "student",
    email: "student@gmail.com",
    password: "123456",
    name: "Aliha Khan",
    initials: "AK",
    role: "student",
    status: "active",
    department: "Computer Science",
  },
  {
    username: "teacher",
    email: "teacher@gmail.com",
    password: "123456",
    name: "Aliha Ahmed",
    initials: "AK",
    role: "teacher",
    status: "active",
    department: "Computer Science",
  },
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "admin12",
    name: "Administrator",
    initials: "AD",
    role: "admin",
    status: "active",
    department: "Administration",
  },
];

// ═══════════════════════════════════════════════
// REQUESTS DATA
// ═══════════════════════════════════════════════
const requests = [
  { teacher: "Aliha Ahmed", roomId: 102, roomName: "Room 102", date: "06 Oct 2026", time: "10:00 AM – 12:00 PM", students: 45, purpose: "Practical Lab", status: "pending" },
  { teacher: "Aliha Ahmed", roomId: 105, roomName: "Room 105", date: "07 Oct 2026", time: "01:00 PM – 03:00 PM", students: 60, purpose: "Guest Lecture", status: "approved" },
  { teacher: "Ahmed Raza", roomId: 101, roomName: "Room 101", date: "08 Oct 2026", time: "09:00 AM – 11:00 AM", students: 40, purpose: "Regular Lecture", status: "pending" },
];

// ═══════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await User.deleteMany();
    await Room.deleteMany();
    await Request.deleteMany();
    await Notification.deleteMany();
    console.log("🗑️  Cleared existing data");
    console.log("");

    // ✅ Model hashes password via pre("save") hook — no manual hashing!
    const createdUsers = await User.create(users);
    console.log(`👤 Created ${createdUsers.length} users:`);
    createdUsers.forEach((u) => {
      console.log(`   → ${u.role.padEnd(8)} | ${u.username.padEnd(10)} | ${u.email}`);
    });
    console.log("");

    const createdRooms = await Room.create(rooms);
    console.log(`🏫 Created ${createdRooms.length} rooms`);

    await Notification.create(notifications);
    console.log(`🔔 Created ${notifications.length} notifications`);

    await Request.create(requests);
    console.log(`📝 Created ${requests.length} sample requests`);

    console.log("");
    console.log("═══════════════════════════════════════════════");
    console.log("✅ SEEDING COMPLETE!");
    console.log("═══════════════════════════════════════════════");
    console.log("");
    console.log("🔑 Login Credentials:");
    console.log("");
    console.log("   ┌─────────────────────────────────────────────┐");
    console.log("   │ STUDENT                                     │");
    console.log("   │   Email:    student@gmail.com               │");
    console.log("   │   Password: 123456                          │");
    console.log("   ├─────────────────────────────────────────────┤");
    console.log("   │ TEACHER                                     │");
    console.log("   │   Email:    teacher@gmail.com               │");
    console.log("   │   Password: 123456                          │");
    console.log("   ├─────────────────────────────────────────────┤");
    console.log("   │ ADMIN                                       │");
    console.log("   │   Email:    admin@gmail.com                 │");
    console.log("   │   Password: admin12                         │");
    console.log("   └─────────────────────────────────────────────┘");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seed();